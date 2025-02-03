import Footer from "./Footer";
import SideIconMenu from "../component/SideIconMenu";
import "../css/productDetail.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

function ProductDetail() {
    const location = useLocation();
    const [productInfo,setProductInfo]=useState([]);
    const [materialArr,setMaterialArr]=useState([]);
    const [fabricArr,setFabricArr]=useState([]);
    const [sizeArr,setSizeArr]=useState([]);
    const [currentTab,setCurrentTab] = useState("PRODUCT");
    const requestAddCart = () => {
        // axios로 서버에 해당 제품 장바구니에 담아달라고 요청함
    }
    const requestBuy = () => {
        // axios로 서버에 해당 제품 구매하겠다고 요청보냄
    }
    const handleClick = (e) => {
        if(e.target.id === "PRODUCT"){
            setCurrentTab("PRODUCT");
        }else if(e.target.id === "FABRIC"){
            setCurrentTab("FABRIC");
        }else if(e.target.id === "SIZE_INFO"){
            setCurrentTab("SIZE_INFO");
        }else{
            console.log("잘못된 인자 넘어옴!");
        }
    }
    const renderDynamicDiv = () => {
        if(currentTab === "PRODUCT"){
            return (
                <>
                    {materialArr==null? "":materialArr.map((item,idx) => (<p key={idx} className="infoDivP">- {item}</p>))}
                </>
            );
        }else if(currentTab === "FABRIC"){
            return(
                <>
                {fabricArr==null? "":fabricArr.map((item,idx) => (<p key={idx} className="infoDivP">- {item}</p>))}
                </>
            );
        }else if(currentTab === "SIZE_INFO"){
            return(
                <p className="infoDivP">- 사이즈 표 들어갈 자리</p>
            );
        }else{
            console.log("잘못된 인자 넘어옴!");
        }
    }
    useEffect(()=>{
        setProductInfo(location.state?.productInfo);
    },[]);
    useEffect(()=>{
        if (productInfo.productMaterial && typeof productInfo.productMaterial === 'string') {
            setMaterialArr(productInfo.productMaterial.split('/'));
        } else {
            //console.error("문자열이 정의되지 않았거나 유효하지 않습니다.");
        }
        if (productInfo.fabric && typeof productInfo.fabric === 'string') {
            setFabricArr(productInfo.fabric.split('/'));
        } else {
            //console.error("문자열이 정의되지 않았거나 유효하지 않습니다.");
        }
        if (productInfo.size && typeof productInfo.size === 'string') {
            setSizeArr(productInfo.size.split(','));
        } else {
            //console.error("문자열이 정의되지 않았거나 유효하지 않습니다.");
        }
    },[productInfo]);
    useEffect(()=>{
        
    },[materialArr,fabricArr,sizeArr]);
    useEffect(()=>{
        renderDynamicDiv();
    },[currentTab]);
    return (
        <div>
            <main>
            <p> 상세페이지 수정 예정</p>
                <div id="detailContainer">
                    <div id="detailImgDiv">
                        <div id="detailDisplayImg">
                            <img src="img/pants1.png" alt=""/>
                            <div id="arrowIcons">
                                <img src="img/icon/Expand_left.png" alt=""/>
                                <img src="img/icon/Expand_right.png" alt=""/>
                            </div>
                        </div>
                        <div id="detailBulletDiv">
                            <input type="radio" name="slide" id="slide1" checked="checked"/>
                            <input type="radio" name="slide" id="slide2"/>
                            <input type="radio" name="slide" id="slide3"/>
                            <input type="radio" name="slide" id="slide4"/>
                            <input type="radio" name="slide" id="slide5"/>
                            <input type="radio" name="slide" id="slide6"/>
                            <input type="radio" name="slide" id="slide7"/>
                            <input type="radio" name="slide" id="slide8"/>
                            <input type="radio" name="slide" id="slide9"/>
                            <div class="bullets">
                                <label for="slide1">&nbsp;</label>
                                <label for="slide2">&nbsp;</label>
                                <label for="slide3">&nbsp;</label>
                                <label for="slide4">&nbsp;</label>
                                <label for="slide5">&nbsp;</label>
                                <label for="slide6">&nbsp;</label>
                                <label for="slide7">&nbsp;</label>
                                <label for="slide8">&nbsp;</label>
                                <label for="slide9">&nbsp;</label>
                            </div>
                        </div>
                        <div id="detailAnotherColorDiv">
                            <p>ANOTHER COLOR ↓</p>
                            <div id="detailAnotherColorImgDiv">
                                <img src="img/pants2.png" alt=""/>
                                <img src="img/pants3.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div id="detailContentDiv">
                        <p id="pName">{productInfo.pname}</p>
                        <p>{productInfo.price} KRW</p>
                        <p>{productInfo.contents}</p>
                        <div id="productInfoDiv">
                            <div id="InfoTabDiv">
                                <p onClick={handleClick} id="PRODUCT">PRODUCT</p>
                                <p onClick={handleClick} id="FABRIC">FABRIC</p>
                                <p onClick={handleClick} id="SIZE_INFO">SIZE INFO</p>
                            </div>
                            <div id="infoDiv">
                                {renderDynamicDiv()}
                            </div>
                        </div>
                        <div id="detailOptionDiv">
                            <p>Option</p>
                            <div id="optionBoxDiv">
                            {sizeArr==null? "":sizeArr.map((item,idx) => (
                                <div class="optionBox" key={idx}>
                                    <p>{item}</p>
                                </div>
                                ))}
                            </div>
                        </div>
                        <div id="detailTotalDiv">
                            <p>Total 0</p>
                            <div id="selectResult"></div>
                        </div>
                        <div id="detailBtnDiv">
                            <button>ADD TO BAG</button>
                            <button>BUY NOW</button>
                        </div>
                    </div>
                    <SideIconMenu></SideIconMenu>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default ProductDetail;