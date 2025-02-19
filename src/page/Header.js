import {useEffect, useState} from "react";
import "../css/header.css";
import {useNavigate,useLocation } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";

function Header({isLogin,weatherInfo}) {
    const [isSearch, setIsSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchResultArr,setSearchResultArr] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const handleClickBtn = (e) => {
        switch (e.target.id) {
            case "Info":
                navigate("/Info");
                break;
            case "Shop":
                if(location.pathname === "/Shop"){
                    navigate(0);
                }else{
                    navigate("/Shop");
                }
                setSearchResultArr([]);
                break;
            case "Notice":
                navigate("/Notice");
                break;
            case "Logo":
                if(location.pathname === "/Shop"){
                    navigate(0);
                }else{
                    navigate("/Shop");
                }
                setSearchResultArr([]);
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
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          excuteSearch();  // Enter 키가 눌리면 excuteSearch 호출
        }
      };
    const excuteSearch = async() => {
        await axios.get("http://localhost:8080/search/"+searchText)
            .then((response) => {
            //정상 통신후 응답온 부분
                setSearchResultArr(response.data);
                setIsSearch(false);
                if(location.pathname === "/Shop"){
                    navigate(0,{state : response.data});
                }
            }).catch((e) => {
                // 오류 발생시 처리부분
                alert("검색에 실패하였습니다.");
            });
    }
    const renderWeatherDiv = () =>{
        if(weatherInfo.sky === "맑음"){
            if(weatherInfo.pty === "없음"){
                if(parseFloat(weatherInfo.wsd.slice(0,3)) < 4){
                    return(
                        <div id="weatherDiv">
                            <img src={require("../img/icon/sunny.gif")} alt=""/>
                            <p>{weatherInfo.tmp}</p>
                        </div>
                    );
                }else if(parseFloat(weatherInfo.wsd.slice(0,3)) >= 4){
                    return(
                        <div id="weatherDiv">
                            <img src={require("../img/icon/wind.gif")} alt=""/>
                            <p>{weatherInfo.tmp}</p>
                        </div>
                    );
                }
            }else if(weatherInfo.pty === "비" || weatherInfo.pty === "비/눈" || weatherInfo.pty === "소나기"){
                return(
                    <div id="weatherDiv">
                        <img src={require("../img/icon/cloud_little_rain.gif")} alt=""/>
                        <p>{weatherInfo.tmp}</p>
                    </div>
                );
            }else if(weatherInfo.pty === "눈"){
                return(
                    <div id="weatherDiv">
                        <img src={require("../img/icon/snow.gif")} alt=""/>
                        <p>{weatherInfo.tmp}</p>
                    </div>
                );
            }
        }else if(weatherInfo.sky === "구름조금" || weatherInfo.sky === "구름많음"){
            if(weatherInfo.pty === "없음"){
                return(
                    <div id="weatherDiv">
                        <img src={require("../img/icon/cloud.gif")} alt=""/>
                        <p>{weatherInfo.tmp}</p>
                    </div>
                );
            }else if(weatherInfo.pty === "비" || weatherInfo.pty === "비/눈" || weatherInfo.pty === "소나기"){
                return(
                    <div id="weatherDiv">
                        <img src={require("../img/icon/cloud_little_rain.gif")} alt=""/>
                        <p>{weatherInfo.tmp}</p>
                    </div>
                );
            }else if(weatherInfo.pty === "눈"){
                return(
                    <div id="weatherDiv">
                        <img src={require("../img/icon/snow.gif")} alt=""/>
                        <p>{weatherInfo.tmp}</p>
                    </div>
                );
            }
        }else if(weatherInfo.sky === "흐림"){
            if(weatherInfo.pty === "없음"){
                if(parseFloat(weatherInfo.wsd.slice(0,3)) < 4){
                    return(
                        <div id="weatherDiv">
                            <img src={require("../img/icon/cloud.gif")} alt=""/>
                            <p>{weatherInfo.tmp}</p>
                        </div>
                    );
                }else if(parseFloat(weatherInfo.wsd.slice(0,3)) >= 4){
                    return(
                        <div id="weatherDiv">
                            <img src={require("../img/icon/wind_cloud.gif")} alt=""/>
                            <p>{weatherInfo.tmp}</p>
                        </div>
                    );
                }
            }else if(weatherInfo.pty === "비" || weatherInfo.pty === "비/눈" || weatherInfo.pty === "소나기"){
                if(parseFloat(weatherInfo.wsd.slice(0,3)) < 4){
                    return(
                        <div id="weatherDiv">
                            <img src={require("../img/icon/rain.gif")} alt=""/>
                            <p>{weatherInfo.tmp}</p>
                        </div>
                    );
                }else if(parseFloat(weatherInfo.wsd.slice(0,3)) >= 4){
                    return(
                        <div id="weatherDiv">
                            <img src={require("../img/icon/storm.gif")} alt=""/>
                            <p>{weatherInfo.tmp}</p>
                        </div>
                    );
                }
            }else if(weatherInfo.pty === "눈"){
                if(parseFloat(weatherInfo.wsd.slice(0,3)) < 4){
                    return(
                        <div id="weatherDiv">
                            <img src={require("../img/icon/snow.gif")} alt=""/>
                            <p>{weatherInfo.tmp}</p>
                        </div>
                    );
                }else if(parseFloat(weatherInfo.wsd.slice(0,3)) >= 4){
                    return(
                        <div id="weatherDiv">
                            <img src={require("../img/icon/snow_storm.gif")} alt=""/>
                            <p>{weatherInfo.tmp}</p>
                        </div>
                    );
                }
            }
        }else{
            //console.log("기상 데이터 없음");
        }
    }
    useEffect(()=>{
        renderWeatherDiv();
    },[]);
    useEffect(()=>{
        navigate("/Shop",{state:searchResultArr});
    },[searchResultArr]);
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
                {renderWeatherDiv()}
            </div>
            <Modal isOpen={isSearch} onRequestClose={() => setIsSearch(false)} className="search-modal-content"
                // 모달 내용에 적용할 클래스명
                overlayClassName="search-modal-overlay"
                // 모달 외부에 적용할 클래스명
                contentLabel="Example Modal">
                <input type="text" onChange={handleChange} onKeyDown={handleKeyDown}/>
                <img src={require("../img/icon/Search_light.png")} alt="" onClick={excuteSearch} />
            </Modal>
        </header>
    );
}

export default Header;