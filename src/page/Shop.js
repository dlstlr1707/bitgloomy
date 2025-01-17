import Footer from "./Footer";
import "../css/shop.css";
import { useNavigate } from "react-router-dom";

function Shop () {
    const navigate = useNavigate();
    const handleClick = (e) => {
        navigate("/Detail");
    }
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
                    <div id="sideIconMenu">
                        <img src="img/icon/Expand_top_stop.png" alt=""/>
                        <img src="img/icon/Expand_down_stop.png" alt=""/>
                        <div id="channelTalkDiv">
                            <img src="img/logo.png" alt=""/>
                        </div>
                    </div>
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
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Shop;