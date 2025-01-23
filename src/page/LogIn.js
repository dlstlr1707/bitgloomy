import {useNavigate} from "react-router-dom";
import Footer from "./Footer";
import "../css/login.css";
import {useEffect, useRef, useState} from "react";

function LogIn (){
    const loginBtnRef = useRef(null);
    const [id,setId] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleClickP = (e) => {
        if(e.target.id=="findID"){
            navigate("/FindID");
        }else if(e.target.id=="findPW"){
            navigate("/FindPW");
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
    const requestLogin = () => {
        console.log("id is : "+id);
        console.log("password is : "+password);
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
                        <div id="findUserInfo">
                            <p id="findID">아이디찾기</p>
                            <p id="findPW">비밀번호찾기</p>
                        </div>
                        <p id="join" onClick={handleClickP}>회원가입</p>
                    </div>
                    <button onClick={requestLogin} ref={loginBtnRef}>LOGIN</button>
                    <div id="socialLoginDiv">
                        <img src="img/icon/google.png" alt=""/>
                        <img src="img/icon/naver.png" alt=""/>
                        <img src="img/icon/kakao.png" alt=""/>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default LogIn;