import SideIconMenu from "../component/SideIconMenu";
import "../css/productDetail.css";
import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetail() {
    const params = useParams();
    const navigate = useNavigate();
    const [productInfo,setProductInfo]=useState([]);
    const [materialArr,setMaterialArr]=useState([]);
    const [fabricArr,setFabricArr]=useState([]);
    const [sizeArr,setSizeArr]=useState([]);
    const [detailImgArr,setDetailImgArr]=useState([]);
    const [similarNameArr,setSimilarNameArr]=useState([]);
    const [similarImgArr,setSimilarImgArr]=useState([]);
    const [currentTab,setCurrentTab] = useState("PRODUCT");
    const [total,setTotal] = useState([]);
    const [imgCount,setImgCount] = useState(1);

    const [isOrder,setIsOrder] = useState(false);
    const [merchantUid, setMerchantUid] = useState(null);
    const [totalPrice,setTotalPrice] = useState(0);

    const requestAddCart = async() => {
        // axios로 서버에 해당 제품 장바구니에 담아달라고 요청함
        if((sessionStorage.getItem("auth") == null)||(sessionStorage.getItem("userUid") == null)){
            navigate("/LogIn");
        }else{
            let tempSize = "";
            let tempCount = "";
            let tempTotalCount = "";
            for(var i=0; i<total.length;i++){
                tempCount = tempCount+","+total[i].count;
                tempSize = tempSize+","+total[i].size;
                tempTotalCount = tempTotalCount+","+(total[i].count*productInfo.price).toString();
            }
            const cartInfo = {
                userUid : sessionStorage.getItem("userUid"),
                productUid : productInfo.uid,
                productName : productInfo.pname,
                amount : tempCount.slice(1),
                price : tempTotalCount.slice(1),
                size : tempSize.slice(1)
            }
            await axios.post("http://localhost:8080/cart",cartInfo,{
                withCredentials: true  // 쿠키 자동 처리
            })
                .then((response) => {
                    //정상 통신후 응답온 부분
                    alert("상품이 cart에 담겼습니다.");
                })
                .catch((e) => {
                    // 오류 발생시 처리부분
                    alert("상품을 cart에 담는중 오류가 발생했습니다.");
                });
        }
    }

    // 임의의 6자리 숫자를 생성하는 함수
    const generateRandomNumber = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };
    const requestBuy = () => {
        // axios로 서버에 해당 제품 구매하겠다고 요청보냄
        if((sessionStorage.getItem("auth") == null)||(sessionStorage.getItem("userUid") == null)){
            navigate("/LogIn");
        }else{
            // total에 있는정보+현재 로그인정보 포함해서 전달
            console.log("axios로 요청 보냄");
            setIsOrder(true);
        }
    }
    const requestOrder = () => {
        const payData = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: merchantUid,
            name: productInfo.pname,
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
              // 추가로 실행할 로직을 여기에 작성

              // spring서버에 다시 주문한 상품의 정보를 전달해서 DB에 저장
            }
          });
    }
    // Axios POST 요청 함수 (주문 생성)
    const createOrder = (imp_uid) => {
        const payData = {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: merchantUid,
            name: productInfo.pname,
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
        for(var i = 0; i<total.length; i++){
            tmpRequestData.push({
                userUid : sessionStorage.getItem("userUid"),
                productUid : productInfo.uid,
                productName : productInfo.pname,
                merchantUid : merchantUid,
                amount : total[i].count,
                price : total[i].count*productInfo.price,
                size : total[i].size
            });
        }
        console.log(tmpRequestData);
        await axios.post("http://localhost:8080/save/order",tmpRequestData,{
            withCredentials: true  // 쿠키 자동 처리
        })
            .then((response) => {
                //정상 통신후 응답온 부분
                alert("구매에 성공 하였습니다.")
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                console.error("통신 실패");
            });
        
    }
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
        console.log("isOrder바뀜");
        if(isOrder === true){
            requestOrder();
        }
    },[isOrder]);

    const handleClick = (e) => {
        if(e.target.id === "PRODUCT"){
            setCurrentTab("PRODUCT");
        }else if(e.target.id === "FABRIC"){
            setCurrentTab("FABRIC");
        }else if(e.target.id === "SIZE_INFO"){
            setCurrentTab("SIZE_INFO");
        }else{
            // 사이즈 옵션 선택시 처리 코드
            let updateTotal = [...total];
            let isEmpty = true;
            for(var idx=0; idx<total.length;idx++){
                if(total[idx].size === e.target.id){
                    updateTotal[idx].count++;
                    isEmpty = false;
                    break;
                }
            }
            if(isEmpty){
                updateTotal.push({
                    size : e.target.id,
                    count : 1
                });
            }
            setTotal(Array.from(updateTotal));
        }
    }
    const clickedAmountBtn = (e) => {
        if(e.target.id === "minus"){
            let updateTotal = [...total];
            for(var idx=0; idx<total.length;idx++){
                if(total[idx].size === e.target.value){
                    if(updateTotal[idx].count<2){
                        updateTotal[idx].count=1;
                    }else{
                        updateTotal[idx].count--;
                    }
                    break;
                }
            }
            setTotal(Array.from(updateTotal));
        }else if(e.target.id === "plus"){
            let updateTotal = [...total];
            for(var idx=0; idx<total.length;idx++){
                if(total[idx].size === e.target.value){
                    if(updateTotal[idx].count>=productInfo.quantity){
                        alert("재고보다 많이 선택 할 수 없습니다!");
                        updateTotal[idx].count=productInfo.quantity;
                    }else{
                        updateTotal[idx].count++;
                    }
                    break;
                }
            }
            setTotal(Array.from(updateTotal));
        }else if(e.target.id === "delete"){
            setTotal(prevTotal => prevTotal.filter(item => item.size !== e.target.value));
        }else{
            console.log("잘못된 인자가 넘어옴!");
        }
    }
    const clickedArrowIcons = (e) => {
        if(e.target.id === "leftImg"){
            if(imgCount<=1){
                setImgCount(1);
            }
            else{
                setImgCount(imgCount-1);
            }
        }else if(e.target.id === "rightImg"){
            if(imgCount>=detailImgArr.length){
                setImgCount(detailImgArr.length);
            }
            else{
                setImgCount(imgCount+1);
            }
        }
    }
    const renderDynamicDiv = () => {
        if(currentTab === "PRODUCT"){
            return (
                <>
                    {Array.isArray(materialArr)&&materialArr.map((item,idx) => (<p key={idx} className="infoDivP">- {item}</p>))}
                </>
            );
        }else if(currentTab === "FABRIC"){
            return(
                <>
                {Array.isArray(fabricArr)&&fabricArr.map((item,idx) => (<p key={idx} className="infoDivP">- {item}</p>))}
                </>
            );
        }else if(currentTab === "SIZE_INFO"){
            return(
                <p className="infoDivP">- 사이즈 표 들어갈 자리</p>
            );
        }else{
            console.log("잘못된 인자 넘어옴!");
        }
    }
    const renderTotal = () => {
        return(
            <>
            {Array.isArray(total)&&total.map((item,idx) => (
                <div key={idx} id="selectResult">
                    <div id="selectInfo">
                        <p>{productInfo.pname}</p>
                        <p>- {item.size}</p>
                    </div>
                    <div id="selectAmount">
                        <p>{item.count}</p>
                        <button onClick={clickedAmountBtn} id="minus" value={item.size}>-</button>
                        <button onClick={clickedAmountBtn} id="plus" value={item.size}>+</button>
                        <button onClick={clickedAmountBtn} id="delete" value={item.size}>x</button>
                    </div>
                </div>
                ))}
            </>
        );
    }
    const requestProductInfo = async (name) => {
        await axios
            .get("http://localhost:8080/detail/"+name)
            .then((response) => {
                //정상 통신후 응답온 부분
                setProductInfo(response.data);
                let tempImgArr = [];
                tempImgArr.push(response.data.productImg["imgURL"]);
                tempImgArr.push(response.data.productImg["subImgUrl1"]);
                tempImgArr.push(response.data.productImg["subImgUrl2"]);
                tempImgArr.push(response.data.productImg["subImgUrl3"]);
                tempImgArr.push(response.data.productImg["subImgUrl4"]);
                tempImgArr.push(response.data.productImg["subImgUrl5"]);
                tempImgArr.push(response.data.productImg["subImgUrl6"]);
                tempImgArr.push(response.data.productImg["subImgUrl7"]);
                tempImgArr.push(response.data.productImg["subImgUrl8"]);
                tempImgArr.push(response.data.productImg["subImgUrl9"]);
                tempImgArr.push(response.data.productImg["subImgUrl10"]);
                let updateImgArr=[];
                for(var idx=0; idx<tempImgArr.length;idx++){
                    if(tempImgArr[idx] == null){
                        break;
                    }
                    updateImgArr.push(tempImgArr[idx]);
                }
                setDetailImgArr(updateImgArr);
                let subStrURL = response.data.productImg["similarImgUrl"].substr(1);
                let subStrName = response.data.productImg["similarProductName"];
                if (subStrURL && typeof subStrURL === 'string') {
                    setSimilarImgArr(subStrURL.split(','));
                } 
                if (subStrName && typeof subStrName === 'string') {
                    setSimilarNameArr(subStrName.split(','));
                }
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                console.log("오류 발생!");
            });
    }
    const requsetAnotherProductDetail = (e) => {
        requestProductInfo(similarNameArr[e.target.id]);
        setImgCount(1);
        setTotal([]);
        setCurrentTab("PRODUCT");
    }
    useEffect(()=>{
        requestProductInfo(params.pname);
    },[]);
    useEffect(()=>{
        if (productInfo.productMaterial && typeof productInfo.productMaterial === 'string') {
            setMaterialArr(productInfo.productMaterial.split('/'));
        } 
        if (productInfo.fabric && typeof productInfo.fabric === 'string') {
            setFabricArr(productInfo.fabric.split('/'));
        }
        if (productInfo.size && typeof productInfo.size === 'string') {
            setSizeArr(productInfo.size.split(','));
        }
    },[productInfo]);
    useEffect(()=>{
    },[materialArr,fabricArr,sizeArr,similarImgArr,detailImgArr,similarNameArr,imgCount,totalPrice]);
    useEffect(()=>{
        renderDynamicDiv();
        renderTotal();
        
        let tempTotalPrice = 0;
        for(let i=0; i<total.length;i++){
            tempTotalPrice = tempTotalPrice+total[i].count*productInfo.price;
        }
        setTotalPrice(tempTotalPrice);

        console.log(total);
        console.log(productInfo);
    },[currentTab,total]);
    return (
            <main>
                <div id="detailContainer">
                    <div id="detailImgDiv">
                        <div id="detailDisplayImg">
                            <img src={detailImgArr[imgCount-1]} alt=""/>
                            <div id="arrowIcons">
                                <img src={require("../img/icon/Expand_left.png")} id="leftImg" onClick={clickedArrowIcons} alt=""/>
                                <img src={require("../img/icon/Expand_right.png")} id="rightImg" onClick={clickedArrowIcons} alt=""/>
                            </div>
                        </div>
                        <div id="imgCountDiv">
                            <p> {imgCount}/{detailImgArr.length}</p>
                        </div>
                        <div id="detailAnotherColorDiv">
                            <p>ANOTHER COLOR ↓</p>
                            <div id="detailAnotherColorImgDiv">
                            {Array.isArray(similarImgArr)&&similarImgArr.map((item,idx) => (
                                <img src={item} alt="" key={idx} id={idx} onClick={requsetAnotherProductDetail}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div id="detailContentDiv">
                        <p id="pName">{productInfo.pname}</p>
                        <p>{productInfo.price && productInfo.price.toLocaleString('ko-KR')} KRW</p>
                        <p>{productInfo.contents}</p>
                        <div id="productInfoDiv">
                            <div id="InfoTabDiv">
                                <p onClick={handleClick} id="PRODUCT">PRODUCT</p>
                                <p onClick={handleClick} id="FABRIC">FABRIC</p>
                                <p onClick={handleClick} id="SIZE_INFO">SIZE INFO</p>
                            </div>
                            <div id="infoDiv">
                                {renderDynamicDiv()}
                            </div>
                        </div>
                        <div id="detailOptionDiv">
                            <p>Option</p>
                            <div id="optionBoxDiv">
                            {Array.isArray(sizeArr)&&sizeArr.map((item,idx) => (
                                <div class="optionBox" key={idx} onClick={handleClick} id={item}>
                                    <p id={item}>{item}</p>
                                </div>
                                ))}
                            </div>
                        </div>
                        <div id="detailTotalDiv">
                            <p>Total {total.length}</p>
                            {renderTotal()}
                        </div>
                        <div id="detailBtnDiv">
                            <button onClick={requestAddCart}>ADD TO BAG</button>
                            <button onClick={requestBuy}>BUY NOW</button>
                        </div>
                    </div>
                    <SideIconMenu></SideIconMenu>
                </div>
            </main>
    );
}

export default ProductDetail;