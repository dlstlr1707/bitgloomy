import CartSingleList from "../component/CartSingleList";
import "../css/cart.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Cart() {
    // 장바구니 페이지의 주문버튼을 누르면 주문페이지로 이동해서 배송지 결제 정보 입력함
    const [cartInfo,setCartInfo] = useState([]);
    const [checkedCartInfo,setCheckedCartInfo] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);
    const [reRenderFlag,setReRenderFlag] = useState(false);
    const checkboxRef = useRef(null);
    const btnRef = useRef(null);
    const toggleFlag = () => {
        requestCartInfo();
        setReRenderFlag((prev) => !prev);
    }
    const handleOnClick = async(e) => {
        //console.log(e.target.value);
        switch (e.target.value) {
            case "selectAllCart":
                if(e.target.type === "submit"){
                    if(checkboxRef.current.checked === true){
                        checkboxRef.current.checked=false;
                        setCheckedCartInfo([]);
                    }else{
                        checkboxRef.current.checked=true;
                        setCheckedCartInfo(cartInfo);
                    }
                }else if(e.target.type === "checkbox"){
                    console.log(checkboxRef.current.checked);
                    if(checkboxRef.current.checked === true){
                        setCheckedCartInfo(cartInfo);
                    }else{
                        setCheckedCartInfo([]);
                    }
                }
                break;
            case "deleteAllCart":
                await axios.delete("http://localhost:8080/carts/"+sessionStorage.getItem("userUid"),{
                    withCredentials: true  // 쿠키 자동 처리
                })
                    .then((response) => {
                        //정상 통신후 응답온 부분
                        console.log("성공");
                        toggleFlag();
                    })
                    .catch((e) => {
                        // 오류 발생시 처리부분
                        alert("실패");
                    });
                break;
            case "orderAllCart":
                setCheckedCartInfo(cartInfo);
                // axios로 checkedCartInfo를 order 경로로 요청
                requestOrder();
                break;
            case "orderSelectedCart":
                // axios로 checkedCartInfo를 order 경로로 요청
                requestOrder();
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
                <CartSingleList key={idx} cartInfo={item} toggleFlag={toggleFlag} setCheckedCartInfo={setCheckedCartInfo} checkedCartInfo={checkedCartInfo}/>
            ))}
            </>
        );
    }
    const requestOrder = () => {
        console.log("주문 실행");
        console.log(checkedCartInfo);
        console.log(totalPrice);
    }
    useEffect(()=>{
        requestCartInfo();
    },[]);
    useEffect(()=>{
        //console.log(cartInfo);
        let tempTotalPrice = 0;
        for(let i=0; i<checkedCartInfo.length;i++){
            tempTotalPrice = tempTotalPrice+checkedCartInfo[i].price;
        }
        setTotalPrice(tempTotalPrice);
    },[checkedCartInfo,totalPrice]);
    useEffect(()=>{
    },[cartInfo,checkedCartInfo]);
    useEffect(()=>{
        requestCartInfo();
        renderCartInfo();
    },[reRenderFlag]);
    return (
            <main>
                <div id="cartContainer">
                    <p>Cart</p>
                    <div id="cartTableDiv">
                        <div id="cartTopBtnDiv">
                            <button onClick={handleOnClick} value={"selectAllCart"} ref={btnRef}>전체 선택</button>
                            <button onClick={handleOnClick} value={"deleteAllCart"}>전체 삭제</button>
                        </div>
                        <table id="cartTable">
                            <thead>
                                <tr>
                                    <td><input type="checkbox" onClick={handleOnClick} value={"selectAllCart"} ref={checkboxRef}/></td>
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
    );
}

export default Cart;