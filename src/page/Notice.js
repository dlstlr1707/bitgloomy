import Footer from "./Footer";
import "../css/notice.css";
import { useEffect } from "react";
function Notice(){
    // 관리자 계정의 경우 등록 수정 삭제 관련사항이 있어야함
    useEffect(()=>{
        // axios로 서버에 공지사항 전체 조회 요청보냄
    },[]);
    return(
        <div>
            <main>
                <div id="noticeContainer">
                    <p>공지사항</p>
                    <div id="noticeTabMenu">
                        <ul>
                            <li class="selectedTab">공지사항</li>
                            <li class="unSelectedTab">이벤트</li>
                            <li class="unSelectedTab">문의사항</li>
                        </ul>
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
                                <tr>
                                    <td>1</td>
                                    <td>테스트 1</td>
                                    <td>2024-01-01</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>테스트 2</td>
                                    <td>2024-02-02</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>테스트 3</td>
                                    <td>2024-03-03</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>테스트 4</td>
                                    <td>2024-04-04</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>테스트 5</td>
                                    <td>2024-05-05</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>테스트 6</td>
                                    <td>2024-06-06</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>테스트 7</td>
                                    <td>2024-07-07</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>테스트 8</td>
                                    <td>2024-08-08</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>테스트 9</td>
                                    <td>2024-09-09</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>테스트 10</td>
                                    <td>2024-10-10</td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="pagingDiv">
                            <p>1</p>
                            <p>2</p>
                            <p>3</p>
                            <p>4</p>
                            <p>5</p>
                            <p>6</p>
                            <p>7</p>
                            <p>8</p>
                            <p>9</p>
                            <p>10</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Notice;