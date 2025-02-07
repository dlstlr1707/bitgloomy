import Footer from "./Footer";
import "../css/notice.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Notice(){
    // 관리자 계정의 경우 등록 수정 삭제 관련사항이 있어야함
    const noticeRef = useRef(null);
    const eventRef = useRef(null);
    const [currentTab,setCurrentTab] = useState("noticeTab");
    const [currentBtn,setCurrentBtn] = useState("");
    const [noticeInfoArr,setNoticeInfoArr] = useState([]);

    // 페이징 관련 변수들
    const displayPageAmount = 10;
    const displayBtnAmount = 5;
    const [totalNoticeNum,setTotalNoticeNum] = useState(0);
    const [currentPageNum,setCurrentPageNum] = useState(1);
    const [startPageBtnNum,setStartPageBtnNum] = useState(1);
    const [lastPageBtnNum,setLastPageBtnNum] = useState(displayBtnAmount);
    const [endPageBtnNum,setEndPageBtnNum] = useState(displayBtnAmount);
    const [pageNumArr,setPageNumArr] = useState([]);
    const [currentPageNumArr,setCurrentPageNumArr] = useState([]);

    const handleClickedTab = (e) => {
        //console.log(uploadRef.current.style.className);
        if(e.target.id === "noticeTab"){
            noticeRef.current.style.setProperty('background-color', '#000000');
            noticeRef.current.style.setProperty('border', 'none');
            noticeRef.current.style.setProperty('color', '#ffffff');
            eventRef.current.style.setProperty('background-color', 'inherit');
            eventRef.current.style.setProperty('border', '1px solid #c2c2c2');
            eventRef.current.style.setProperty('color', '#c2c2c2');
        }else if(e.target.id === "eventTab"){
            eventRef.current.style.setProperty('background-color', '#000000');
            eventRef.current.style.setProperty('border', 'none');
            eventRef.current.style.setProperty('color', '#ffffff');
            noticeRef.current.style.setProperty('background-color', 'inherit');
            noticeRef.current.style.setProperty('border', '1px solid #c2c2c2');
            noticeRef.current.style.setProperty('color', '#c2c2c2');
        }
        setCurrentTab(e.target.id);
    }
    const handleClickedBtn = (e) => {
        if(e.target.id === "uploadBtn"){
            
        }else if(e.target.id === "modifyBtn"){
            
        }else if(e.target.id === "deleteBtn"){
            
        }
        setCurrentBtn(e.target.id);
    }
    const requestNotice = async() => {
        const requestPageInfo = {
            page : currentPageNum,
            displayPageAmount : displayPageAmount,
            type : "notice"
        }
        await axios.post("http://localhost:8080/notice",requestPageInfo,{
            withCredentials: true  // 쿠키 자동 처리
        }).then((response) => {
            //정상 통신후 응답온 부분
                console.log("통신 성공");
                //console.log(response.data);
                for(var i=0;i<response.data["results"].length;i++){
                    response.data["results"][i].writeDate = response.data["results"][i].writeDate.slice(0,10);
                }
                setNoticeInfoArr(response.data["results"]);
                setTotalNoticeNum(response.data["total"]);
                //calculateBtnNum();
            }).catch((e) => {
                // 오류 발생시 처리부분
                alert("잘못된 아이디 비밀번호입니다. 아이디 비밀번호를 확인해주세요.");
            });
    }
    const requestEvent = async() => {
        const requestPageInfo = {
            page : currentPageNum,
            displayPageAmount : displayPageAmount,
            type : "event"
        }
        await axios.post("http://localhost:8080/event",requestPageInfo,{
            withCredentials: true  // 쿠키 자동 처리
        }).then((response) => {
            //정상 통신후 응답온 부분
                console.log("통신 성공");
            }).catch((e) => {
                // 오류 발생시 처리부분
                alert("잘못된 아이디 비밀번호입니다. 아이디 비밀번호를 확인해주세요.");
            });
    }
    const calculateBtnNum = () => {
        let tempEndPageNum = Math.ceil(totalNoticeNum/displayPageAmount);
        let tempLastBtnNum = Math.ceil(currentPageNum/displayBtnAmount)*displayBtnAmount;
        let tempStartBtnNum = tempLastBtnNum-displayBtnAmount+1;
        //console.log(tempEndPageNum);
        //console.log(tempStartBtnNum);
        //console.log(tempLastBtnNum);
        let tempNumArr = [];

        if(tempEndPageNum<=displayBtnAmount){
            setStartPageBtnNum(1);
            setEndPageBtnNum(tempEndPageNum);
            setLastPageBtnNum(tempEndPageNum);
            for(var i=0;i<tempEndPageNum;i++){
                tempNumArr.push(i+1);
            }
        }else{
            setEndPageBtnNum(tempEndPageNum);
            setStartPageBtnNum(tempStartBtnNum);
            setLastPageBtnNum(tempLastBtnNum);
            for(var i=tempStartBtnNum;i<=tempLastBtnNum;i++){
                tempNumArr.push(i);
            }
        }
        setPageNumArr(tempNumArr);
    }
    const onChageCurrentPageNum = (e) => {
        setCurrentPageNum(e.target.id);
    }
    const handleClickArrow = (e) => {
        if(e.target.id === "left"){
            if(startPageBtnNum === 1){
                alert("첫 페이지입니다.");
            }else{
                setStartPageBtnNum(startPageBtnNum-displayBtnAmount);
                setLastPageBtnNum(lastPageBtnNum-displayBtnAmount);
            }
        }else if(e.target.id === "right"){
            if(lastPageBtnNum+displayBtnAmount >= endPageBtnNum){
                alert("마지막 페이지입니다.");
            }else{
                setStartPageBtnNum(startPageBtnNum+displayBtnAmount);
                setLastPageBtnNum(lastPageBtnNum+displayBtnAmount);
            }
        }
    }
    const renderPageBtn = () => {
        return(
            <>
                {Array.isArray(pageNumArr) && pageNumArr.map((item,idx)=>{
                    return <p key={idx} onClick={onChageCurrentPageNum} id={item}>{item}</p>
                })}
            </>
        );
    }
    const renderNoticeInfo = () => {
        return(
            <>
                {Array.isArray(noticeInfoArr) && noticeInfoArr.map((item,idx)=>{
                    return(<tr key={idx}>
                        <td>{item.uid}</td>
                        <td>{item.title}</td>
                        <td>{item.writeDate}</td>
                    </tr>);
                })}
            </>
        );
    }
    useEffect(()=>{
        // axios로 서버에 공지사항 전체 조회 요청보냄
        requestNotice();
    },[]);
    useEffect(()=>{
        //console.log(currentTab);
        if(currentTab === "noticeTab"){
            //requestNotice();
        }else if(currentTab === "eventTab"){
            //requestEvent();
        }
    },[currentTab]);
    useEffect(()=>{
        //console.log(noticeInfoArr[0]);
        //console.log(totalNoticeNum);
        //console.log(currentPageNum);
        calculateBtnNum();
    },[totalNoticeNum]);
    useEffect(()=>{
        //console.log(noticeInfoArr);
        //console.log(totalNoticeNum);
        console.log(pageNumArr);
        renderPageBtn();
    },[currentBtn,noticeInfoArr,pageNumArr,currentPageNum]);
    return(
        <div>
            <main>
                <div id="noticeContainer">
                    <div id="noticeTabMenu">
                        <ul>
                            <li ref={noticeRef} className="selectedTab" id="noticeTab" onClick={handleClickedTab}>공지사항</li>
                            <li ref={eventRef} className="unSelectedTab" id="eventTab" onClick={handleClickedTab}>이벤트</li>
                        </ul>
                        {
                            sessionStorage.getItem("auth")==="role_admin" &&
                            <div id="managementBtnDiv">
                                <button id="uploadBtn" onClick={handleClickedBtn}>등록</button>
                                <button id="modityBtn" onClick={handleClickedBtn}>수정</button>
                                <button id="deleteBtn" onClick={handleClickedBtn}>삭제</button>
                            </div>
                        }
                    </div>
                    <div id="noticeContentDiv">
                        <table>
                            <thead>
                                <tr>
                                    <td>번호</td>
                                    <td>제목</td>
                                    <td>등록일</td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderNoticeInfo()}
                            </tbody>
                        </table>
                        <div id="pagingDiv">
                            <button onClick={handleClickArrow} id="left">{'<'}</button>
                            {renderPageBtn()}
                            <button onClick={handleClickArrow} id="right">{'>'}</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Notice;