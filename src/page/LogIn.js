import {useNavigate} from "react-router-dom";
import Footer from "./Footer";
import "../css/login.css";
import {useEffect, useRef, useState} from "react";
import axios from "axios";

function LogIn ({setIsLogin}){
    const loginBtnRef = useRef(null);
    const [id,setId] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleClickP = (e) => {
        if(e.target.id=="findUser"){
            navigate("/Find");
        }else if(e.target.id=="join"){
            navigate("/Join");
        }
    }
    const handleIdChange = (e) => {
        setId(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const requestLogin = async() => {
        const requestLoginInfo = {
            "id" : id,
            "password" : password
        }
        await axios.post("http://localhost:8080/login",requestLoginInfo,{
            withCredentials: true  // 쿠키 자동 처리
        })
                    .then((response) => {
                        //정상 통신후 응답온 부분
                        sessionStorage.setItem("userUid",response.data["userUid"]);
                        sessionStorage.setItem("auth",response.data["auth"]);
                        console.log("UID is : "+sessionStorage.getItem("userUid"));
                        console.log("auth is : "+sessionStorage.getItem("auth"));
                        {setIsLogin(true);}
                        navigate("/Shop");
                    })
                    .catch((e) => {
                        // 오류 발생시 처리부분
                        alert("잘못된 아이디 비밀번호입니다. 아이디 비밀번호를 확인해주세요.");
                    });
        // id,password 가지고 객체에 담아 보냄
        // axios로 서버에 id,password 담아서 보내면됨
        // 반환되는 세션쿠키 받아서 처리 
    }
    const isDisableLoginBtn = () => {
        let resultId = id !== "";
        let resultPw = password !== "";
        if(resultId&&resultPw){
            loginBtnRef.current.disabled=false;
        }else{
            loginBtnRef.current.disabled=true;
        }
    }
    useEffect(()=>{
            isDisableLoginBtn();
        },[]);
        useEffect(()=>{
            isDisableLoginBtn();
        },[id,password]);
    return(
        <div>
            <main>
                <div id="logInContainer">
                    <p>ID</p>
                    <input type="text" id="userID" onChange={handleIdChange}/>
                    <p>PW</p>
                    <input type="password" id="userPW" onChange={handlePasswordChange}/>
                    <div id="logInSubMenu">
                        <p id="findUser" onClick={handleClickP}>계정찾기</p>
                        <p id="join" onClick={handleClickP}>회원가입</p>
                    </div>
                    <button onClick={requestLogin} ref={loginBtnRef}>LOGIN</button>
                    <div id="socialLoginDiv">
                        <img src={require("../img/icon/google.png")} alt=""/>
                        <img src={require("../img/icon/naver.png")} alt=""/>
                        <img src={require("../img/icon/kakao.png")} alt=""/>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default LogIn;