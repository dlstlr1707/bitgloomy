import {useNavigate} from "react-router-dom";
import Footer from "./Footer";
import "../css/login.css";
import { useState } from "react";

function LogIn (){
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
        // axios로 서버에 id,password 담아서 보내면됨
        // 반환되는 세션쿠키 받아서 처리 
    }
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
                    <button onClick={requestLogin}>LOGIN</button>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default LogIn;