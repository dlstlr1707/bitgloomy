import CartSingleList from "../component/CartSingleList";
import "../css/cart.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Cart() {
    // 장바구니 페이지의 주문버튼을 누르면 주문페이지로 이동해서 배송지 결제 정보 입력함
    const [cartInfo,setCartInfo] = useState([]);
    const [checkedCartInfo,setCheckedCartInfo] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);
    const [merchantUid, setMerchantUid] = useState(null);
    const [reRenderFlag,setReRenderFlag] = useState(false);
    const [isOrder,setIsOrder] = useState(false);
    const checkboxRef = useRef(null);
    const btnRef = useRef(null);
    const toggleFlag = () => {
        requestCartInfo();
        setReRenderFlag((prev) => !prev);
    }
    // 임의의 6자리 숫자를 생성하는 함수
    const generateRandomNumber = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };
    const handleOnClick = async(e) => {
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
                setIsOrder(true);
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
        let tempName="";
        if(checkedCartInfo.length === 1){
            tempName = checkedCartInfo[0].productName;
        }else{
            tempName = checkedCartInfo[0].productName + "외 "+checkedCartInfo.length + "개";
        }
        let tempTotalPrice = 0;
        for(let i=0; i<checkedCartInfo.length;i++){
            tempTotalPrice = tempTotalPrice+checkedCartInfo[i].price;
        }
        setTotalPrice(tempTotalPrice);
        const payData = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: merchantUid,
            name: tempName,
            amount: 1,
            buyer_email: sessionStorage.getItem("email"),
            buyer_name: sessionStorage.getItem("name"),
            buyer_tel: sessionStorage.getItem("phoneNum"),
            buyer_addr: sessionStorage.getItem("mainAddress"),
            buyer_postcode: sessionStorage.getItem("mainPostcode")
            }
            window.IMP.request_pay(payData, rsp => {
            if (rsp.success) {
                // 결제 성공 시 로직
                createOrder(rsp.imp_uid);
            } else {
              // 결제 실패 시 로직
              setIsOrder(false);
            }
          });
    }
    // Axios POST 요청 함수 (주문 생성)
    const createOrder = (imp_uid) => {
        const payData = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: merchantUid,
            name: tempName,
            amount: 1,
            buyer_email: sessionStorage.getItem("email"),
            buyer_name: sessionStorage.getItem("name"),
            buyer_tel: sessionStorage.getItem("phoneNum"),
            buyer_addr: sessionStorage.getItem("mainAddress"),
            buyer_postcode: sessionStorage.getItem("mainPostcode")
            }
        axios.patch("http://localhost:8080/payment", payData)
            .then((orderResponse) => {
                if (orderResponse.status === 200) {
                console.log('주문이 성공적으로 생성되었습니다.');
                // 성공한 경우 사후 검증 API 호출
                sendPostVerificationRequest(imp_uid);
                } else {
                    console.error('주문 생성 실패');
                }
            })
            .catch((error) => {
                console.error('주문 생성 요청 오류', error);
            });
    }

    // Axios POST 요청 함수 (사전 검증)
    const sendPreVerificationRequest = async () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        await axios.post("http://localhost:8080/order/prepare",{
            merchantUid: `${year}.${month}.${day}_${generateRandomNumber()}`, // 가맹점 주문번호
            totalPrice: 1 // 결제 예정금액
        },{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                setMerchantUid(response.data);
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                console.error('사전 검증 실패');
            });
        
    }

    // Axios POST 요청 함수 (사후 검증)
    const sendPostVerificationRequest = async (imp_uid) => {
        await axios.post("http://localhost:8080/order/validate",{
            merchantUid : merchantUid,
            impUid : imp_uid
        },{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                requestSaveOrderList(imp_uid);
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                console.error('사후 검증 실패');
            });
    }
    const requestSaveOrderList = async() => {
        let tmpRequestData=[];
        for(var i = 0; i<checkedCartInfo.length; i++){
            tmpRequestData.push({
                userUid : sessionStorage.getItem("userUid"),
                productUid : checkedCartInfo[i].productUid,
                productName : checkedCartInfo[i].productName,
                merchantUid : merchantUid,
                amount : checkedCartInfo[i].amount,
                price : checkedCartInfo[i].price,
                size : checkedCartInfo[i].size
            });
        }
        await axios.post("http://localhost:8080/save/order",tmpRequestData,{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                requestDeleteCart();
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                console.error("통신 실패");
            });
        
    }
    const requestDeleteCart = async() => {
        let tmpInfo = [];
        for(var i = 0; i<checkedCartInfo.length; i++){
            tmpInfo.push({
                uid : checkedCartInfo[i].uid
            });
        }
        await axios.post("http://localhost:8080/delete/carts",tmpInfo,{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                setCheckedCartInfo([]);
                toggleFlag();
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                alert("실패");
            });
    }
    useEffect(()=>{
        requestCartInfo();
    },[]);
    useEffect(()=>{
        if(isOrder === true){
            requestOrder();
        }
    },[isOrder]);
    useEffect(() => {
        // 외부 스크립트 로드 함수
        const loadScript = (src, callback) => {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = src;
          script.onload = callback;
          document.head.appendChild(script);
        };
        // 스크립트 로드 후 실행
        loadScript('https://code.jquery.com/jquery-1.12.4.min.js', () => {
          loadScript('https://cdn.iamport.kr/js/iamport.payment-1.2.0.js', () => {
            const IMP = window.IMP;
            // 가맹점 식별코드
            IMP.init("imp82833256");
          });
        });
        // 컴포넌트가 언마운트될 때 스크립트를 제거하기 위한 정리 함수
        return () => {
          const scripts = document.querySelectorAll('script[src^="https://"]');
          scripts.forEach((script) => script.remove());
        };
    }, []);
    useEffect(() => {
        // 컴포넌트가 마운트될 때 사전 검증 API 호출
        sendPreVerificationRequest();
    }, []);
    useEffect(()=>{
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