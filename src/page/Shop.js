import Footer from "./Footer";
import SideIconMenu from "../component/SideIconMenu";
import ProductInfo from "../component/ProductInfo";
import "../css/shop.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
//변경전 이미지 사이즈 240임 gap=16

function Shop() {
    const [productList,setProductList] = useState([]);
    const [productFilterList,setProductFilterList] = useState([]);
    const [currentTab,setCurrentTab] = useState("All");
    const navigate = useNavigate();
    const requestProductList = async () => {
        // axios로 서버에 상품목록전체 요청
        // 이미지 가져오는 부분 추가 해야함
        await axios
            .get("http://localhost:8080/products")
            .then((response) => {
                //정상 통신후 응답온 부분
                //console.log(response.data);
                setProductList(response.data);
                setProductFilterList(response.data);
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                console.log("오류 발생!");
            });
    }
    const uploadProduct = () => {
        navigate("/UploadProduct");
    }
    const clickedTab = (e) => {
        if(e.target.id === "All"){
            setCurrentTab(e.target.id);
            setProductFilterList(productList);
        }else if(e.target.id === "Top"){
            setCurrentTab(e.target.id);
            setProductFilterList(productList.filter((productInfo)=>(productInfo.category === "Top")));
        }else if(e.target.id === "Bottom"){
            setCurrentTab(e.target.id);
            setProductFilterList(productList.filter((productInfo)=>(productInfo.category === "Bottom")));
        }else if(e.target.id === "Acc"){
            setCurrentTab(e.target.id);
            setProductFilterList(productList.filter((productInfo)=>(productInfo.category === "Acc")));
        }else{
            console.log("잘못된 인자가 넘어옴");
            setCurrentTab("All");
            setProductFilterList(productList);
        }
    }
    useEffect(() => {
        requestProductList();
    },[]);
    useEffect(() => {
    },[productList]);
    useEffect(() => {
    },[productFilterList]);
    return (
        <div>
            <main>
                <div id="shopContainer">
                    <div id="shopMenuList">
                        <ul>
                            <li onClick={clickedTab} id="All">All</li>
                            <li onClick={clickedTab} id="Top">Top</li>
                            <li onClick={clickedTab} id="Bottom">Bottom</li>
                            <li onClick={clickedTab} id="Acc">Acc</li>
                        </ul>
                        {
                            sessionStorage.getItem("auth") === "role_admin"
                                ? <button id="uploadProductBtn" onClick={uploadProduct}>상품등록</button>
                                : ""
                        }
                    </div>
                    <SideIconMenu></SideIconMenu>
                    <div id="productListDiv">
                        {productFilterList.map((product,idx) => (<ProductInfo key={idx} productInfo={product} />))}
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Shop;