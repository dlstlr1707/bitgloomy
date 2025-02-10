import {useEffect, useRef, useState} from "react";
import axios from "axios";

function CartSingleList({cartInfo,toggleFlag,setCheckedCartInfo}) {
    const [amount,setAmount] = useState(1);
    const [price,setPrice] = useState(0);
    const [totalAmount,setTotalAmount] = useState(10);
    const inputRef = useRef(null);
    const onChangeAmount = (e) => {
        if(e.target.value>=totalAmount){
            inputRef.current.value=totalAmount;
            setAmount(totalAmount);
        }else if(e.target.value<=0){
            inputRef.current.value=0;
            setAmount(0);
        }
        else{
            inputRef.current.value=amount;
            setAmount(e.target.value);
        }
    }
    const modifyCount = (e) => {
        if (e.target.value === "minus") {
            if(amount<=1){
                inputRef.current.value=1;
                setAmount(1);
            }else{
                inputRef.current.value=amount-1;
                setAmount(amount-1);
                requestModifyCartInfo(e);
            }
        } else if (e.target.value === "plus") {
            if(amount>=totalAmount){
                inputRef.current.value=totalAmount;
                setAmount(totalAmount);
            }else{
                inputRef.current.value=amount+1;
                setAmount(amount+1);
                requestModifyCartInfo(e);
            }
        } else {
            console.log("잘못된 인자가 넘어오고 있음 !!");
        }
    }
    const handleOnClickSingleCart = (e) => {
        //console.log(e.target.value);
        if(e.target.value === "ORDER"){
            // 주문페이지 이동
        }else if(e.target.value === "DELETE"){
            // 장바구니에서 삭제
            requestDeleteCartInfo();
        }else{
            console.log("잘못된 인자가 넘어옴 !!");
        }
    }
    const requestModifyCartInfo = async(e) =>{
        let tempPrice =0;
        let tempAmount =0;
        if(e.target.value === "minus"){
            tempAmount = amount-1;
            tempPrice = price - (cartInfo.price/cartInfo.amount);
        }else if(e.target.value === "plus"){
            tempAmount = amount+1;
            tempPrice = price + (cartInfo.price/cartInfo.amount);
        }
        setPrice(tempPrice);
        const modifyCartInfo = {
            amount : tempAmount,
            price : tempPrice,
            uid : cartInfo.uid
        }
        console.log(modifyCartInfo);
        
        await axios.patch("http://localhost:8080/cart",modifyCartInfo,{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                //console.log("성공");
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                alert("실패");
            });
            
    }
    const requestDeleteCartInfo = async() => {
        await axios.delete("http://localhost:8080/cart/"+cartInfo.uid,{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                //console.log("성공");
                toggleFlag();
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                alert("실패");
            });
    }
    useEffect(()=>{
        setAmount(cartInfo.amount);
        setPrice(cartInfo.price);
    },[]);
    useEffect(()=>{
        //console.log(amount);
        //console.log(price);
    },[amount,price]);
    return (
        <tr>
            <td><input type="checkbox"/></td>
            <td><img src={cartInfo.productImg.imgURL} alt=""/></td>
            <td>
                <p>{cartInfo.productName}</p>
                <p>[ 옵션 : {cartInfo.size} ]</p>
            </td>
            <td>{price.toLocaleString('ko-KR')} KRW</td>
            <td>
                <div id="amountDiv">
                    <button onClick={modifyCount} value={"minus"}>-</button>
                    <input type="number" defaultValue={cartInfo.amount} onChange={onChangeAmount} ref={inputRef}/>
                    <button onClick={modifyCount} value={"plus"}>+</button>
                </div>
            </td>
            <td>
                <div id="orderDiv">
                    <button onClick={handleOnClickSingleCart} value={"ORDER"}>ORDER</button>
                    <button onClick={handleOnClickSingleCart} value={"DELETE"}>DELETE</button>
                </div>
            </td>
        </tr>
    );
}

export default CartSingleList;