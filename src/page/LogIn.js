import {useNavigate} from "react-router-dom";
import Footer from "./Footer";
import "../css/login.css";

function LogIn (){
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
    return(
        <div>
            <main>
                <div id="logInContainer">
                    <p>ID</p>
                    <input type="text" id="userID"/>
                    <p>PW</p>
                    <input type="password" id="userPW"/>
                    <div id="logInSubMenu">
                        <div id="findUserInfo">
                            <p id="findID">아이디찾기</p>
                            <p id="findPW">비밀번호찾기</p>
                        </div>
                        <p id="join" onClick={handleClickP}>회원가입</p>
                    </div>
                    <button>LOGIN</button>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default LogIn;