import {useNavigate} from "react-router-dom";

function ProductInfo({productInfo}) {
    const navigate = useNavigate();
    const handleClick = (e) => {
        navigate("/Detail",{state : {productInfo : productInfo}});
    }
    return (
        <div id="productInfoBox">
            <div id="productInfoImgBox" onClick={handleClick}>
                <img src="img/pants1.png" alt=""/>
            </div>
            <div id="productInfoPBox">
                <p onClick={handleClick}>{productInfo.pname}</p>
                <p>{productInfo.price.toLocaleString('ko-KR')} KRW</p>
            </div>
        </div>
    );
}

export default ProductInfo;