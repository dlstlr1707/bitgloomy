import "../css/info.css";
import { useState } from "react";

function Info() {
    const [toggleSwitch, setToggleSwitch] = useState(false);
    const [toggleRenderAbout, setToggleRenderAbout] = useState(false);
    const handleClickBtn = () => {
        const getDiv = document.querySelector("#opacityDiv");
        if (toggleSwitch === true) {
            getDiv.style.opacity = "70%";
            setToggleSwitch(false);
            setToggleRenderAbout(false);
        } else {
            getDiv.style.opacity = "0%";
            setToggleSwitch(true);
            setToggleRenderAbout(true);
        }
    }
    const renderAbout = () => {
        return (
            <div id="aboutDiv">
                {/*
          <div id="aboutImgDiv"></div>
          */
                }
                <p>BASED IN SEOUL</p>
                <p>캠핑을 통해 우울한 감정을 해소하는 캠퍼들을 위한 제품을 제작합니다.</p>
                <br/>
                <p>We make products</p>
                <p>for campers that relieve depressive emotions through camping</p>
                <br/>
                <p>brought to you by rough</p>
            </div>
        );
    }
    return (
            < main >
                <div id="InfoContainer">
                    <img src={require("../img/info.jpg")} alt=""/>
                    {renderAbout()}
                </div>
            </main>
    );
}

export default Info;