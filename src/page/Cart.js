import Footer from "./Footer";
import CartSingleList from "../component/CartSingleList";
import "../css/cart.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
    // 장바구니 페이지의 주문버튼을 누르면 주문페이지로 이동해서 배송지 결제 정보 입력함
    const [cartInfo,setCartInfo] = useState([]);
    const [checkedCartInfo,setCheckedCartInfo] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);
    const [reRenderFlag,setReRenderFlag] = useState(false);
    const toggleFlag = () => {
        requestCartInfo();
        setReRenderFlag((prev) => !prev);
    }
    const handleOnClick = (e) => {
        console.log(e.target.value);
        switch (e.target.value) {
            case "selectAllCart":
                break;
            case "deleteAllCart":
                break;
            case "orderAllCart":
                break;
            case "orderSelectedCart":
                break;
            default:
                break;
        }
    }
    const requestCartInfo = async() => {
        await axios.get("http://localhost:8080/carts/"+sessionStorage.getItem("userUid"),{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                //console.log("성공");
                //console.log(response.data);
                setCartInfo(response.data);
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                setCartInfo([]);
            });
    }
    const renderCartInfo = () => {
        return(
            <>
            {Array.isArray(cartInfo)&&cartInfo.map((item,idx)=>(
                <CartSingleList key={idx} cartInfo={item} toggleFlag={toggleFlag} setCheckedCartInfo={setCheckedCartInfo}/>
            ))}
            </>
        );
    }
    useEffect(()=>{
        requestCartInfo();
    },[]);
    useEffect(()=>{
        //console.log(cartInfo);
        let tempTotalPrice = 0;
        for(let i=0; i<cartInfo.length;i++){
            tempTotalPrice = tempTotalPrice+cartInfo[i].price;
        }
        setTotalPrice(tempTotalPrice);
    },[cartInfo,totalPrice]);
    useEffect(()=>{
        renderCartInfo();
    },[reRenderFlag,cartInfo]);
    return (
        <div>
            <main>
                <div id="cartContainer">
                    <p>Cart</p>
                    <div id="cartTableDiv">
                        <div id="cartTopBtnDiv">
                            <button onClick={handleOnClick} value={"selectAllCart"}>전체 선택</button>
                            <button onClick={handleOnClick} value={"deleteAllCart"}>전체 삭제</button>
                        </div>
                        <table id="cartTable">
                            <thead>
                                <tr>
                                    <td><input type="checkbox"/></td>
                                    <td>IMAGE</td>
                                    <td>PRODUCT</td>
                                    <td>PRICE</td>
                                    <td>AMOUNT</td>
                                    <td>ORDER</td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderCartInfo()}
                            </tbody>
                        </table>
                        <div id="cartPriceDiv">
                            <div className="priceBox">
                                <p>총 상품금액</p>
                                <p>{totalPrice.toLocaleString('ko-KR')} KRW</p>
                            </div>
                            <div className="priceBox">
                                <p>배송비</p>
                                <p>3,500 KRW</p>
                            </div>
                            <div className="priceBox">
                                <p>결제 예정 금액</p>
                                <p>{(totalPrice+3500).toLocaleString('ko-KR')} KRW</p>
                            </div>
                        </div>
                        <div id="cartBottomBtnDiv">
                            <button onClick={handleOnClick} value={"orderAllCart"}>전체 상품 주문</button>
                            <button onClick={handleOnClick} value={"orderSelectedCart"}>선택 상품 주문</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Cart;