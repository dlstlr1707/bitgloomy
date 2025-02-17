import {useEffect, useRef, useState} from "react";
import "../css/findUserInfo.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FindUserInfo() {
    const [selectedTab, setSelectedTab] = useState("findId");
    const [id,setId] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [isAuth,setIsAuth] = useState(false);
    const [authStatus,setAuthStatus] = useState(false);
    const [authCode,setAuthCode] = useState("");
    const [changePW,setChangePW] = useState("");
    const btnRef = useRef(null);
    const [foundID,setFoundID] = useState("");
    const navigate = useNavigate();

    const handleClickP = (e) => {
        setSelectedTab(e.target.id);
        setId("");
        setName("");
        setEmail("");
        setAuthCode("");
        setIsAuth(false);
        setAuthStatus(false)
        setChangePW("");
    }
    const handleOnChange = (e) => {
        if(e.target.id === "id"){
            setId(e.target.value);
        }else if(e.target.id === "name"){
            setName(e.target.value);
        }else if(e.target.id === "email"){
            setEmail(e.target.value);
        }else if(e.target.id === "authCode"){
            setAuthCode(e.target.value);
        }else if(e.target.id === "changePassword"){
            setChangePW(e.target.value);
        }
    }
    const requestEmailAuth = async(e) => {
        e.preventDefault();
        console.log("이메일 인증 요청함");
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(e.target.id === "sendEmail"){
            if(regexEmail.test(email) === true && email !== ""){
                await axios
                .get("http://localhost:8080/mailSend/" + email)
                .then((response) => {
                    //정상 통신후 응답온 부분
                    setAuthStatus(true);
                })
                .catch((e) => {
                    // 오류 발생시 처리부분
                    alert("존재하지 않는 이메일입니다. 다시 입력해주세요!");
                    setAuthStatus(false);
                });
            }
        }else if(e.target.id === "sendAuthCode"){
            await axios
            .get("http://localhost:8080/mailCheck/" + authCode)
            .then((response) => {
                //정상 통신후 응답온 부분
                console.log("인증성공");
                setIsAuth(true);
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                setIsAuth(false);
                alert("인증에 실패하였습니다!");
            });
        }else{
            console.log("잘못된 인자 넘어옴!");
        }
    }
    const requestFindUser = async(e) => {
        if(e.target.id === "findIdBtn"){
            console.log("아이디 찾기 요청함");
            const findIdInfo = {
                name : name,
                email : email
            }
            console.log(findIdInfo);
            await axios
            .post("http://localhost:8080/findID",findIdInfo)
            .then((response) => {
                //정상 통신후 응답온 부분
                console.log("인증성공");
                setFoundID(response.data);
                setIsAuth(true);
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                setIsAuth(false);
                alert("찾기에 실패하였습니다!");
            });
        }else if(e.target.id === "findPasswordBtn"){
            console.log("비밀번호 변경 요청함");
            const findPasswordInfo = {
                id : id,
                name : name,
                email : email,
                changePW : changePW
            }
            console.log(findPasswordInfo);
            await axios
            .patch("http://localhost:8080/modifyPW",findPasswordInfo)
            .then((response) => {
                //정상 통신후 응답온 부분
                console.log("인증성공");
                setIsAuth(true);
                navigate("/LogIn");
            })
            .catch((e) => {
                // 오류 발생시 처리부분
                setIsAuth(false);
                alert("변경에 실패하였습니다!");
            });
        }
    }
    useEffect(() => {
        //console.log("selectedTab is : " + selectedTab);
        if(selectedTab === "findId"){
            if(name === "" || email === "" || authCode === "" || isAuth === false){
                btnRef.current.disabled = true;
            }else{
                btnRef.current.disabled = false;
            }
        }else if(selectedTab === "findPw"){
            if(id === "" || name === "" || email === "" || authCode === "" || isAuth === false){
                btnRef.current.disabled = true;
            }else{
                btnRef.current.disabled = false;
            }
        }
    }, [selectedTab,id,name,email,authCode,isAuth]);
    useEffect(()=>{

    },[authStatus,foundID]);
    return (
            <main>
                <div id="findUserContainer">
                    <div id="findUserTab">
                        <p id="findId" onClick={handleClickP}>아이디 찾기</p>
                        <p id="findPw" onClick={handleClickP}>비밀번호 변경</p>
                    </div>
                    {
                        selectedTab === "findId" &&< div id = "findUserInputDiv" > <div className="inputBoxDiv">
                                <p>NAME</p>
                                <input type="text" id="name" onChange={handleOnChange}/>
                            </div>
                            <div className="inputBoxDiv">
                                <p>E-MAIL</p>
                                <div id="emailInputBoxDiv">
                                    <input type="text" id="email" onChange={handleOnChange}/>
                                    {authStatus? <button onClick={requestEmailAuth} id="sendAuthCode">인증</button>:<button onClick={requestEmailAuth} id="sendEmail">전송</button>}
                                </div>
                            </div>
                            <div className="inputBoxDiv">
                                <p>AUTH CODE</p>
                                <input type="text" id="authCode" onChange={handleOnChange}/>
                            </div>
                            {
                                foundID!==""? <p>결과 : {foundID}</p> : <></>
                            }
                            <button ref={btnRef} id="findIdBtn" onClick={requestFindUser}>아이디 찾기</button>
                        </div>
                    }
                    {
                        selectedTab === "findPw" &&< div id = "findUserInputDiv" > <div className="inputBoxDiv">
                                <p>ID</p>
                                <input type="text" id="id" onChange={handleOnChange}/>
                            </div>
                            <div className="inputBoxDiv">
                                <p>NAME</p>
                                <input type="text" id="name" onChange={handleOnChange}/>
                            </div>
                            <div className="inputBoxDiv">
                                <p>E-MAIL</p>
                                <div id="emailInputBoxDiv">
                                    <input type="text" id="email" onChange={handleOnChange}/>
                                    {authStatus? <button onClick={requestEmailAuth} id="sendAuthCode">인증</button>:<button onClick={requestEmailAuth} id="sendEmail">전송</button>}
                                </div>
                            </div>
                            <div className="inputBoxDiv">
                                <p>AUTH CODE</p>
                                <input type="text" id="authCode" onChange={handleOnChange}/>
                            </div>
                            { isAuth?
                                <div className="inputBoxDiv">
                                    <p>CHANGE PASSWORD</p>
                                    <input type="password" id="changePassword" onChange={handleOnChange}/>
                                </div>:<></>
                            }
                            
                            <button ref={btnRef} id="findPasswordBtn" onClick={requestFindUser}>비밀번호 변경</button>
                        </div>
                    }
                </div>
            </main>
    );
}

export default FindUserInfo;