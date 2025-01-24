import {useRef, useState} from "react";
import "../css/header.css";
import {useNavigate} from "react-router-dom";

function Header({appDivRef}) {
    const [isSearch, setIsSearch] = useState(false);
    const [searchText,setSearchText] = useState("");
    const searchDivRef = useRef(null);
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
                // 세션 확인후 로그인 정보 없으면 로그인페이지
                // 로그인 정보 있으면 프로필 페이지 출력
                navigate("/LogIn");
                break;
            case "Cart":
                navigate("/Cart");
                break;
            case "Search":
                toggleSearch();
                break;
            default:
                break;
        }
    }
    const toggleSearch = () => {
        if (isSearch===true) {
            setIsSearch(false);
            const node1 = document.querySelector("main");
            node1.style.setProperty("opacity","100%");
            searchDivRef.current.style.setProperty("height","0px");
        } else {
            setIsSearch(true);
            const node1 = document.querySelector("main");
            node1.style.setProperty("opacity","30%");
            searchDivRef.current.style.setProperty("height","90px");
        }
    }
    const handleChange = (e) => {
        setSearchText(e.target.value);
    }
    const excuteSearch = () => {
        // 내용 받아서 axios로 요청보냄
        console.log("검색 진행중" + searchText);
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
                    <img src="img/bitgloomy_logo.png" alt="Logo" id="Logo" onClick={handleClickBtn}/>
                </div>
                <div id="rightHeaderMenu">
                    <ul>
                        <li id="Account" onClick={handleClickBtn}>account</li>
                        <li id="Cart" onClick={handleClickBtn}>cart</li>
                        <li id="Search" onClick={handleClickBtn}>search</li>
                    </ul>
                </div>
            </div>
            <div id="searchDiv" ref={searchDivRef}>
                <div id="searchInputDiv">
                    <input type="text" onChange={handleChange}/>
                    <img src="img/icon/Search_light.png" alt="" onClick={excuteSearch}/>
                </div>

            </div>
        </header>
    );
}

export default Header;