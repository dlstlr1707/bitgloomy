import {useEffect, useState} from "react";
import "../css/findUserInfo.css";
import Footer from "./Footer";
function FindUserInfo() {
    const [selectedTab, setSelectedTab] = useState("findId");
    const handleClickP = (e) => {
        setSelectedTab(e.target.id);
    }
    useEffect(() => {
        console.log("selectedTab is : " + selectedTab);
    }, [selectedTab]);
    return (
        <div>
            <main>
                <div id="findUserContainer">
                    <div id="findUserTab">
                        <p id="findId" onClick={handleClickP}>아이디 찾기</p>
                        <p id="findPw" onClick={handleClickP}>비밀번호 찾기</p>
                    </div>
                    {
                        selectedTab === "findId" &&< div id = "findUserInputDiv" > <div class="inputBoxDiv">
                                <p>NAME</p>
                                <input type="text"/>
                            </div>
                            <div class="inputBoxDiv">
                                <p>E-MAIL</p>
                                <div id="emailInputBoxDiv">
                                    <input type="text"/>
                                    <button>인증</button>
                                </div>
                            </div>
                            <div class="inputBoxDiv">
                                <p>인증번호</p>
                                <input type="text"/>
                            </div>
                            <button>아이디 찾기</button>
                        </div>
                    }
                    {
                        selectedTab === "findPw" &&< div id = "findUserInputDiv" > <div class="inputBoxDiv">
                                <p>ID</p>
                                <input type="text"/>
                            </div>
                            <div class="inputBoxDiv">
                                <p>NAME</p>
                                <input type="text"/>
                            </div>
                            <div class="inputBoxDiv">
                                <p>E-MAIL</p>
                                <div id="emailInputBoxDiv">
                                    <input type="text"/>
                                    <button>인증</button>
                                </div>
                            </div>
                            <div class="inputBoxDiv">
                                <p>인증번호</p>
                                <input type="text"/>
                            </div>
                            <button>비밀번호 찾기</button>
                        </div>
                    }
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default FindUserInfo;