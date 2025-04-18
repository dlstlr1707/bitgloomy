import "../css/join.css";
import TermsModal from "../component/TermsModal";
import PrivacyTermsModal from "../component/PrivacyTermsModal";
import DaumPostCode from "../component/DaumPostCode";
import {useEffect, useRef, useState} from "react";
import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Join({setIsLogin}) {
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const joinBtnRef = useRef(null);
    const addressRef = useRef(null);
    const initInfo = {
        id: "",
        password: "",
        passwordCheck: "",
        name: "",
        postcode: "",
        mainAddress: "",
        subAddress: "",
        phone1: "",
        phone2: "",
        email1: "",
        email2: "",
        smsAggrement: false,
        emailAggrement: false,
        policyAggrement: false,
        privacyPolicyAggrement: false
    }
    const initValidationResult = {
        idResult: "length_error",
        pwResult: "length_error",
        pwCheckResult: "fail",
        emailResult: "fail",
        nameResult: "length_error"
    }
    const Messages = [
        "아이디는 2~20글자여야 합니다.",
        "비밀번호는 8~20글자여야 합니다.",
        "비밀번호가 일치 하지 않습니다.",
        "이름은 2~20글자여야 하며 영문 대,소문자 및 한글만 허용합니다.",
        "중복검사를 하지 않았습니다.",
        "이미 존재하는 아이디입니다.",
        "유효한 아이디입니다.",
        "유효한 비밀번호입니다.",
        "비밀번호가 일치합니다.",
        "유효한 이름입니다.",
        "유효하지 않은 문자가 포함되어 있습니다."
    ];
    const [isExistId, setIsExistId] = useState(false);
    const [joinInfo, setJoinInfo] = useState(initInfo);
    const [validationResult, setValidationResult] = useState(initValidationResult);
    const [checkedID, setCheckedID] = useState("");
    const [emailAuthCode,setEmailAuthCode] = useState("");
    const [addressInput,setAddressInput] = useState({
        mainAddress : "",
        subAddress : "",
        postcode : "" 
    });
    const [isEmailAuth,setIsEmailAuth] = useState(false);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const handleJoinInfoChange = (e) => {
        // 입력한 스트링에 정규식을 이용해 특수문자 일부를 제한 해야함 - 보안상 spring 쓰던가 아니면 직접 하던가
        switch (e.target.id) {
            case "id":
                if (e.target.value.length >= 2 && e.target.value.length <= 20) {
                    setValidationResult({
                        ...validationResult,
                        idResult: "length_ok"
                    });
                } else {
                    setValidationResult({
                        ...validationResult,
                        idResult: "length_error"
                    });
                    setIsExistId(false);
                }
                if ((checkedID !== "") && (checkedID !== e.target.value)) {
                    setIsExistId(false);
                }
                setJoinInfo({
                    ...joinInfo,
                    id: e.target.value
                });
                break;
            case "password":
                if (e.target.value.length >= 8 && e.target.value.length <= 20) {
                    setValidationResult({
                        ...validationResult,
                        pwResult: "length_ok"
                    });
                } else {
                    setValidationResult({
                        ...validationResult,
                        pwResult: "length_error"
                    });
                }
                setJoinInfo({
                    ...joinInfo,
                    password: e.target.value
                });
                break;
            case "passwordCheck":
                if (e.target.value === joinInfo.password) {
                    setValidationResult({
                        ...validationResult,
                        pwCheckResult: "success"
                    });
                } else {
                    setValidationResult({
                        ...validationResult,
                        pwCheckResult: "fail"
                    });
                }
                setJoinInfo({
                    ...joinInfo,
                    passwordCheck: e.target.value
                });
                break;
            case "name":
                const nameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
                if (e.target.value.length >= 2 && e.target.value.length <= 20) {
                    if (nameRegex.test(e.target.value) === true) {
                        setValidationResult({
                            ...validationResult,
                            nameResult: "length_ok"
                        });
                    } else {
                        setValidationResult({
                            ...validationResult,
                            nameResult: "fail"
                        });
                    }
                } else {
                    setValidationResult({
                        ...validationResult,
                        nameResult: "length_error"
                    });
                }
                setJoinInfo({
                    ...joinInfo,
                    name: e.target.value
                });
                break;
            case "postcode":
                setJoinInfo({
                    ...joinInfo,
                    postcode: e.target.value
                });
                setAddressInput({
                    ...addressInput,
                    postcode : e.target.value
                });
                break;
            case "mainAddress":
                setJoinInfo({
                    ...joinInfo,
                    mainAddress: e.target.value
                });
                setAddressInput({
                    ...addressInput,
                    mainAddress : e.target.value
                });
                break;
            case "subAddress":
                setJoinInfo({
                    ...joinInfo,
                    subAddress: e.target.value
                });
                setAddressInput({
                    ...addressInput,
                    subAddress : e.target.value
                });
                break;
            case "phone1":
                const phone1Regex = /^[0-9|]+$/;
                if (phone1Regex.test(e.target.value) === true) {
                    setJoinInfo({
                        ...joinInfo,
                        phone1: e.target.value
                    });
                } else {
                    e.target.value = "";
                }
                break;
            case "phone2":
                const phone2Regex = /^[0-9]+$/;
                if (phone2Regex.test(e.target.value) === true) {
                    setJoinInfo({
                        ...joinInfo,
                        phone2: e.target.value
                    });
                } else {
                    e.target.value = "";
                }
                break;
            case "smsAggrement":
                setJoinInfo({
                    ...joinInfo,
                    smsAggrement: e.target.checked
                });
                break;
            case "email1":
                const email1Regex1 = /^[a-z|A-Z|0-9]+$/;
                if (email1Regex1.test(e.target.value) === true) {
                    setJoinInfo({
                        ...joinInfo,
                        email1: e.target.value
                    });
                } else {
                    if (e.target.value === "") {
                        setJoinInfo({
                            ...joinInfo,
                            email1: ""
                        });
                    } else {
                        e.target.value = joinInfo.email1;
                    }
                }
                break;
            case "email2":
                setJoinInfo({
                    ...joinInfo,
                    email2: e.target.value
                });
                break;
            case "email3":
                if (e.target.value === "Direct_input") {
                    emailRef.current.disabled = false;
                    emailRef.current.value = "";
                } else {
                    emailRef.current.disabled = true;
                    emailRef.current.value = e.target.value;
                    setJoinInfo({
                        ...joinInfo,
                        email2: e.target.value
                    });
                }
                break;
            case "emailAuthCode":
                setEmailAuthCode(e.target.value);
                break;
            case "emailAggrement":
                setJoinInfo({
                    ...joinInfo,
                    emailAggrement: e.target.checked
                });
                break;
            case "policyAggrement":
                setJoinInfo({
                    ...joinInfo,
                    policyAggrement: e.target.checked
                });
                break;
            case "privacyPolicyAggrement":
                setJoinInfo({
                    ...joinInfo,
                    privacyPolicyAggrement: e.target.checked
                });
                break;
            default:
                break;
        }
    }
    const renderIdValidationResult = () => {
        if (validationResult.idResult === "exist_id") {
            return (
                <p style={{
                        color: "red"
                    }}>{Messages[5]}</p>
            );
        } else if (isExistId === false && validationResult.idResult === "length_ok") {
            return (
                <p style={{
                        color: "red"
                    }}>{Messages[4]}</p>
            );
        } else if (isExistId === true && validationResult.idResult === "length_ok") {
            return (
                <p style={{
                        color: "green"
                    }}>{Messages[6]}</p>
            );
        } else {
            return (
                <p style={{
                        color: "red"
                    }}>{Messages[0]}</p>
            );
        }
    }
    const renderPwValidationResult = () => {
        if (validationResult.pwResult === "length_error") {
            return (
                <p style={{
                        color: "red"
                    }}>{Messages[1]}</p>
            );
        } else {
            return (
                <p style={{
                        color: "green"
                    }}>{Messages[7]}</p>
            );
        }
    }
    const renderPwCheckValidationResult = () => {
        if (validationResult.pwCheckResult === "success") {
            return (
                <p style={{
                        color: "green"
                    }}>{Messages[8]}</p>
            );
        } else {
            return (
                <p style={{
                        color: "red"
                    }}>{Messages[2]}</p>
            );
        }
    }
    const renderNameValidationResult = () => {
        if (validationResult.nameResult === "length_ok") {
            return (
                <p style={{
                        color: "green"
                    }}>{Messages[9]}</p>
            );
        } else if (validationResult.nameResult === "fail") {
            return (
                <p style={{
                        color: "red"
                    }}>{Messages[10]}</p>
            );
        } else {
            return (
                <p style={{
                        color: "red"
                    }}>{Messages[3]}</p>
            );
        }
    }
    const requestIsExsitId = async (e) => {
        // axios로 서버에 id존재하는지 요청 보냄
        e.preventDefault();
        await axios
            .get("http://localhost:8080/checkID/" + joinInfo.id)
            .then((response) => {
                //정상 통신후 응답온 부분
                setCheckedID(joinInfo.id);
                setIsExistId(true);
                if(response.data === "해당 ID가 이미 존재합니다."){
                    setValidationResult({
                        ...validationResult,
                        idResult: "exist_id"
                    });
                    alert(response.data);
                }else{
                    setValidationResult({
                        ...validationResult,
                        idResult: "length_ok"
                    });
                    alert(response.data);
                }
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                setIsExistId(false);
            });
    }
    const requestEmailAuth = async(e) => {
        // 이메일 인증 api 연동 후 처리 하는 함수
        e.preventDefault();
        var email = joinInfo.email1 + "@" + joinInfo.email2;
        if(e.target.id === "sendEmail"){
            await axios
            .get("http://localhost:8080/mailSend/" + email)
            .then((response) => {
                //정상 통신후 응답온 부분
                setIsEmailAuth(true);
                alert("인증코드를 전송했습니다. 메일을 확인해주세요.");
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                alert("존재하지 않는 이메일입니다. 다시 입력해주세요!");
                setIsEmailAuth(false);
            });
        }else if(e.target.id === "sendAuthCode"){
            await axios
            .get("http://localhost:8080/mailCheck/" + emailAuthCode)
            .then((response) => {
                //정상 통신후 응답온 부분
                setValidationResult({
                    ...validationResult,
                    emailResult: "success"
                });
                alert("인증에 성공 하였습니다.");
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                setValidationResult({
                    ...validationResult,
                    emailResult: "fail"
                });
                alert("인증에 실패하였습니다!");
            });
        }else{
            console.log("잘못된 인자 넘어옴!");
        }
    }
    const handleClickOpenModal = (e) => {
        e.preventDefault();
        if (e.target.id === "policyAggrementModal") {
            setIsTermsModalOpen(!isTermsModalOpen);
        } else if (e.target.id === "privacyAggrementModal") {
            setIsPrivacyModalOpen(!isPrivacyModalOpen);
        } else if(e.target.id === "addressModal"){
            setIsAddressModalOpen(!isAddressModalOpen);
        } else {
            console.log("잘못된 요청입니다.");
        }
    }
    const isDisableJoinBtn = () => {
        let resultId = (validationResult.idResult === "length_ok") && isExistId;
        let resultPw = validationResult.pwResult === "length_ok";
        let resultPwCheck = validationResult.pwCheckResult === "success";
        let resultAddress = (joinInfo.postcode !== "")&&(joinInfo.mainAddress !== "");
        let resultName = validationResult.nameResult === "length_ok";
        let resultPhone = ((joinInfo.phone1 !== "") && (joinInfo.phone1.length === 4)) && (
            (joinInfo.phone2 !== "") && (joinInfo.phone2.length === 4)
        );
        let resultEmail = (joinInfo.email1 !== "") && (joinInfo.email2 !== "");
        let resultEmailAuth = validationResult.emailResult === "success";
        let resultAggrement = joinInfo.policyAggrement;
        let resultPolicy = joinInfo.privacyPolicyAggrement;

        if (resultId && resultPw && resultPwCheck && resultName && resultAddress && resultPhone && resultEmail && resultEmailAuth && resultAggrement && resultPolicy) {
            joinBtnRef.current.disabled = false;
        } else {
            joinBtnRef.current.disabled = true;
        }
    }
    const requestJoinToServer = async (e) => {
        e.preventDefault();
        let smsReception;
        let emailReception;
        if (joinInfo.smsAggrement === true) {
            smsReception = "y";
        } else {
            smsReception = "n";
        }
        if (joinInfo.emailAggrement === true) {
            emailReception = "y";
        } else {
            emailReception = "n";
        }
        const requestJoinInfo = {
            "id": joinInfo.id,
            "password": joinInfo.password,
            "name": joinInfo.name,
            "postcode": joinInfo.postcode,
            "address": joinInfo.mainAddress +" "+ joinInfo.subAddress,
            "phoneNum": "010-" + joinInfo.phone1 + "-" + joinInfo.phone2,
            "smsReception": smsReception,
            "email": joinInfo.email1 + "@" + joinInfo.email2,
            "emailReception": emailReception
        };
        await axios
            .post("http://localhost:8080/users", requestJoinInfo, {
                withCredentials: true // 쿠키 자동 처리
            })
            .then((response) => {
                //정상 통신후 응답온 부분
                sessionStorage.setItem("userUid",response.data["userUid"]);
                sessionStorage.setItem("auth",response.data["auth"]);
                sessionStorage.setItem("name",response.data["name"]);
                sessionStorage.setItem("email",response.data["email"]);
                sessionStorage.setItem("phoneNum",response.data["phoneNum"]);
                sessionStorage.setItem("mainPostcode",response.data["postcode1"]);
                sessionStorage.setItem("mainAddress",response.data["address1"]);
                {setIsLogin(true);}
                navigate("/Shop");
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                console.log(e);
                alert("가입에 실패했습니다.");
            });
    }
    useEffect(() => {
        isDisableJoinBtn();
    }, []);
    useEffect(() => {
        isDisableJoinBtn();
    }, [joinInfo, isExistId, checkedID,validationResult,addressInput]);
    useEffect(() => {
    }, [isTermsModalOpen,emailAuthCode]);
    useEffect(()=>{
        setJoinInfo({
            ...joinInfo,
            mainAddress : addressInput.mainAddress,
            postcode : addressInput.postcode
        });
    },[isAddressModalOpen]);
    return (
            <main>
                <div id="joinContainer">
                    <p>CREATE ACCOUNT</p>
                    <form id="joinForm" action="">
                        <div id="idInput">
                            <p>ID</p>
                            <input type="text" onChange={handleJoinInfoChange} id="id"/>
                            <div class="validation">
                                {renderIdValidationResult()}
                                <button onClick={requestIsExsitId}>중복확인</button>
                            </div>
                        </div>
                        <div id="pwInput">
                            <p>PASSWORD</p>
                            <input type="password" onChange={handleJoinInfoChange} id="password"/>
                            <div class="validation">
                                {renderPwValidationResult()}
                            </div>
                        </div>
                        <div id="pwCheckInput">
                            <p>PASSWORD CHECK</p>
                            <input type="password" onChange={handleJoinInfoChange} id="passwordCheck"/>
                            <div class="validation">
                                {renderPwCheckValidationResult()}
                            </div>
                        </div>
                        <div id="nameInput">
                            <p>NAME</p>
                            <input type="text" onChange={handleJoinInfoChange} id="name"/>
                            <div class="validation">
                                {renderNameValidationResult()}
                            </div>
                        </div>
                        <div id="addressInput">
                            <p>ADDRESS</p>
                            <div id="addressInputDiv">
                                <div>
                                    <input ref={addressRef} type="text" onChange={handleJoinInfoChange} id="postcode" value={addressInput.postcode} disabled/>
                                    <button onClick={handleClickOpenModal} id="addressModal">주소 찾기</button>
                                    <DaumPostCode 
                                        isModalOpen={isAddressModalOpen}
                                        addressInput = {addressInput}
                                        changeIsModalOpen={setIsAddressModalOpen}
                                        setAddressInput = {setAddressInput}
                                        ref={addressRef}
                                        />
                                </div>
                                <input ref={addressRef} type="text" onChange={handleJoinInfoChange} id="mainAddress" value={addressInput.mainAddress} disabled/>
                                <input type="text" onChange={handleJoinInfoChange} id="subAddress"/>
                            </div>
                        </div>
                        <div id="mobileInput">
                            <p>MOBLIE</p>
                            <div id="mobileInputDiv">
                                <p>010</p>
                                <p>-</p>
                                <input type="text" id="phone1" maxLength={4} onChange={handleJoinInfoChange}/>
                                <p>-</p>
                                <input type="text" id="phone2" maxLength={4} onChange={handleJoinInfoChange}/>
                            </div>
                            <div id="smsAggrementDiv">
                                <p>SMS 수신동의</p>
                                <input id="smsAggrement" type="checkbox" onChange={handleJoinInfoChange}/>
                                <label for="smsAggrement">동의함</label>
                            </div>
                        </div>
                        <div id="emailInput">
                            <p>E-MAIL</p>
                            <div id="emailInputDiv">
                                <input id="email1" type="text" onChange={handleJoinInfoChange}/>
                                <p>@</p>
                                <input id="email2" type="text" onChange={handleJoinInfoChange} ref={emailRef}/>
                                <select
                                    defaultValue={"Direct_input"}
                                    name="email"
                                    id="email3"
                                    onChange={handleJoinInfoChange}>
                                    <option value="Direct_input">직접 입력</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="duam.net">duam.net</option>
                                    <option value="nate.com">nate.com</option>
                                    <option value="yahoo.com">yahoo.com</option>
                                </select>
                            </div>
                            <div id="emailInputSub">
                                <div id="emailCheckDiv">
                                    <input type="number" onChange={handleJoinInfoChange} id="emailAuthCode"/>
                                    {isEmailAuth? <button onClick={requestEmailAuth} id="sendAuthCode">인증</button>:<button onClick={requestEmailAuth} id="sendEmail">전송</button>}
                                </div>
                                <div id="emailAggrementDiv">
                                    <p>이메일 수신동의</p>
                                    <input id="emailAggrement" type="checkbox" onChange={handleJoinInfoChange}/>
                                    <label for="emailAggrement">동의함</label>
                                </div>
                            </div>
                        </div>
                        <div class="policyInput">
                            <div class="policyInputDiv1">
                                <p>Aggrement</p>
                                <p id="policyAggrementModal" onClick={handleClickOpenModal}>VIEW CONTENT</p>
                                <TermsModal
                                    isModalOpen={isTermsModalOpen}
                                    changeIsModalOpen={setIsTermsModalOpen}/>
                            </div>
                            <div class="policyInputDiv2">
                                <p>이용약관에 동의하십니까?</p>
                                <input id="policyAggrement" type="checkbox" onChange={handleJoinInfoChange}/>
                                <label for="policyAggrement">동의함</label>
                            </div>
                        </div>
                        <div class="policyInput">
                            <div class="policyInputDiv1">
                                <p>Privacy Policy</p>
                                <p id="privacyAggrementModal" onClick={handleClickOpenModal}>VIEW CONTENT</p>
                                <PrivacyTermsModal
                                    isModalOpen={isPrivacyModalOpen}
                                    changeIsModalOpen={setIsPrivacyModalOpen}/>
                            </div>
                            <div class="policyInputDiv2">
                                <p>이용약관에 동의하십니까?</p>
                                <input
                                    id="privacyPolicyAggrement"
                                    type="checkbox"
                                    onChange={handleJoinInfoChange}/>
                                <label for="privacyPolicyAggrement">동의함</label>
                            </div>
                        </div>
                        <button onClick={requestJoinToServer} ref={joinBtnRef}>회원가입</button>
                    </form>
                </div>
            </main>
    );
}

export default Join;