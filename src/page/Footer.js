import styled from 'styled-components';

const StyledFooter = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    top: calc(100vh - 800px);
    border-top: 1px solid #c2c2c2;
    padding: 8px 0px;

    #policyInfo{
        display: flex;
        gap: 24px;
    }
    >p,#policyInfo >p{
    font-size: 12px;
    font-weight: 400;
    line-height: 30px;
    color: #6a6c77;
    }
    >img{
        width: 30px;
        height: 30px;
        position: absolute;
        left: 1865px;
        top: 10px;
    }
`

function Footer () {
    const handleClickIcon = () => {
        window.open("https://www.instagram.com/bitgloomyseoul/");
    }
    return(
        <StyledFooter>
            <img src="img/icon/instagram.png" alt="instagramIcon" onClick={handleClickIcon}/>
            <div id="policyInfo">
                <p>privacy</p>
                <p>terms</p>
                <p>service</p>
            </div>
            <br/>
            <p>빗 글루미</p>
            <p>경기도 양주시 옥정동로 7다길 74 부자로타워6층 6793호</p>
            <p>010-3006-4367 / bitgloomyseoul@gmail.com</p>
            <p>사업자등록번호 501-68-00634</p>
            <p>통신판매업신고 제2024-경기양주-2016호</p>
            <p>대표 윤준식</p>
        </StyledFooter>
    );
}

export default Footer;