import {useState} from "react";
import "../css/header.css";
import {useNavigate} from "react-router-dom";
import Modal from 'react-modal';

function Header({isLogin}) {
    const [isSearch, setIsSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();
    const handleClickBtn = (e) => {
        switch (e.target.id) {
            case "Info":
                navigate("/Info");
                break;
            case "Shop":
                navigate("/Shop");
                break;
            case "Notice":
                navigate("/Notice");
                break;
            case "Logo":
                navigate("/Shop");
                break;
            case "Account":
                // 세션 확인후 로그인 정보 없으면 로그인페이지 로그인 정보 있으면 프로필 페이지 출력
                if (isLogin === true) {
                    navigate("/Profile");
                } else {
                    navigate("/LogIn");
                }
                break;
            case "Cart":
                if (isLogin === true) {
                    navigate("/Cart");
                } else {
                    navigate("/LogIn");
                }
                break;
            case "Search":
                toggleSearch();
                break;
            default:
                break;
        }
    }
    const toggleSearch = () => {
        if (isSearch === true) {
            setIsSearch(false);
        } else {
            setIsSearch(true);
        }
    }
    const handleChange = (e) => {
        setSearchText(e.target.value);
    }
    const excuteSearch = () => {
        // 내용 받아서 axios로 요청보냄
        console.log("검색 진행중 : " + searchText);
    }
    return (
        <header>
            <div id="mainHeader">
                <div id="leftHeaderMenu">
                    <ul>
                        <li id="Info" onClick={handleClickBtn}>info</li>
                        <li id="Shop" onClick={handleClickBtn}>shop</li>
                        <li id="Notice" onClick={handleClickBtn}>notice</li>
                    </ul>
                </div>
                <div id="logo">
                    <img
                        src={require("../img/bitgloomy_logo.png")}
                        alt="Logo"
                        id="Logo"
                        onClick={handleClickBtn}/>
                </div>
                <div id="rightHeaderMenu">
                    <ul>
                        <li id="Account" onClick={handleClickBtn}>account</li>
                        <li id="Cart" onClick={handleClickBtn}>cart</li>
                        <li id="Search" onClick={handleClickBtn}>search</li>
                    </ul>
                </div>
            </div>
            <Modal isOpen={isSearch} onRequestClose={() => setIsSearch(false)} className="search-modal-content"
                // 모달 내용에 적용할 클래스명
                overlayClassName="search-modal-overlay"
                // 모달 외부에 적용할 클래스명
                contentLabel="Example Modal">
                <input type="text" onChange={handleChange}/>
                <img src="../img/icon/Search_light.png" alt="" onClick={excuteSearch}/>
            </Modal>
        </header>
    );
}

export default Header;