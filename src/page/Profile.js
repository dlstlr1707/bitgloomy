import {useNavigate} from "react-router-dom";
import "../css/profile.css";
import axios from "axios";
import { useEffect, useState } from "react";
import OrderSingleList from "../component/OrderSingleList";

function Profile({setIsLogin}){
    const navigate = useNavigate();
    const [profileInfo,setProfileInfo] = useState([]);
    const [orderInfo,setOrderInfo] = useState([]);
    const handleClickedBtn = (e) => {
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
        }else if(e.target.id === "modifyUser"){
            console.log("회원정보 수정");
        }else if(e.target.id === "modifyAddress"){
            console.log("배송지 수정");
        }
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
    const renderOrderList = () => {
        return(
            <>
            {Array.isArray(orderInfo)&&orderInfo.map((item,idx)=>(
                <OrderSingleList key={idx} orderInfo={item}/>
            ))}
            </>
        );
    }
    useEffect(()=>{
        requestUserProfile();
        requestOrderInfo();
    },[]);
    useEffect(()=>{
        console.log(orderInfo);
        renderOrderList();
    },[profileInfo,orderInfo]);
    return(
            <main>
                <div id="profileContainer">
                    <div id="userProfileInfoDiv">
                        <p>{profileInfo.name} 님</p>
                        <p>ID : {profileInfo.id}</p>
                        <p>E-mail : {profileInfo.email}</p>
                        <p>Phone : {profileInfo.phoneNum}</p>
                        <p>기본 배송지 : ( {sessionStorage.getItem("mainPostcode")} ) {sessionStorage.getItem("mainAddress")}</p>
                        <div id="userProfileInfoBtnDiv">
                            <div id="addressBtnDiv">
                                <button onClick={handleClickedBtn} id="modifyUser">정보수정</button>
                                <button onClick={handleClickedBtn} id="modifyAddress">배송지관리</button>
                            </div>
                            <div id="outBtnDiv">
                                <button onClick={handleClickedBtn} id="logout">로그아웃</button>
                                <button onClick={handleClickedBtn} id="deleteUser">회원탈퇴</button>
                            </div>
                        </div>
                    </div>
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