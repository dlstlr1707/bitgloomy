import Footer from "./Footer";
import "../css/join.css";

function Join() {
    return (
        <div>
            <main>
                <div id="joinContainer">
                    <p>CREATE ACCOUNT</p>
                    <form id="joinForm" action="">
                        <div id="idInput">
                            <p>ID</p>
                            <input type="text"/>
                        </div>
                        <div id="pwInput">
                            <p>PASSWORD</p>
                            <input type="password"/>
                        </div>
                        <div id="pwCheckInput">
                            <p>PASSWORD CHECK</p>
                            <input type="password"/>
                        </div>
                        <div id="nameInput">
                            <p>NAME</p>
                            <input type="text"/>
                        </div>
                        <div id="mobileInput">
                            <p>MOBLIE</p>
                            <div id="mobileInputDiv">
                                <p>010</p>
                                <p>-</p>
                                <input type="number"/>
                                <p>-</p>
                                <input type="number"/>
                            </div>
                            <div id="smsAggrementDiv">
                                <p>SMS 수신동의</p>
                                <input type="checkbox"/>
                                <p>동의함</p>
                            </div>
                        </div>
                        <div id="emailInput">
                            <p>E-MAIL</p>
                            <div id="emailInputDiv">
                                <input type="text"/>
                                <p>@</p>
                                <input type="text"/>
                                <input type="text"/>
                            </div>
                            <div id="emailAggrementDiv">
                                <p>이메일 수신동의</p>
                                <input type="checkbox"/>
                                <p>동의함</p>
                            </div>
                        </div>
                        <div id="aggrementInput">
                            <p>Aggrement</p>
                        </div>
                        <div id="privacyInput">
                            <p>Privacy Policy</p>
                        </div>
                    </form>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Join;