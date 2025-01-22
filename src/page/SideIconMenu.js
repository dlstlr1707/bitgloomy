import styled from 'styled-components';

const SideIconMenuDiv = styled.div `
    width: 56px;
    height: 156px;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-direction: column;
    position: fixed;
    top: 782px;
    left: 1832px;
    >img{
    width: 42px;
    height: 42px;
    border: 1px solid #c2c2c2;
    border-radius: 999px;
    object-fit: cover;
    padding: 4px;
    box-sizing: border-box;
    }
    #channelTalkDiv{
    width: 56px;
    height: 56px;
    border: 1px solid #c2c2c2;
    border-radius: 999px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    }
    #channelTalkDiv >img{
        width: 48px;
    }
`

function SideIconMenu(){
    const moveToTop = () =>{
        document.documentElement.scrollTop = 0;
    }
    const moveToBottom = () =>{
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
    }
    return(
        <SideIconMenuDiv>
            <img src="img/icon/Expand_top_stop.png" alt="" onClick={moveToTop}/>
            <img src="img/icon/Expand_down_stop.png" alt="" onClick={moveToBottom}/>
            <div id="channelTalkDiv">
                <img src="img/logo.png" alt=""/>
            </div>
        </SideIconMenuDiv>
    );
}

export default SideIconMenu;