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
import {useEffect, useState} from "react";
import FindUserInfo from './page/FindUserInfo';
import Footer from './page/Footer';
function App() {
    const [isLogin,setIsLogin] = useState(false);
    const toggleIsLogin = () => {
        setIsLogin(!isLogin);
    }
    useEffect(()=>{
        console.log("isLogin is :"+ isLogin);
    },[isLogin]);
    return (
        <div>
            <Header isLogin={isLogin}/>
            <Routes>
                <Route path="/" element={<Info/>}></Route>
                <Route path="/Shop" element={<Shop/>}></Route>
                <Route path="/Info" element={<Info/>}></Route>
                <Route path="/Shop" element={<Shop/>}></Route>
                <Route path="/Detail" element={<ProductDetail/>}></Route>
                <Route path="/Notice" element={<Notice/>}></Route>
                <Route path="/LogIn" element={<LogIn toggleIsLogin={toggleIsLogin}/>}></Route>
                <Route path="/Find" element={<FindUserInfo/>}></Route>
                <Route path="/Join" element={<Join toggleIsLogin={toggleIsLogin}/>}></Route>
                <Route path="/Cart" element={<Cart/>}></Route>
                <Route path="/Profile" element={<Profile toggleIsLogin={toggleIsLogin}/>}></Route>

            </Routes>
        </div>
    );
}

export default App;
