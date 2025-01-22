import Footer from "./Footer";
import "../css/join.css";
import {useState} from "react";
import React from "react";

function Join() {
    const initInfo = {
        id: "",
        password: "",
        passwordCheck: "",
        name: "",
        phone1: 0,
        phone2: 0,
        email: "",
        smsAggrement: false,
        emailAggrement: false,
        policyAggrement: false,
        privacyPolicyAggrement: false
    }
    const initValidationResult = {
        idResult: "length_error",
        pwResult: "length_error",
        pwCheckResult: "fail",
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
    const handleJoinInfoChange = (e) => {
        switch (e.target.id) {
            case "id":
                if (e.target.value.length > 2 && e.target.value.length < 20) {
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
                setJoinInfo({
                    ...joinInfo,
                    id: e.target.value
                });
                break;
            case "password":
                if (e.target.value.length > 8 && e.target.value.length < 20) {
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
                if (e.target.value == joinInfo.password) {
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
                if (e.target.value.length > 2 && e.target.value.length < 20) {
                    if (nameRegex.test(e.target.value) == true) {
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
            case "phone1":
                const phone1Regex = /^[0-9]+$/;
                console.log(phone1Regex.test(e.target.value));
                if (phone1Regex.test(e.target.value) == true) {
                    setJoinInfo({
                        ...joinInfo,
                        phone1: e.target.value
                    });
                    console.log(e.target.value);
                }
                console.log("phone1 is "+joinInfo.phone1);
                break;
            case "phone2":
                const phone2Regex = /^[0-9]+$/;
                if (phone2Regex.test(e.target.value) == true) {
                    setJoinInfo({
                        ...joinInfo,
                        phone2: e.target.value
                    });
                }
                
                break;
            case "smsAggrement":
                setJoinInfo({
                    ...joinInfo,
                    smsAggrement: e.target.checked
                });
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
        }
    }
    const renderIdValidationResult = () => {
        if (validationResult.idResult == "exist_id") {
            return (
                <p style={{
                        color: "red"
                    }}>{Messages[5]}</p>
            );
        } else if (isExistId == false && validationResult.idResult == "length_ok") {
            return (
                <p style={{
                        color: "red"
                    }}>{Messages[4]}</p>
            );
        } else if (isExistId == true && validationResult.idResult == "length_ok") {
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
        if (validationResult.pwResult == "length_error") {
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
        if (validationResult.pwCheckResult == "success") {
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
        if (validationResult.nameResult == "length_ok") {
            return (
                <p style={{
                        color: "green"
                    }}>{Messages[9]}</p>
            );
        } else if (validationResult.nameResult == "fail") {
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
    const requestIsExsitId = (e) => {
        // axios로 서버에 id존재하는지 요청 보냄
        e.preventDefault();
        setIsExistId(true);
    }
    const requestJoinToServer = (e) => {
        e.preventDefault();
    }
    return (
        <div>
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
                        <div id="mobileInput">
                            <p>MOBLIE</p>
                            <div id="mobileInputDiv">
                                <p>010</p>
                                <p>-</p>
                                <input type="text" id="phone1" maxLength={4}/>
                                <p>-</p>
                                <input type="text" id="phone2" maxLength={4}/>
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
                                <input type="text"/>
                                <p>@</p>
                                <input id="email1" type="text"/>
                                <select name="email" id="email2">
                                    <option value="naver.com">naver.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    <option value="duam.net">duam.net</option>
                                    <option value="nate.com">nate.com</option>
                                    <option value="yahoo.com">yahoo.com</option>
                                    <option value="Direct_input">직접 입력</option>
                                </select>
                            </div>
                            <div id="emailAggrementDiv">
                                <p>이메일 수신동의</p>
                                <input id="emailAggrement" type="checkbox" onChange={handleJoinInfoChange}/>
                                <label for="emailAggrement">동의함</label>
                            </div>
                        </div>
                        <div class="policyInput">
                            <div class="policyInputDiv1">
                                <p>Aggrement</p>
                                <p>VIEW CONTENT</p>
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
                                <p>VIEW CONTENT</p>
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
                        <button onClick={requestJoinToServer}>회원가입</button>
                    </form>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Join;