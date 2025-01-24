import Footer from "./Footer";
import SideIconMenu from "../component/SideIconMenu";
import "../css/shop.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

//변경전 이미지 사이즈 240임 gap=16

function Shop () {
    const navigate = useNavigate();
    const handleClick = (e) => {
        navigate("/Detail");
    }
    const requestProductInfo = () => {
        // axios로 서버에 선택한제품의 상세 정보 요청 
        // 반환값을 디테일 페이지로 넘겨서 렌더링해야함
    }
    useEffect(()=>{
        // axios로 서버에 상품목록전체 요청
    },[]);
    return(
        <div>
            <main>
                <div id="shopContainer">
                    <div id="shopMenuList">
                        <ul>
                            <li>All</li>
                            <li>Top</li>
                            <li>Bottom</li>
                            <li>Acc</li>
                        </ul>
                    </div>
                    <SideIconMenu></SideIconMenu>
                    <div id="productListDiv">
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants1.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants2.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants3.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants1.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants2.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants3.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants1.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants2.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants3.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants1.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants2.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants3.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants1.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants2.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                        <div id="productInfoBox">
                            <div id="productInfoImgBox" onClick={handleClick}>
                                <img src="img/pants3.png" alt=""/>
                            </div>
                            <div id="productInfoPBox">
                                <p onClick={handleClick}>NOMAD CARGO PANTS WOODLAND</p>
                                <p>269,000 KRW</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Shop;