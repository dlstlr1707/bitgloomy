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
            amount: 200,
            buyer_email: sessionStorage.getItem("email"),
            buyer_name: sessionStorage.getItem("name"),
            buyer_tel: sessionStorage.getItem("phoneNum"),
            buyer_addr: "서울특별시 강남구 신사동",
            buyer_postcode: "01181"
            }
            console.log(payData);
            window.IMP.request_pay(payData, rsp => {
            if (rsp.success) {
                // 결제 성공 시 로직
                console.log('결제 성공');
                console.log(rsp);
                createOrder(rsp.imp_uid);
            } else {
              // 결제 실패 시 로직
              console.log('Payment failed', rsp.error_msg);
              setIsOrder(false);
              // 추가로 실행할 로직을 여기에 작성

              // spring서버에 다시 주문한 상품의 정보를 전달해서 DB에 저장
            }
          });
    }
    // Axios POST 요청 함수 (주문 생성)
    const createOrder = (imp_uid) => {
        console.log(merchantUid);
        let tempName="";
        if(checkedCartInfo.length === 1){
            tempName = checkedCartInfo[0].productName;
        }else{
            tempName = checkedCartInfo[0].productName + "외 "+checkedCartInfo.length + "개";
        }
        const payData = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: merchantUid,
            name: tempName,
            amount: 200,
            buyer_email: sessionStorage.getItem("email"),
            buyer_name: sessionStorage.getItem("name"),
            buyer_tel: sessionStorage.getItem("phoneNum"),
            buyer_addr: "서울특별시 강남구 신사동",
            buyer_postcode: "01181"
            }
        axios.post("http://localhost:8080/save/payment", payData)
            .then((orderResponse) => {
                console.log(orderResponse);
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
            totalPrice: 200 // 결제 예정금액
        },{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                //console.log(response);
                // 사전 검증 성공 시 결제 요청 실행
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
                console.log(response);
                // 구매시 카트에 있던 리스트 서버에 보내서 order테이블에 저장
                // 이후 카트 목록에서 주문했던거 제거
                // 이후 재렌더링
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                console.error('사후 검증 실패');
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