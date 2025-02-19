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
    const initSubAddressInput = () => {
        setAddressInput1({
            ...addressInput1,
            subAddress : "",
        });
        setAddressInput2({
            ...addressInput2,
            subAddress : "",
        });
        setAddressInput3({
            ...addressInput3,
            subAddress : "",
        });
        setAddressInput4({
            ...addressInput4,
            subAddress : "",
        });
    }
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
            requestAddressInfo();
            setIsAddressMamagement(true);
        }else if(e.target.id === "addAddress"){
            // axios request
            requestModifyAddress();
        }else if(e.target.id === "cancle"){
            setIsAddressMamagement(false);
        }else if(e.target.id === "selectMainAddress2"){
            initSubAddressInput();
            requestChangeMainAddress(e);
        }else if(e.target.id === "selectMainAddress3"){
            initSubAddressInput();
            requestChangeMainAddress(e);
        }else if(e.target.id === "selectMainAddress4"){
            initSubAddressInput();
            requestChangeMainAddress(e);
        }else if(e.target.id === "selectMainAddress5"){
            initSubAddressInput();
            requestChangeMainAddress(e);
        }else if(e.target.id === "deleteAddress2"){
            initSubAddressInput();
            requestDeleteAddress(e);
        }else if(e.target.id === "deleteAddress3"){
            initSubAddressInput();
            requestDeleteAddress(e);
        }else if(e.target.id === "deleteAddress4"){
            initSubAddressInput();
            requestDeleteAddress(e);
        }else if(e.target.id === "deleteAddress5"){
            initSubAddressInput();
            requestDeleteAddress(e);
        }
        
    }
    const requestAddressInfo = async() => {
        await axios.get("http://localhost:8080/address/"+sessionStorage.getItem("userUid"),{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                setAddressInfo(response.data);
                setAddressInput1({
                    ...addressInput1,
                    mainAddress : response.data["address2"],
                    postcode : response.data["postcode2"]
                });
                setAddressInput2({
                    ...addressInput2,
                    mainAddress : response.data["address3"],
                    postcode : response.data["postcode3"]
                });
                setAddressInput3({
                    ...addressInput3,
                    mainAddress : response.data["address4"],
                    postcode : response.data["postcode4"]
                });
                setAddressInput4({
                    ...addressInput4,
                    mainAddress : response.data["address5"],
                    postcode : response.data["postcode5"]
                });
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                alert("오류");
                setIsAddressMamagement(false);
            });
    }
    const requestChangeMainAddress = async(e) => {
        let tmpAddressData;
        if(e.target.id === "selectMainAddress2"){
            tmpAddressData = {
                uid : addressInfo.uid,
                userUid : addressInfo.userUid,
                address1 : addressInfo.address2,
                address2 : addressInfo.address1,
                address3 : addressInfo.address3,
                address4 : addressInfo.address4,
                address5 : addressInfo.address5,
                postcode1 : addressInfo.postcode2,
                postcode2 : addressInfo.postcode1,
                postcode3 : addressInfo.postcode3,
                postcode4 : addressInfo.postcode4,
                postcode5 : addressInfo.postcode5,
            }
            setAddressInfo(tmpAddressData);
            await axios.patch("http://localhost:8080/address",tmpAddressData,{
                withCredentials: true  // 쿠키 자동 처리
            })
                .then((response) => {
                    //정상 통신후 응답온 부분
                    alert("선택하신 주소가 기본 배송지로 등록 되었습니다.");
                    setIsAddressMamagement(false);
                })
                .catch((e) => {
                    // 오류 발생시 처리부분
                    console.error(e);
                    alert("오류");
                });
        }else if(e.target.id === "selectMainAddress3"){
            tmpAddressData = {
                uid : addressInfo.uid,
                userUid : addressInfo.userUid,
                address1 : addressInfo.address3,
                address2 : addressInfo.address2,
                address3 : addressInfo.address1,
                address4 : addressInfo.address4,
                address5 : addressInfo.address5,
                postcode1 : addressInfo.postcode3,
                postcode2 : addressInfo.postcode2,
                postcode3 : addressInfo.postcode1,
                postcode4 : addressInfo.postcode4,
                postcode5 : addressInfo.postcode5,
            }
            setAddressInfo(tmpAddressData);
            await axios.patch("http://localhost:8080/address",tmpAddressData,{
                withCredentials: true  // 쿠키 자동 처리
            })
                .then((response) => {
                    //정상 통신후 응답온 부분
                    alert("선택하신 주소가 기본 배송지로 등록 되었습니다.");
                    setIsAddressMamagement(false);
                })
                .catch((e) => {
                    // 오류 발생시 처리부분
                    console.error(e);
                    alert("오류");
                });
        }else if(e.target.id === "selectMainAddress4"){
            tmpAddressData = {
                uid : addressInfo.uid,
                userUid : addressInfo.userUid,
                address1 : addressInfo.address4,
                address2 : addressInfo.address2,
                address3 : addressInfo.address3,
                address4 : addressInfo.address1,
                address5 : addressInfo.address5,
                postcode1 : addressInfo.postcode4,
                postcode2 : addressInfo.postcode2,
                postcode3 : addressInfo.postcode3,
                postcode4 : addressInfo.postcode1,
                postcode5 : addressInfo.postcode5,
            }
            setAddressInfo(tmpAddressData);
            await axios.patch("http://localhost:8080/address",tmpAddressData,{
                withCredentials: true  // 쿠키 자동 처리
            })
                .then((response) => {
                    //정상 통신후 응답온 부분
                    alert("선택하신 주소가 기본 배송지로 등록 되었습니다.");
                    setIsAddressMamagement(false);
                })
                .catch((e) => {
                    // 오류 발생시 처리부분
                    console.error(e);
                    alert("오류");
                });
        }else if(e.target.id === "selectMainAddress5"){
            tmpAddressData = {
                uid : addressInfo.uid,
                userUid : addressInfo.userUid,
                address1 : addressInfo.address5,
                address2 : addressInfo.address2,
                address3 : addressInfo.address3,
                address4 : addressInfo.address4,
                address5 : addressInfo.address1,
                postcode1 : addressInfo.postcode5,
                postcode2 : addressInfo.postcode2,
                postcode3 : addressInfo.postcode3,
                postcode4 : addressInfo.postcode4,
                postcode5 : addressInfo.postcode1,
            }
            setAddressInfo(tmpAddressData);
            await axios.patch("http://localhost:8080/address",tmpAddressData,{
                withCredentials: true  // 쿠키 자동 처리
            })
                .then((response) => {
                    //정상 통신후 응답온 부분
                    alert("선택하신 주소가 기본 배송지로 등록 되었습니다.");
                    setIsAddressMamagement(false);
                })
                .catch((e) => {
                    // 오류 발생시 처리부분
                    console.error(e);
                    alert("오류");
                });
        }
    }
    const requestDeleteAddress = async(e) => {
        let tmpAddressData;
        if(e.target.id === "deleteAddress2"){
            tmpAddressData = {
                uid : addressInfo.uid,
                userUid : addressInfo.userUid,
                address1 : addressInfo.address1,
                address2 : addressInfo.address3,
                address3 : addressInfo.address4,
                address4 : addressInfo.address5,
                address5 : "",
                postcode1 : addressInfo.postcode1,
                postcode2 : addressInfo.postcode3,
                postcode3 : addressInfo.postcode4,
                postcode4 : addressInfo.postcode5,
                postcode5 : "",
            }
            await axios.patch("http://localhost:8080/address",tmpAddressData,{
                withCredentials: true  // 쿠키 자동 처리
            })
                .then((response) => {
                    //정상 통신후 응답온 부분
                    alert("선택하신 주소가 삭제 되었습니다.");
                    setIsAddressMamagement(false);
                })
                .catch((e) => {
                    // 오류 발생시 처리부분
                    console.error(e);
                    alert("오류");
                });
        }else if(e.target.id === "deleteAddress3"){
            tmpAddressData = {
                uid : addressInfo.uid,
                userUid : addressInfo.userUid,
                address1 : addressInfo.address1,
                address2 : addressInfo.address2,
                address3 : addressInfo.address4,
                address4 : addressInfo.address5,
                address5 : "",
                postcode1 : addressInfo.postcode1,
                postcode2 : addressInfo.postcode2,
                postcode3 : addressInfo.postcode4,
                postcode4 : addressInfo.postcode5,
                postcode5 : "",
            }
            await axios.patch("http://localhost:8080/address",tmpAddressData,{
                withCredentials: true  // 쿠키 자동 처리
            })
                .then((response) => {
                    //정상 통신후 응답온 부분
                    alert("선택하신 주소가 삭제 되었습니다.");
                    setIsAddressMamagement(false);
                })
                .catch((e) => {
                    // 오류 발생시 처리부분
                    console.error(e);
                    alert("오류");
                });
        }else if(e.target.id === "deleteAddress4"){
            tmpAddressData = {
                uid : addressInfo.uid,
                userUid : addressInfo.userUid,
                address1 : addressInfo.address1,
                address2 : addressInfo.address2,
                address3 : addressInfo.address3,
                address4 : addressInfo.address5,
                address5 : "",
                postcode1 : addressInfo.postcode1,
                postcode2 : addressInfo.postcode2,
                postcode3 : addressInfo.postcode3,
                postcode4 : addressInfo.postcode5,
                postcode5 : "",
            }
            await axios.patch("http://localhost:8080/address",tmpAddressData,{
                withCredentials: true  // 쿠키 자동 처리
            })
                .then((response) => {
                    //정상 통신후 응답온 부분
                    alert("선택하신 주소가 삭제 되었습니다.");
                    setIsAddressMamagement(false);
                })
                .catch((e) => {
                    // 오류 발생시 처리부분
                    console.error(e);
                    alert("오류");
                });
        }else if(e.target.id === "deleteAddress5"){
            tmpAddressData = {
                uid : addressInfo.uid,
                userUid : addressInfo.userUid,
                address1 : addressInfo.address1,
                address2 : addressInfo.address2,
                address3 : addressInfo.address3,
                address4 : addressInfo.address4,
                address5 : "",
                postcode1 : addressInfo.postcode1,
                postcode2 : addressInfo.postcode2,
                postcode3 : addressInfo.postcode3,
                postcode4 : addressInfo.postcode4,
                postcode5 : "",
            }
            await axios.patch("http://localhost:8080/address",tmpAddressData,{
                withCredentials: true  // 쿠키 자동 처리
            })
                .then((response) => {
                    //정상 통신후 응답온 부분
                    alert("선택하신 주소가 삭제 되었습니다.");
                    setIsAddressMamagement(false);
                })
                .catch((e) => {
                    // 오류 발생시 처리부분
                    console.error(e);
                    alert("오류");
                });
        }
    }
    const requestLogout = async() => {
        await axios.get("http://localhost:8080/logout",{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                alert("로그아웃 되었습니다.");
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                alert("오류");
            });
    }
    const requestDeleteUser = async() => {
        await axios.delete("http://localhost:8080/users/"+parseInt(sessionStorage.getItem("userUid")),{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                alert("탈퇴 처리 되었습니다.");
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                alert("오류");
            });
    }
    const requestUserProfile = async() => {
        await axios.post("http://localhost:8080/profile/"+sessionStorage.getItem("userUid"),{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                setProfileInfo(response.data);
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
        await axios.patch("http://localhost:8080/address",modifyAddressInfo,{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                alert("새로운 주소가 등록되었습니다.");
                setIsAddressMamagement(false);
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
                    {(addressInfo.postcode2==="") ? 
                        <div className="additionalAddressDiv">
                            <div className="additionalAddressInputDiv">
                                <p>추가 배송지 1 : </p>
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
                        :<div className="additionalAddressDiv">
                            <p>추가 배송지 1 : ( {addressInfo.postcode2} ) {addressInfo.address2}</p>
                            <div className="additionalAddressBtnDiv">
                                <button onClick={handleClickedBtn} id="selectMainAddress2">선택</button>
                                <button onClick={handleClickedBtn} id="deleteAddress2">삭제</button>
                            </div>
                        </div>}
                        
                    {(addressInfo.postcode2!=="")  ? 
                        (addressInfo.postcode3!=="") ?
                        <div className="additionalAddressDiv">
                            <p>추가 배송지 2 : ( {addressInfo.postcode3} ) {addressInfo.address3}</p>
                            <div className="additionalAddressBtnDiv">
                                <button onClick={handleClickedBtn} id="selectMainAddress3">선택</button>
                                <button onClick={handleClickedBtn} id="deleteAddress3">삭제</button>
                            </div>
                        </div>:
                        (<div className="additionalAddressDiv">
                            <div className="additionalAddressInputDiv">
                                <p>추가 배송지 2 : </p>
                                <input type="text" value={addressInput2.postcode} disabled/>
                                <input type="text" value={addressInput2.mainAddress} disabled/>
                                <input type="text" onChange={(e)=>setAddressInput2({
                                    ...addressInput2,
                                    subAddress : e.target.value
                                })}/>
                            </div>
                            <div className="additionalAddressBtnDiv">
                                <button onClick={()=>setIsAddressModalOpen(!isAddressModalOpen)}>찾기</button>
                                <DaumPostCode isModalOpen={isAddressModalOpen} addressInput = {addressInput2}
                                    changeIsModalOpen={setIsAddressModalOpen}
                                    setAddressInput = {setAddressInput2}
                                    ref={addressRef}/>
                            </div>
                        </div>)
                        : <></>
                        }
                         {(addressInfo.postcode3!=="")  ? 
                        (addressInfo.postcode4!=="") ?
                        <div className="additionalAddressDiv">
                            <p>추가 배송지 3 : ( {addressInfo.postcode4} ) {addressInfo.address4}</p>
                            <div className="additionalAddressBtnDiv">
                                <button onClick={handleClickedBtn} id="selectMainAddress4">선택</button>
                                <button onClick={handleClickedBtn} id="deleteAddress4">삭제</button>
                            </div>
                        </div>:
                        <div className="additionalAddressDiv">
                            <div className="additionalAddressInputDiv">
                                <p>추가 배송지 3 : </p>
                                <input type="text" value={addressInput3.postcode} disabled/>
                                <input type="text" value={addressInput3.mainAddress} disabled/>
                                <input type="text" onChange={(e)=>setAddressInput3({
                                    ...addressInput3,
                                    subAddress : e.target.value
                                })}/>
                            </div>
                            <div className="additionalAddressBtnDiv">
                                <button onClick={()=>setIsAddressModalOpen(!isAddressModalOpen)}>찾기</button>
                                <DaumPostCode isModalOpen={isAddressModalOpen} addressInput = {addressInput3}
                                    changeIsModalOpen={setIsAddressModalOpen}
                                    setAddressInput = {setAddressInput3}
                                    ref={addressRef}/>
                            </div>
                        </div>
                        : <></>
                        }
                         {(addressInfo.postcode4!=="")  ? 
                        (addressInfo.postcode5!=="") ?
                        <div className="additionalAddressDiv">
                            <p>추가 배송지 4 : ( {addressInfo.postcode5} ) {addressInfo.address5}</p>
                            <div className="additionalAddressBtnDiv">
                                <button onClick={handleClickedBtn} id="selectMainAddress5">선택</button>
                                <button onClick={handleClickedBtn} id="deleteAddress5">삭제</button>
                            </div>
                        </div>:
                        <div className="additionalAddressDiv">
                            <div className="additionalAddressInputDiv">
                                <p>추가 배송지 4 : </p>
                                <input type="text" value={addressInput4.postcode} disabled/>
                                <input type="text" value={addressInput4.mainAddress} disabled/>
                                <input type="text" onChange={(e)=>setAddressInput4({
                                    ...addressInput4,
                                    subAddress : e.target.value
                                })}/>
                            </div>
                            <div className="additionalAddressBtnDiv">
                                <button onClick={()=>setIsAddressModalOpen(!isAddressModalOpen)}>찾기</button>
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
                            <p>기본 배송지 : ( {addressInfo.postcode1} ) {addressInfo.address1}</p>
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
        renderUserProfileDiv();
        renderOrderList();
    },[profileInfo,orderInfo,addressInfo]);
    useEffect(()=>{
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