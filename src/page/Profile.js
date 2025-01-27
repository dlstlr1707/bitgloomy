import Footer from "./Footer";
import {useNavigate} from "react-router-dom";
import "../css/profile.css";

function Profile({toggleIsLogin}){
    const navigate = useNavigate();
    const logout = () => {
        // aiox로 로그아웃 요청해서 세션 만료 시켜야 함
        {toggleIsLogin();}
        navigate("/Shop");
    }
    return(
        <div>
            <main>
                <div id="profileContainer">
                    <p>프로필 임시페이지</p>
                    <button onClick={logout}>로그아웃</button>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Profile;