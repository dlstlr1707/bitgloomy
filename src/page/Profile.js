import Footer from "./Footer";
import {useNavigate} from "react-router-dom";
import "../css/profile.css";
import axios from "axios";

function Profile({setIsLogin}){
    const navigate = useNavigate();
    const handleClickedBtn = (e) => {
        // aiox로 로그아웃 요청해서 세션 만료 시켜야 함
        if(e.target.id === "logout"){
            requestLogout();
            {setIsLogin(false);}
            sessionStorage.clear();
        }else if(e.target.id === "deleteUser"){
            requestDeleteUser();
            {setIsLogin(false);}
            sessionStorage.clear();
        }
        navigate("/Shop");
    }
    const requestLogout = async() => {
        console.log("로그아웃 요청함");
        await axios.get("http://localhost:8080/logout",{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                console.log("성공");
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
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                alert("오류");
            });
    }
    return(
        <div>
            <main>
                <div id="profileContainer">
                    <p>프로필 임시페이지</p>
                    <button onClick={handleClickedBtn} id="logout">로그아웃</button>
                    <button onClick={handleClickedBtn} id="deleteUser">회원탈퇴</button>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Profile;