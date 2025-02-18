import {useNavigate} from "react-router-dom";
import "../css/profile.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import OrderSingleList from "../component/OrderSingleList";
import DaumPostCode from "../component/DaumPostCode";

function Profile({setIsLogin}){
    const navigate = useNavigate();
    const [profileInfo,setProfileInfo] = useState([]);
    const [orderInfo,setOrderInfo] = useState([]);
    const [addressInfo,setAddressInfo] = useState([]);
    const [isAddressMamagement,setIsAddressMamagement] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [addressInput1,setAddressInput1] = useState({
            mainAddress : "",
            subAddress : "",
            postcode : "" 
        });
        const [addressInput2,setAddressInput2] = useState({
            mainAddress : "",
            subAddress : "",
            postcode : "" 
        });
        const [addressInput3,setAddressInput3] = useState({
            mainAddress : "",
            subAddress : "",
            postcode : "" 
        });
        const [addressInput4,setAddressInput4] = useState({
            mainAddress : "",
            subAddress : "",
            postcode : "" 
        });
    const addressRef = useRef(null);
    const handleClickedBtn = async(e) => {
        // aiox로 로그아웃 요청해서 세션 만료 시켜야 함
        if(e.target.id === "logout"){
            requestLogout();
            {setIsLogin(false);}
            sessionStorage.clear();
            navigate("/Shop");
        }else if(e.target.id === "deleteUser"){
            requestDeleteUser();
            {setIsLogin(false);}
            sessionStorage.clear();
            navigate("/Shop");
        }else if(e.target.id === "modifyAddress"){
            console.log("배송지 수정");
            requestAddressInfo();
            setIsAddressMamagement(true);
        }else if(e.target.id === "addAddress"){
            console.log("배송지 추가");
            // axios request
            requestModifyAddress();
        }else if(e.target.id === "cancle"){
            setIsAddressMamagement(false);
        }
    }
    const requestAddressInfo = async() => {
        await axios.get("http://localhost:8080/address/"+sessionStorage.getItem("userUid"),{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                console.log(response.data);
                setAddressInfo(response.data);
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                alert("오류");
                setIsAddressMamagement(false);
            });
    }
    const requestLogout = async() => {
        console.log("로그아웃 요청함");
        await axios.get("http://localhost:8080/logout",{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                console.log("성공");
                alert("로그아웃 되었습니다.");
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                alert("오류");
            });
    }
    const requestDeleteUser = async() => {
        console.log("회원탈퇴 요청함");
        console.log(sessionStorage.getItem("userUid"));
        await axios.delete("http://localhost:8080/users/"+parseInt(sessionStorage.getItem("userUid")),{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                console.log("성공");
                alert("탈퇴 처리 되었습니다.");
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                alert("오류");
            });
    }
    const requestUserProfile = async() => {
        console.log("회원정보 요청함");
        await axios.post("http://localhost:8080/profile/"+sessionStorage.getItem("userUid"),{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                setProfileInfo(response.data);
                //console.log(response.data)
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                console.error(e);
                alert("오류");
            });
    }
    const requestOrderInfo = async() => {
        await axios.get("http://localhost:8080/orders/"+sessionStorage.getItem("userUid"),{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                //console.log(response.data)
                setOrderInfo(response.data);
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                console.error(e);
                alert("오류");
            });
    }
    const requestModifyAddress = async() => {
        const modifyAddressInfo = {
            uid : addressInfo.uid,
            userUid : addressInfo.userUid,
            address1 : addressInfo.address1,
            address2 : addressInput1.mainAddress+" "+addressInput1.subAddress,
            address3 : addressInput2.mainAddress+" "+addressInput2.subAddress,
            address4 : addressInput3.mainAddress+" "+addressInput3.subAddress,
            address5 : addressInput4.mainAddress+" "+addressInput4.subAddress,
            postcode1 : addressInfo.postcode1,
            postcode2 : addressInput1.postcode,
            postcode3 : addressInput2.postcode,
            postcode4 : addressInput3.postcode,
            postcode5 : addressInput4.postcode,
        }
        console.log(addressInput1.postcode);
        console.log(modifyAddressInfo);
        await axios.patch("http://localhost:8080/address",modifyAddressInfo,{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                console.log("성공");
                renderUserProfileDiv();
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                console.error(e);
                alert("오류");
            });
    }
    const renderOrderList = () => {
        return(
            <>
            {Array.isArray(orderInfo)&&orderInfo.map((item,idx)=>(
                <OrderSingleList key={idx} orderInfo={item}/>
            ))}
            </>
        );
    }
    const renderUserProfileDiv = () => {
        if(isAddressMamagement === true){
            return(
                <div id="userProfileInfoDiv">
                    <p>기본 배송지 : ( {addressInfo.postcode1} ) {addressInfo.address1}</p>
                    {addressInfo.postcode2 == null ? 
                        <div className="additionalAddressDiv">
                            <p>추가 배송지 1 : </p>
                            <div className="additionalAddressInputDiv">
                                <input type="text" value={addressInput1.postcode} disabled/>
                                <input type="text" value={addressInput1.mainAddress} disabled/>
                                <input type="text" onChange={(e)=>setAddressInput1({
                                    ...addressInput1,
                                    subAddress : e.target.value
                                })}/>
                            </div>
                            <div className="additionalAddressBtnDiv">
                                <button onClick={()=>setIsAddressModalOpen(!isAddressModalOpen)}>찾기</button>
                                <DaumPostCode isModalOpen={isAddressModalOpen} addressInput = {addressInput1}
                                    changeIsModalOpen={setIsAddressModalOpen}
                                    setAddressInput = {setAddressInput1}
                                    ref={addressRef}/>
                            </div>
                        </div>
                        :<p>추가 배송지 1 : ( {addressInfo.postcode2} ) {addressInfo.address2}</p>}
                    
                    {(addressInfo.postcode2!=null) || (addressInfo.postcode2!=="")  ? 
                        (addressInfo.postcode3 != null) || (addressInfo.postcode3!=="") ?
                        <p>추가 배송지 2 : ( {addressInfo.postcode3} ) {addressInfo.address3}</p>:
                        <div className="additionalAddressDiv">
                            <p>추가 배송지 2 : </p>
                            <div className="additionalAddressInputDiv">
                                <input type="text" value={addressInput2.postcode} disabled/>
                                <input type="text" value={addressInput2.mainAddress} disabled/>
                                <input type="text" onChange={(e)=>setAddressInput2({
                                    ...addressInput2,
                                    subAddress : e.target.value
                                })}/>
                            </div>
                            <div className="additionalAddressBtnDiv">
                                <button>찾기</button>
                                <DaumPostCode isModalOpen={isAddressModalOpen} addressInput = {addressInput2}
                                    changeIsModalOpen={setIsAddressModalOpen}
                                    setAddressInput = {setAddressInput2}
                                    ref={addressRef}/>
                            </div>
                        </div>
                        : <></>
                        }
                        {addressInfo.postcode3!=null || addressInfo.postcode3!==""  ? 
                        addressInfo.postcode4 != null || addressInfo.postcode4!=="" ?
                        <p>추가 배송지 3 : ( {addressInfo.postcode4} ) {addressInfo.address4}</p>:
                        <div className="additionalAddressDiv">
                            <p>추가 배송지 3 : </p>
                            <div className="additionalAddressInputDiv">
                                <input type="text" value={addressInput4.postcode} disabled/>
                                <input type="text" value={addressInput4.mainAddress} disabled/>
                                <input type="text" onChange={(e)=>setAddressInput3({
                                    ...addressInput3,
                                    subAddress : e.target.value
                                })}/>
                            </div>
                            <div className="additionalAddressBtnDiv">
                                <button>찾기</button>
                                <DaumPostCode isModalOpen={isAddressModalOpen} addressInput = {addressInput3}
                                    changeIsModalOpen={setIsAddressModalOpen}
                                    setAddressInput = {setAddressInput3}
                                    ref={addressRef}/>
                            </div>
                        </div>
                        : <></>
                        }
                        {addressInfo.postcode4!=null || addressInfo.postcode4!==""  ? 
                        addressInfo.postcode5 != null || addressInfo.postcode5!=="" ?
                        <p>추가 배송지 4 : ( {addressInfo.postcode5} ) {addressInfo.address5}</p>:
                        <div className="additionalAddressDiv">
                            <p>추가 배송지 4 : </p>
                            <div className="additionalAddressInputDiv">
                                <input type="text" value={addressInput4.postcode} disabled/>
                                <input type="text" value={addressInput4.mainAddress} disabled/>
                                <input type="text" onChange={(e)=>setAddressInput4({
                                    ...addressInput4,
                                    subAddress : e.target.value
                                })}/>
                            </div>
                            <div className="additionalAddressBtnDiv">
                                <button>찾기</button>
                                <DaumPostCode isModalOpen={isAddressModalOpen} addressInput = {addressInput4}
                                    changeIsModalOpen={setIsAddressModalOpen}
                                    setAddressInput = {setAddressInput4}
                                    ref={addressRef}/>
                            </div>
                        </div>
                        : <></>
                        }
                    <div id="addressBtnDiv">
                        <button onClick={handleClickedBtn} id="addAddress">배송지 추가</button>
                        <button onClick={handleClickedBtn} id="cancle">취소</button>
                    </div>
                </div>
            );
        }else{
            return(
                <div id="userProfileInfoDiv">
                            <p>{profileInfo.name} 님</p>
                            <p>ID : {profileInfo.id}</p>
                            <p>E-mail : {profileInfo.email}</p>
                            <p>Phone : {profileInfo.phoneNum}</p>
                            <p>기본 배송지 : ( {sessionStorage.getItem("mainPostcode")} ) {sessionStorage.getItem("mainAddress")}</p>
                            <div id="userProfileInfoBtnDiv">
                                <div id="addressBtnDiv">
                                    <button onClick={handleClickedBtn} id="modifyAddress">배송지관리</button>
                                </div>
                                <div id="outBtnDiv">
                                    <button onClick={handleClickedBtn} id="logout">로그아웃</button>
                                    <button onClick={handleClickedBtn} id="deleteUser">회원탈퇴</button>
                                </div>
                            </div>
                        </div>
            );
        }
    }
    useEffect(()=>{
        requestUserProfile();
        requestOrderInfo();
        requestAddressInfo();
    },[]);
    useEffect(()=>{
        console.log(orderInfo);
        renderUserProfileDiv();
        renderOrderList();
    },[profileInfo,orderInfo,addressInfo]);
    useEffect(()=>{
        //console.log(addressInput);
    },[isAddressModalOpen]);
    useEffect(()=>{
    },[addressInput1,addressInput2,addressInput3,addressInput4]);
    return(
            <main>
                <div id="profileContainer">
                    {renderUserProfileDiv()}
                    <div id="deliveryDiv">
                        <p>주문목록</p>
                        <table id="deliveryStatusDiv">
                            <thead>
                                <tr>
                                    <td>상품이미지</td>
                                    <td>상품명</td>
                                    <td>사이즈</td>
                                    <td>수량</td>
                                    <td>가격</td>
                                    <td>주문날짜</td>
                                    <td>배송조회</td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderOrderList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
    );
}

export default Profile;