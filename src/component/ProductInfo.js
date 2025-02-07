import {useNavigate} from "react-router-dom";

function ProductInfo({productInfo}) {
    const navigate = useNavigate();
    const handleClick = (e) => {
        // 네비게이트로 디테일로 페이지만 넘기고 디테일 페이지내에서 axios요청 보냄
        navigate("/Detail/"+productInfo.pname);
    }
    return (
        <div id="productInfoBox">
            <div id="productInfoImgBox" onClick={handleClick}>
                <img src={productInfo.productImg.imgURL} alt=""/>
            </div>
            <div id="productInfoPBox">
                <p onClick={handleClick}>{productInfo.pname}</p>
                <p>{productInfo.price.toLocaleString('ko-KR')} KRW</p>
            </div>
        </div>
    );
}

export default ProductInfo;