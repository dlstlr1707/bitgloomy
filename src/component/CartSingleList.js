import {useEffect, useRef, useState} from "react";
function CartSingleList() {
    const [amount,setAmount] = useState(1);
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
            if(amount<=0){
                inputRef.current.value=0;
                setAmount(0);
            }else{
                inputRef.current.value=amount-1;
                setAmount(amount-1);
            }
        } else if (e.target.value === "plus") {
            if(amount>=totalAmount){
                inputRef.current.value=totalAmount;
                setAmount(totalAmount);
            }else{
                inputRef.current.value=amount+1;
                setAmount(amount+1);
            }
        } else {
            console.log("잘못된 인자가 넘어오고 있음 !!");
        }
    }
    const handleOnClickSingleCart = (e) => {
        console.log(e.target.value);
        if(e.target.value === "ORDER"){
            // 주문페이지 이동
        }else if(e.target.value === "DELETE"){
            // 장바구니에서 삭제
        }else{
            console.log("잘못된 인자가 넘어옴 !!");
        }
    }
    useEffect(()=>{

    },[amount]);
    return (
        <tr>
            <td><input type="checkbox"/></td>
            <td><img src="img/pants1.png" alt=""/></td>
            <td>
                <p>NOMAD CARGO PANTS WOODLAND</p>
                <p>[ 옵션 : 1 ]</p>
            </td>
            <td>269,000 KRW</td>
            <td>
                <div id="amountDiv">
                    <button onClick={modifyCount} value={"minus"}>-</button>
                    <input type="number" defaultValue={1} onChange={onChangeAmount} ref={inputRef}/>
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