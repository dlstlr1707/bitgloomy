import SideIconMenu from "../component/SideIconMenu";
import ProductInfo from "../component/ProductInfo";
import "../css/shop.css";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function Shop() {
    const [productList,setProductList] = useState([]);
    const [productFilterList,setProductFilterList] = useState([]);
    const [currentTab,setCurrentTab] = useState("All");
    const navigate = useNavigate();
    const {state} = useLocation();
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
    const managementProduct = () => {
        if(sessionStorage.getItem("auth") === "role_admin"){
            navigate("/Management");
        }else{
            alert("관리자 전용 페이지입니다!");
        }
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
    const renderProductList = () => {
        return(
            <div id="productListDiv">
                {productFilterList.map((product,idx) => (<ProductInfo key={idx} productInfo={product} />))}
            </div>
        );
    }
    useEffect(() => {
        console.log(state);
        if(state == null || state.length===0){
            requestProductList();
        }else{
            setProductList(state);
            setProductFilterList(state);
        }
    },[]);
    useEffect(() => {
        renderProductList();
    },[productList,productFilterList]);
    useEffect(() => {
    },[state]);
    return (
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
                                ? <button id="uploadProductBtn" onClick={managementProduct}>상품관리</button>
                                : ""
                        }
                    </div>
                    <SideIconMenu></SideIconMenu>
                    {renderProductList()}
                </div>
            </main>
    );
}

export default Shop;