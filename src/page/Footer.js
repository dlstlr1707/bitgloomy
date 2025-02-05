import styled from 'styled-components';
import TermsModal from "../component/TermsModal";
import PrivacyTermsModal from "../component/PrivacyTermsModal";
import {useState} from "react";

const StyledFooter = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    top: calc(100vh - 600px);
    padding: 8px 0px;

    #policyInfo{
        display: flex;
        gap: 24px;
    }
    >p,#policyInfo >p{
    font-size: 10px;
    line-height: 13.62px;
    letter-spacing: 1px;
    color: #313637;
    }
    #policyInfo >p{
        cursor: pointer;
    }
    #footerIcons{
        padding: 4px;
        display: flex;
        gap: 8px;
    }
    #footerIcons >img{
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
`

function Footer() {
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const handleClickOpenModal = (e) => {
        if (e.target.id === "policyAggrementModal") {
            setIsTermsModalOpen(!isTermsModalOpen);
        } else if (e.target.id === "privacyAggrementModal") {
            setIsPrivacyModalOpen(!isPrivacyModalOpen);
        } else {
            console.log("잘못된 요청입니다.");
        }
    }
    const handleClickIcon = () => {
        window.open("https://www.instagram.com/bitgloomyseoul/");
    }
    return (
        <StyledFooter>
            <div id="policyInfo">
                <p id="privacyAggrementModal" onClick={handleClickOpenModal}>privacy</p>
                <PrivacyTermsModal
                    isModalOpen={isPrivacyModalOpen}
                    changeIsModalOpen={setIsPrivacyModalOpen}/>
                <p id="policyAggrementModal" onClick={handleClickOpenModal}>terms</p>
                <TermsModal
                    isModalOpen={isTermsModalOpen}
                    changeIsModalOpen={setIsTermsModalOpen}/>
                <p>service</p>
            </div>
            <div id="footerIcons">
                <img
                    src={require("../img/icon/instagram.png")}
                    alt="instagramIcon"
                    onClick={handleClickIcon}/>
            </div>
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