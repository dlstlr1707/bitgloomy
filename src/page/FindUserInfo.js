import {useEffect, useState} from "react";
import "../css/findUserInfo.css";
import Footer from "./Footer";
function FindUserInfo() {
    const [selectedTab, setSelectedTab] = useState("");
    const handleClickP = (e) => {
        setSelectedTab(e.target.id);
    }
    const renderFindUserInput = () => {
        if (selectedTab === "findId"||selectedTab==="") {
            return (
                <div id="findUserInputDiv">
                    <div class="inputBoxDiv">
                        <p>NAME</p>
                        <input type="text"/>
                    </div>
                    <div class="inputBoxDiv">
                        <p>E-MAIL</p>
                        <input type="text">
                            <button>인증</button>
                        </input>
                    </div>
                    <div class="inputBoxDiv">
                        <p>인증번호</p>
                        <input type="text"/>
                    </div>
                    <button>아이디 찾기</button>
                </div>
            );
        } else {
            <div id="findUserInputDiv">
                <div class="inputBoxDiv">
                    <p>ID</p>
                    <input type="text"/>
                </div>
                <div class="inputBoxDiv">
                    <p>NAME</p>
                    <input type="text"/>
                </div>
                <div class="inputBoxDiv">
                    <p>E-MAIL</p>
                    <input type="text">
                        <button>인증</button>
                    </input>
                </div>
                <div class="inputBoxDiv">
                    <p>인증번호</p>
                    <input type="text"/>
                </div>
                <button>비밀번호 찾기</button>
            </div>
        }
    }
    useEffect(()=> {
        console.log("selectedTab is : "+ selectedTab);
    },[selectedTab]);
    return (
        <div>
            <main>
                <div id="findUserContainer">
                    <div id="findUserTab">
                        <p id="findId" onClick={handleClickP}>아이디 찾기</p>
                        <p id="findPw" onClick={handleClickP}>비밀번호 찾기</p>
                    </div>
                    {()=> {renderFindUserInput();}}
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default FindUserInfo;