import {useState} from "react";
import "../css/header.css";
import {useNavigate} from "react-router-dom";

function Header() {
    const [isSearch, setIsSearch] = useState(false);
    const navigate = useNavigate();
    const handleClickBtn = (e) => {
        console.log(e.target.id);
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
        if (isSearch==true) {
            setIsSearch(false);
            const node2 = document.querySelector("main");
            node2.style.setProperty("opacity","100%");
            const node1 = document.querySelector("#searchDiv");
            node1.style.setProperty("height","0px");
        } else {
            setIsSearch(true);
            const node2 = document.querySelector("main");
            node2.style.setProperty("opacity","30%");
            const node1 = document.querySelector("#searchDiv");
            node1.style.setProperty("height","90px");
            node1.style.setProperty("opacity","100%");
        }
    }
    const excuteSearch = () => {
        console.log("검색 진행중");
    }
    return (
        <header>
            <div id="mainHeader">
                <div id="leftHeaderMenu">
                    <ul>
                        <li id="Info" onClick={handleClickBtn}>Info</li>
                        <li id="Shop" onClick={handleClickBtn}>Shop</li>
                        <li id="Notice" onClick={handleClickBtn}>Notice</li>
                    </ul>
                </div>
                <div id="logo">
                    <img src="img/logo.png" alt="Logo" id="Logo" onClick={handleClickBtn}/>
                </div>
                <div id="rightHeaderMenu">
                    <ul>
                        <li id="Account" onClick={handleClickBtn}>Account</li>
                        <li id="Cart" onClick={handleClickBtn}>Cart</li>
                        <li id="Search" onClick={handleClickBtn}>Search</li>
                    </ul>
                </div>
            </div>
            <div id="searchDiv">
                <div id="searchInputDiv">
                    <input type="text"/>
                    <img src="img/icon/Search_light.png" alt="" onClick={excuteSearch}/>
                </div>

            </div>
        </header>
    );
}

export default Header;