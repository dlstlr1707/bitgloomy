import {Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './page/Header';
import Shop from './page/Shop';
import ProductDetail from './page/ProductDetail';
import Info from './page/Info';
import LogIn from './page/LogIn';
import Join from './page/Join';
import Notice from './page/Notice';
import Cart from './page/Cart';
import Profile from './page/Profile';
import Management from './page/Management';
import {useEffect, useState} from "react";
import FindUserInfo from './page/FindUserInfo';
import Footer from './page/Footer';
import axios from "axios";

function App() {
    const [isLogin, setIsLogin] = useState();
    const [latitude, setLatitude] = useState(37.820708667); //위도
    const [longitude, setLongitude] = useState(127.092816994); // 경도
    const [weatherInfo,setWeatherInfo] = useState([]);
    const requestWeatherApi = async() => {
        // 기상청 단기예보 서버에 요청함
        console.log("기상청 데이터 요청함");

        const coordsInfo = {
            latitude : latitude,
            longitude : longitude
        };

        await axios.post("http://localhost:8080/weather",coordsInfo,{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                console.log("성공");
                setWeatherInfo(response.data);
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                console.log("실패");
            });

    }
    useEffect(() => {
        //console.log(weatherInfo);
    }, [isLogin, latitude, longitude,weatherInfo]);
    useEffect(() => {
        if (sessionStorage.getItem("userUid") != null) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }

        const geolocation = navigator.geolocation;

        function success(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        }
        function error() {
            alert("죄송합니다. 위치 정보를 사용할 수 없습니다.");
        }
        const options = {
            enableHighAccuracy: true,
            maximumAge: 30000,
        };
        geolocation.getCurrentPosition(success, error, options);

        //일단 주석 처리 해두고 추후 작업 예정
        //requestWeatherApi();
    }, []);
    return (
        <div>
            <Header isLogin={isLogin} weatherInfo={weatherInfo}/>
            <Routes>
                <Route path="/" element={<Info/>}></Route>
                <Route path="/Shop" element={<Shop/>}></Route>
                <Route path="/Info" element={<Info/>}></Route>
                <Route path="/Shop" element={<Shop/>}></Route>
                <Route path="/Detail/:pname" element={<ProductDetail />}></Route>
                <Route path="/Notice" element={<Notice/>}></Route>
                <Route
                    path="/LogIn"
                    element={<LogIn setIsLogin = {
                        setIsLogin
                    } />}></Route>
                <Route path="/Find" element={<FindUserInfo/>}></Route>
                <Route
                    path="/Join"
                    element={<Join setIsLogin = {
                        setIsLogin
                    } />}></Route>
                <Route path="/Cart" element={<Cart/>}></Route>
                <Route
                    path="/Profile"
                    element={<Profile setIsLogin = {
                        setIsLogin
                    } />}></Route>
                <Route path="/Management" element={<Management/>}></Route>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
