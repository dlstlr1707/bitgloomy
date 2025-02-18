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
    const [noticeInfo,setNoticeInfo] = useState([]);
    const [isDetail,setIsDetail] = useState(false);
    const [isManagement,setIsManagement] = useState(false);
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [noticeNumber,setNoticeNumber] = useState(0);
    const [type,setType] = useState("");
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
        setIsManagement(false);
        setIsDetail(false);
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
        setIsManagement(true);
        setCurrentBtn(e.target.id);
        setIsDetail(false);
    }
    const requestNotice = async() => {
        const requestPageInfo = {
            page : currentPageNum,
            displayPageAmount : displayPageAmount,
            type : "notice"
        }
        await axios.post("http://localhost:8080/notices",requestPageInfo,{
            withCredentials: true  // 쿠키 자동 처리
        }).then((response) => {
            //정상 통신후 응답온 부분
                //console.log("통신 성공");
                //console.log(response.data);
                for(var i=0;i<response.data["results"].length;i++){
                    response.data["results"][i].writeDate = response.data["results"][i].writeDate.slice(0,10);
                }
                setNoticeInfoArr(response.data["results"]);
                setTotalNoticeNum(response.data["total"]);
                //calculateBtnNum();
            }).catch((e) => {
                // 오류 발생시 처리부분
                console.error(e);
                alert("공지를 가져오지 못했습니다.");
            });
    }
    const requestEvent = async() => {
        const requestPageInfo = {
            page : currentPageNum,
            displayPageAmount : displayPageAmount,
            type : "event"
        }
        await axios.post("http://localhost:8080/notices",requestPageInfo,{
            withCredentials: true  // 쿠키 자동 처리
        }).then((response) => {
            //정상 통신후 응답온 부분
                //console.log("통신 성공");
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
        }else{
            setEndPageBtnNum(tempEndPageNum);
            setStartPageBtnNum(tempStartBtnNum);
            setLastPageBtnNum(tempLastBtnNum);
        }
        for(var i=0;i<tempEndPageNum;i++){
            tempNumArr.push(i+1);
        }
        setPageNumArr(tempNumArr);
        let tempNumArr2 = [];
        for(var j=0;j<displayBtnAmount;j++){
            tempNumArr2.push(j+1);
        }
        setCurrentPageNumArr(tempNumArr2);
    }
    const onChageCurrentPageNum = (e) => {
        setCurrentPageNum(Number(e.target.id));
        //console.log(e.target);
    }
    const handleOnChange = (e) =>{
        if(e.target.id === "title"){
            setTitle(e.target.value);
        }else if(e.target.id === "noticeNumber"){
            setNoticeNumber(e.target.value);
        }else if(e.target.id === "noticeContent"){
            console.log(e.target.value);
            setContent(e.target.value);
        }else if(e.target.id === "type"){
            setType(e.target.value);
        }
    }
    const requestNoticeDetail = async(e) => {
        console.log(e.target.id);
        if(currentTab === "noticeTab"){
            await axios.get("http://localhost:8080/notice/notice/"+e.target.id)
            .then((response) => {
            //정상 통신후 응답온 부분
                console.log("공지 조회 성공");
                console.log(response.data);
                setNoticeInfo(response.data);
                setIsDetail(true);
            }).catch((e) => {
                // 오류 발생시 처리부분
                console.error(e);
                setIsDetail(false);
            });
        }else if(currentTab === "eventTab"){
            await axios.get("http://localhost:8080/notice/event/"+e.target.id)
            .then((response) => {
            //정상 통신후 응답온 부분
                console.log("이벤트 조회 성공");
                console.log(response.data);
                setNoticeInfo(response.data);
                setIsDetail(true);
            }).catch((e) => {
                // 오류 발생시 처리부분
                console.error(e);
                setIsDetail(false);
            });
        }
        
    }
    const requestNoticeManagement = async(e) => {
        e.preventDefault();
        console.log("요청함수 실행");
        if(sessionStorage.getItem("auth") === "role_admin"){
            if(e.target.id === "uploadNotice"){
                const requestNoticeInfo = {
                    type : type,
                    title : title,
                    content : content
                }
                console.log(content);
                await axios.post("http://localhost:8080/notice",requestNoticeInfo,{
                    withCredentials: true  // 쿠키 자동 처리
                }).then((response) => {
                    //정상 통신후 응답온 부분
                        console.log("공지 등록 성공");
                    }).catch((e) => {
                        // 오류 발생시 처리부분
                        console.error(e);
                    });
            }else if(e.target.id === "modifyNotice"){
                const requestNoticeInfo = {
                    type : type,
                    uid : noticeNumber,
                    title : title,
                    content : content
                }
                await axios.patch("http://localhost:8080/notice",requestNoticeInfo,{
                    withCredentials: true  // 쿠키 자동 처리
                }).then((response) => {
                    //정상 통신후 응답온 부분
                        console.log("공지 수정 성공");
                    }).catch((e) => {
                        // 오류 발생시 처리부분
                        console.error(e);
                    });
            }else if(e.target.id === "deleteNotice"){
                await axios.delete("http://localhost:8080/notice/"+type+"/"+noticeNumber,{
                    withCredentials: true  // 쿠키 자동 처리
                }).then((response) => {
                    //정상 통신후 응답온 부분
                        console.log("공지 삭제 성공");
                    }).catch((e) => {
                        // 오류 발생시 처리부분
                        console.error(e);
                    });
            }
        }else{
            alert("관리자만 사용 할 수 있는 기능입니다.");
        }
    }
    const handleClickArrow = (e) => {
        if(e.target.id === "left"){
            if(startPageBtnNum === 1){
                alert("첫 페이지입니다.");
            }else{
                let tempStartNum = startPageBtnNum-displayBtnAmount;
                let tempLastNum = lastPageBtnNum-displayBtnAmount;
                setStartPageBtnNum(tempStartNum);
                setLastPageBtnNum(tempLastNum);
                let tempNumArr=[];
                for(var i=tempStartNum;i<=tempLastNum;i++){
                    tempNumArr.push(i);
                }
                setCurrentPageNumArr(tempNumArr);
            }
        }else if(e.target.id === "right"){
            if(((startPageBtnNum+displayBtnAmount)<=endPageBtnNum)&&(endPageBtnNum <=(lastPageBtnNum+displayBtnAmount))){
                console.log("if 진입");
                let tempStartNum = startPageBtnNum+displayBtnAmount;
                let tempLastNum = lastPageBtnNum+displayBtnAmount;
                setStartPageBtnNum(tempStartNum);
                setLastPageBtnNum(tempLastNum);
                let tempNumArr=[];
                for(var i=tempStartNum;i<=tempLastNum;i++){
                    if(i>endPageBtnNum){
                        tempNumArr.push(null);
                    }else{
                        tempNumArr.push(i);
                    }
                }
                setCurrentPageNumArr(tempNumArr);
            }else if((startPageBtnNum+displayBtnAmount)>=endPageBtnNum){
                alert("마지막 페이지입니다.");
            }else{
                let tempStartNum = startPageBtnNum+displayBtnAmount;
                let tempLastNum = lastPageBtnNum+displayBtnAmount;
                setStartPageBtnNum(tempStartNum);
                setLastPageBtnNum(tempLastNum);
                let tempNumArr=[];
                for(var i=tempStartNum;i<=tempLastNum;i++){
                    tempNumArr.push(i);
                }
                setCurrentPageNumArr(tempNumArr);
            }
        }
    }
    const renderPageBtn = () => {
        return(
            <>
                {Array.isArray(currentPageNumArr) && currentPageNumArr.map((item,idx)=>{
                    return <p key={idx} onClick={onChageCurrentPageNum} id={item} style={{
                        fontWeight: item === currentPageNum ? 'bold' : 'normal',
                      }}>{item}</p>
                })}
            </>
        );
    }
    const renderNoticeInfo = () => {
        return(
            <>
                {Array.isArray(noticeInfoArr) && noticeInfoArr.map((item,idx)=>{
                    return(<tr key={idx} style={{ height : "50px"}} id={item.uid} onClick={requestNoticeDetail}>
                        <td id={item.uid}>{item.uid}</td>
                        <td id={item.uid}>{item.title}</td>
                        <td id={item.uid}>{item.writeDate}</td>
                    </tr>);
                })}
            </>
        );
    }
    const renderNoticeContents = () =>{
        if(isManagement === true){
            if(currentBtn === "uploadBtn"){
                return(
                    <div className="noticeContentDiv">
                        <form>
                            <div className="typeInputDiv">
                                <p>type</p>
                                <input type="text" id="type" onChange={handleOnChange}/>
                            </div>
                            <div className="titleInputDiv">
                                <p>TITLE</p>
                                <input type="text" id="title" onChange={handleOnChange}/>
                            </div>
                            <div className="contentInputDiv">
                                <p>CONTENT</p>
                                <textarea id="noticeContent" onChange={handleOnChange}></textarea>
                            </div>
                            <button id="uploadNotice" onClick={requestNoticeManagement}>등록</button>
                        </form>
                    </div>
                );
            }else if(currentBtn === "modifyBtn"){
                return(
                    <div className="noticeContentDiv">
                        <form>
                            <div className="typeInputDiv">
                                <p>type</p>
                                <input type="text" id="type" onChange={handleOnChange}/>
                            </div>
                            <div className="titleInputDiv">
                                <p>NOTICE NUMBER</p>
                                <input type="number" id="noticeNumber" onChange={handleOnChange}/>
                            </div>
                            <div className="titleInputDiv">
                                <p>TITLE</p>
                                <input type="text" id="title" onChange={handleOnChange}/>
                            </div>
                            <div className="contentInputDiv">
                                <p>CONTENT</p>
                                <textarea id="noticeContent" onChange={handleOnChange}></textarea>
                            </div>
                            <button id="modifyNotice" onClick={requestNoticeManagement}>수정</button>
                        </form>
                    </div>
                );
            }else if(currentBtn === "deleteBtn"){
                return(
                    <div className="noticeContentDiv">
                        <form>
                            <div className="typeInputDiv">
                                <p>type</p>
                                <input type="text" id="type" onChange={handleOnChange}/>
                            </div>
                            <div className="titleInputDiv">
                                <p>NOTICE NUMBER</p>
                                <input type="number" id="noticeNumber" onChange={handleOnChange}/>
                            </div>
                            <button id="deleteNotice" onClick={requestNoticeManagement}>삭제</button>
                        </form>
                    </div>
                );
            }
        }else{
            if(isDetail === true){
                return(
                    <div id="noticeDetailDiv">
                           <div id="titleDiv">
                                <p>{noticeInfo.title}</p>
                                <div id="subInfoDiv">
                                    <div id="subInfoDivP">
                                        <p>공지 번호 : {noticeInfo.uid}</p>
                                        <p>작성일 : {noticeInfo.writeDate}</p>
                                    </div>
                                    <div id="subInfoDivBtn">
                                        <button onClick={()=>setIsDetail(false)}>목록</button>
                                    </div>
                                </div>
                           </div>
                           <div id="contentDiv">
                                <p>{noticeInfo.content}</p>
                           </div>
                    </div>
                );
            }else{
                return(
                    <div className="noticeContentDiv">
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
                );
            }
        }
    }
    useEffect(()=>{
        // axios로 서버에 공지사항 전체 조회 요청보냄
        requestNotice();
    },[]);
    useEffect(()=>{
        //console.log(currentTab);
        if(currentTab === "noticeTab"){
            setCurrentPageNum(1);
            requestNotice();
        }else if(currentTab === "eventTab"){
            setCurrentPageNum(1);
            requestEvent();
        }
    },[currentTab]);
    useEffect(()=>{
        // 해당페이지 axios로 요청함
        requestNotice();
    },[currentPageNum]);
    useEffect(()=>{
        //console.log(noticeInfoArr[0]);
        calculateBtnNum();
    },[totalNoticeNum]);
    useEffect(()=>{
        //console.log(noticeInfoArr);
        renderPageBtn();
    },[currentBtn,noticeInfoArr,pageNumArr,currentPageNum,currentPageNumArr]);
    useEffect(()=>{
        renderNoticeContents();
    },[isManagement]);
    useEffect(()=>{
    },[title,type,content,noticeNumber]);
    return(
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
                                <button id="modifyBtn" onClick={handleClickedBtn}>수정</button>
                                <button id="deleteBtn" onClick={handleClickedBtn}>삭제</button>
                            </div>
                        }
                    </div>
                    {renderNoticeContents()}
                </div>
            </main>
    );
}

export default Notice;