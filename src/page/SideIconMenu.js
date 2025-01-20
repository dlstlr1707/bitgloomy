import styled from 'styled-components';

const SideIconMenuDiv = styled.div `
    width: 100px;
    height: 220px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-direction: column;
    position: fixed;
    top: 720px;
    left: 1790px;

    >img{
    width: 48px;
    height: 48px;
    border: 1px solid #c2c2c2;
    border-radius: 8px;
    object-fit: cover;
    padding: 8px;
    box-sizing: border-box;
    }
    #channelTalkDiv{
    width: 100px;
    height: 100px;
    border: 1px solid #c2c2c2;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    }
    #channelTalkDiv >img{
        width: 90px;
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