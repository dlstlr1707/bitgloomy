import {useEffect, useRef, useState} from "react";
import "../css/findUserInfo.css";

function FindUserInfo() {
    const [selectedTab, setSelectedTab] = useState("findId");
    const [id,setId] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [isAuth,setIsAuth] = useState(false);
    const [authCode,setAuthCode] = useState("");
    const btnRef = useRef(null);

    const handleClickP = (e) => {
        setSelectedTab(e.target.id);
        setId("");
        setName("");
        setEmail("");
        setAuthCode("");
        setIsAuth(false);
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
        }
    }
    const requestEmailAuth = () => {
        console.log("이메일 인증 요청함");
        setIsAuth(true);
    }
    const requestFindUser = (e) => {
        if(e.target.id === "findIdBtn"){
            console.log("아이디 찾기 요청함");
            const findIdInfo = {
                name : name,
                email : email,
                authCode : authCode
            }
            console.log(findIdInfo);
        }else if(e.target.id === "findPasswordBtn"){
            console.log("비밀번호 찾기 요청함");
            const findPasswordInfo = {
                id : id,
                name : name,
                email : email,
                authCode : authCode
            }
            console.log(findPasswordInfo);
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
    return (
            <main>
                <div id="findUserContainer">
                    <div id="findUserTab">
                        <p id="findId" onClick={handleClickP}>아이디 찾기</p>
                        <p id="findPw" onClick={handleClickP}>비밀번호 찾기</p>
                    </div>
                    {
                        selectedTab === "findId" &&< div id = "findUserInputDiv" > <div class="inputBoxDiv">
                                <p>NAME</p>
                                <input type="text" id="name" onChange={handleOnChange}/>
                            </div>
                            <div class="inputBoxDiv">
                                <p>E-MAIL</p>
                                <div id="emailInputBoxDiv">
                                    <input type="text" id="email" onChange={handleOnChange}/>
                                    <button onClick={requestEmailAuth}>인증</button>
                                </div>
                            </div>
                            <div class="inputBoxDiv">
                                <p>인증번호</p>
                                <input type="text" id="authCode" onChange={handleOnChange}/>
                            </div>
                            <button ref={btnRef} id="findIdBtn" onClick={requestFindUser}>아이디 찾기</button>
                        </div>
                    }
                    {
                        selectedTab === "findPw" &&< div id = "findUserInputDiv" > <div class="inputBoxDiv">
                                <p>ID</p>
                                <input type="text" id="id" onChange={handleOnChange}/>
                            </div>
                            <div class="inputBoxDiv">
                                <p>NAME</p>
                                <input type="text" id="name" onChange={handleOnChange}/>
                            </div>
                            <div class="inputBoxDiv">
                                <p>E-MAIL</p>
                                <div id="emailInputBoxDiv">
                                    <input type="text" id="email" onChange={handleOnChange}/>
                                    <button onClick={requestEmailAuth}>인증</button>
                                </div>
                            </div>
                            <div class="inputBoxDiv">
                                <p>인증번호</p>
                                <input type="text" id="authCode" onChange={handleOnChange}/>
                            </div>
                            <button ref={btnRef} id="findPasswordBtn" onClick={requestFindUser}>비밀번호 찾기</button>
                        </div>
                    }
                </div>
            </main>
    );
}

export default FindUserInfo;