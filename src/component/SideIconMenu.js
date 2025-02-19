import { useEffect } from 'react';
import styled from 'styled-components';

const SideIconMenuDiv = styled.div `
    width: 56px;
    height: 156px;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-direction: column;
    position: fixed;
    top: 790px;
    left: 1830px;
    >img{
    width: 50px;
    height: 50px;
    border: 1px solid #c2c2c2;
    border-radius: 20px;
    object-fit: cover;
    padding: 4px;
    box-sizing: border-box;
    cursor: pointer;
    }
    #channelTalkDiv{
    width: 42px;
    height: 42px;
    border: 1px solid #c2c2c2;
    border-radius: 999px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    }
    #channelTalkDiv >img{
        width: 42px;
    }
`

function SideIconMenu(){
    const moveToTop = () =>{
        document.documentElement.scrollTop = 0;
    }
    return(
        <SideIconMenuDiv>
            <img src={require("../img/icon/Expand_top_stop.png")} alt="" onClick={moveToTop}/>
            {/*
            <div id="channelTalkDiv">
                <img src={require("../img/bitgloomy_channelTalk.png")} alt=""/>
            </div>
            */}
        </SideIconMenuDiv>
    );
}

export default SideIconMenu;