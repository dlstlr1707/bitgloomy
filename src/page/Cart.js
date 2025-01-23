import Footer from "./Footer";
import CartSingleList from "../component/CartSingleList";
import "../css/cart.css";
function Cart() {
    // 장바구니 페이지의 주문버튼을 누르면 주문페이지로 이동해서 배송지 결제 정보 입력함
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
                                <CartSingleList></CartSingleList>
                                <CartSingleList></CartSingleList>
                                <CartSingleList></CartSingleList>
                                <CartSingleList></CartSingleList>
                            </tbody>
                        </table>
                        <div id="cartPriceDiv">
                            <div class="priceBox">
                                <p>총 상품금액</p>
                                <p>1,076,000 KRW</p>
                            </div>
                            <div class="priceBox">
                                <p>배송비</p>
                                <p>0 KRW</p>
                            </div>
                            <div class="priceBox">
                                <p>결제 예정 금액</p>
                                <p>1,076,000 KRW</p>
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