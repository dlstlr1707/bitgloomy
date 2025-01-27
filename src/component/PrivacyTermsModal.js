import {useEffect, useState} from 'react';
import Modal from 'react-modal';
import "../css/modal.css";

Modal.setAppElement('#root');

function PrivacyTermsModal({isModalOpen,changeIsModalOpen}) {
    useEffect(()=>{
    },[isModalOpen]);
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => changeIsModalOpen(false)}
            className="modal-content" // 모달 내용에 적용할 클래스명
            overlayClassName="modal-overlay" // 모달 외부에 적용할 클래스명
            contentLabel="Example Modal">
            <p>개인 정보 처리 방침</p>
            <div id="TermsContent">
                <p>
                    빗 글루미 개인정보처리방침
                    <br/>
                    빗 글루미는 (이하 "회사"는) 「개인정보 보호법」 제30조에 따라 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침을 수립·공개합니다.
                    <br/>
                    개인정보처리방침은 다음과 같은 내용을 담고 있습니다.
                    <br/>
                    1. 개인정보의 처리 목적
                    <br/>
                    2. 개인정보의 처리 및 보유 기간
                    <br/>
                    3. 처리하는 개인정보의 항목 및 수집 방법
                    <br/>
                    4. 만 14세 미만 아동의 개인정보 처리에 관한 사항
                    <br/>
                    5. 개인정보의 제3자 제공에 관한 사항
                    <br/>
                    6. 개인정보처리의 위탁에 관한 사항
                    <br/>
                    7. 개인정보의 파기절차 및 파기방법
                    <br/>
                    8. 정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항
                    <br/>
                    9. 개인정보의 안전성 확보조치에 관한 사항
                    <br/>
                    10. 개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항
                    <br/>
                    11. 개인정보 보호책임자에 관한 사항
                    <br/>
                    12. 정보주체의 권익침해에 대한 구제방법
                    <br/>
                    13. 개인정보처리방침 변경
                    <br/>
                    <br/>
                    1. 개인정보의 처리 목적
                    <br/>
                    회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    <br/>
                    (1) 홈페이지 회원가입 및 관리
                    <br/>
                    회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 만14세 미만 아동의 개인정보 처리 시 법정대리인의 동의여부 확인, 각종 고지·통지, 고충처리 목적으로 개인정보를 처리합니다.
                    <br/>
                    (2) 재화 또는 서비스 제공
                    <br/>
                    콘텐츠 제공, 구매 및 요금 결제, 물품배송 또는 청구서 등 발송, 서비스 제공, 맞춤서비스 제공을 목적으로 개인정보를 처리합니다.
                    <br/>
                    (3) 마케팅 및 광고에의 활용
                    <br/>
                    이벤트 및 광고성 정보 제공 및 참여기회 제공 , 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.
                    <br/>
                    <br/>
                    2. 개인정보의 처리 및 보유 기간
                    <br/>
                    (1) 회사는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다. 개인정보 처리목적 달성, 정보주체의 서비스 해지 요청이 있을 경우 지체없이 해당 개인정보를 파기합니다. 각각의 개인정보 처리 및 보유기간은 다음과 같습니다.
                    <br/>
                    ① 홈페이지 회원가입 및 관리 : 회원탈퇴 시까지
                    <br/>
                    ② 재화 또는 서비스 제공 : 재화·서비스 공급완료 및 요금결제·정산 시까지
                    <br/>
                    (2) 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
                    <br/>
                    ① 계약 또는 청약철회 등에 관한 기록
                    <br/>
                    -보존이유 : 전자상거래 등에서의 소비자보호에 관한 법률
                    <br/>
                    -보존기간 : 5년
                    <br/>
                    ② 대금 결제 및 재화 등의 공급에 관한 기록
                    <br/>
                    -보존이유: 전자상거래 등에서의 소비자보호에 관한 법률
                    <br/>
                    -보존기간 : 5년
                    <br/>
                    ③ 소비자 불만 또는 분쟁처리에 관한 기록
                    <br/>
                    -보존이유 : 전자상거래 등에서의 소비자보호에 관한 법률
                    <br/>
                    -보존기간 : 3년
                    <br/>
                    ④ 표시·광고에 관한 기록
                    <br/>
                    -보존이유: 전자상거래 등에서의 소비자보호에 관한 법률
                    <br/>
                    -보존기간 : 6개월
                    <br/>
                    ⑤ 서비스 방문 기록
                    <br/>
                    -보존이유: 통신비밀보호법
                    <br/>
                    -보존기간 : 3개월
                    <br/>
                    <br/>
                    3. 처리하는 개인정보의 항목 및 수집 방법
                    <br/>
                    (1) 처리하는 개인정보 항목
                    <br/>
                    ① 회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                    <br/>
                    - 일반 회원가입 시
                    <br/>
                    필수항목 : 아이디, 비밀번호, 이름 , 이메일, 휴대전화, 생년월일, (만 14세 미만 가입자인 경우) 법정대리인 정보
                    <br/>
                    선택항목 : 성별
                    <br/>
                    - 상품 주문 시
                    <br/>
                    필수항목 : 주문 정보(이름, 이메일, 휴대전화), 배송 정보(이름, 주소, 휴대전화), (비회원 주문인 경우) 주문 조회 비밀번호
                    <br/>
                    선택항목 : 일반전화
                    <br/>
                    - 카카오 간편 로그인 시
                    <br/>
                    필수항목 : 이름
                    <br/>
                    - 네이버 간편 로그인 시
                    <br/>
                    필수항목 : 아이디, 이름, 이메일
                    <br/>
                    선택항목 : 별명, 생일
                    <br/>
                    ② 서비스 이용과정이나 사업 처리과정에서 아래와 같은 정보들이 생성되어 수집될 수 있습니다.
                    <br/>
                    - 서비스 이용기록, 접속로그, 쿠키, 접속IP 정보, 결제기록, 이용정지기록, 불량이용기록
                    <br/>
                    (2) 수집 방법
                    <br/>
                    - 홈페이지, 서면양식, 게시판, 이메일, 이벤트 응모, 배송요청, 전화, 팩스, 제휴사로부터의 제공, 생성정보 수집 툴을 통한 수집
                    <br/>
                    <br/>
                    4. 만 14세 미만 아동의 개인정보 처리에 관한 사항
                    <br/>
                    (1) 회사는 만 14세 미만 아동에 대해 개인정보를 수집할 때 법정대리인의 동의를 얻어 해당 서비스 수행에 필요한 최소한의 개인정보를 수집합니다.
                    <br/>
                    - 필수항목 : [법정대리인 동의 양식을 통해 수집하는 개인정보 기재]
                    <br/>
                    (2) 회사는 만 14세 미만 아동의 개인정보를 수집할 때에는 아동에게 법정대리인의 성명, 연락처와 같이 최소한의 정보를 요구할 수 있으며, 다음 중 하나의 방법으로 적법한 법정대리인이 동의하였는지를 확인합니다.
                    <br/>
                    - 동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 개인정보처리자가 그 동의 표시를 확인했음을 법정대리인의 휴대전화 문자 메시지로 알리는 방법
                    <br/>
                    - 동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 법정대리인의 신용카드·직불카드 등의 카드정보를 제공받는 방법
                    <br/>
                    - 동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 법정대리인의 휴대전화 본인인증 등을 통해 본인 여부를 확인하는 방법
                    <br/>
                    - 동의 내용이 적힌 서면을 법정대리인에게 직접 발급하거나, 우편 또는 팩스를 통하여 전달하고 법정대리인이 동의 내용에 대하여 서명날인 후 제출하도록 하는 방법
                    <br/>
                    - 동의 내용이 적힌 전자우편을 발송하여 법정대리인으로부터 동의의 의사표시가 적힌 전자우편을 전송받는 방법
                    <br/>
                    - 전화를 통하여 동의 내용을 법정대리인에게 알리고 동의를 얻거나 인터넷주소 등 동의 내용을 확인할 수 있는 방법을 안내하고 재차 전화 통화를 통하여 동의를 얻는 방법
                    <br/>
                    - 그 밖에 위와 준하는 방법으로 법정대리인에게 동의 내용을 알리고 동의의 의사표시를 확인하는 방법
                    <br/>
                    <br/>
                    5. 개인정보의 제3자 제공에 관한 사항
                    <br/>
                    (1) 회사는 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
                    <br/>
                    (2) 회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.
                    <table id="table1">
                        <thead>
                            <tr>
                                <td>제공받는 제3자명</td>
                                <td>제공 목적</td>
                                <td>제공하는 개인정보 항목</td>
                                <td>제공받는 자의 보유 및 이용 기간</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>[제공받는 제3자명]</td>
                                <td>[제공 목적]</td>
                                <td>[제공하는 개인정보 항목]</td>
                                <td>[제공받는 자의 보유 및 이용 기간]</td>
                            </tr>
                        </tbody>
                    </table>
                    (3) 회사는 정부 관계부처가 합동으로 발표한 「긴급상황 시 개인정보 처리 및 보호수칙」에 따라 재난, 감염병, 급박한 생명·신체 위험을 초래하는 사건·사고, 급박한 재산 손실 등의 긴급상황이 발생하는 경우 정보주체의 동의 없이 관계기관에 개인정보를 제공할 수 있습니다.
                    <br/>
                    자세한 사항은 여기*를 눌러 확인하시기 바랍니다.
                    <br/>
                    <br/>
                    6. 개인정보처리의 위탁에 관한 사항
                    <br/>
                    (1) 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
                    <table id="table2">
                        <thead>
                            <tr>
                                <td>수탁업체</td>
                                <td>위탁업무</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>카페24(주)</td>
                                <td>쇼핑몰 호스팅 서비스의 시스템 제공 및 유지보수</td>
                            </tr>
                            <tr>
                                <td>[택배사 이름]</td>
                                <td>[택배사 위탁 내용]</td>
                            </tr>
                            <tr>
                                <td>[PG사 이름]</td>
                                <td>[PG사 위탁 내용]</td>
                            </tr>
                            <tr>
                                <td>공급업체 목록보기</td>
                                <td>[위탁업무 내용]</td>
                            </tr>
                        </tbody>
                    </table>
                    (2) 회사는 위탁계약 체결시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
                    <br/>
                    (3) 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.
                    <br/>
                    <br/>
                    7. 개인정보의 파기절차 및 파기방법
                    <br/>
                    회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
                    <br/>
                    (1) 파기 절차
                    <br/>
                    ① 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
                    <br/>
                    ② 별도 DB로 옮겨진 개인정보는 법률에 의한 경우를 제외하고 다른 목적으로 이용되지 않습니다.
                    <br/>
                    (2) 파기방법
                    <br/>
                    ① 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.
                    <br/>
                    ② 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
                    <br/>
                    <br/>
                    8. 정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항
                    <br/>
                    (1) 정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
                    <br/>
                    (2) 정보주체의 개인정보 조회,수정을 위해서는 "개인정보변경"(또는 "회원정보수정" 등)을 가입해지(동의철회)를 위해서는 "회원탈퇴"를 클릭하여 본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.
                    <br/>
                    (3) 혹은 개인정보보호책임자에게 서면, 전화 또는 이메일로 연락하시면 지체없이 조치하겠습니다.
                    <br/>
                    (4) 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있으며, 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
                    <br/>
                    (5) 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있으며, 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
                    <br/>
                    (6) 회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.
                    <br/>
                    <br/>
                    9. 개인정보의 안전성 확보조치에 관한 사항
                    <br/>
                    회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
                    <br/>
                    (1) 관리적 조치 : 내부관리계획 수립·시행, 전담조직 운영, 정기적 직원 교육
                    <br/>
                    (2) 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 개인정보의 암호화, 보안프로그램 설치 및 갱신
                    <br/>
                    (3) 물리적 조치 : 전산실, 자료보관실 등의 접근통제
                    <br/>
                    <br/>
                    10. 개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항
                    <br/>
                    회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용 정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.
                    <br/>
                    (1) 쿠키 사용 목적
                    <br/>
                    이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.
                    <br/>
                    (2) 쿠키의 설치•운영 및 거부
                    <br/>
                    웹브라우저 상단의 도구-인터넷 옵션-개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.
                    <br/>
                    단, 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
                    <br/>
                    <br/>
                    11. 개인정보 보호책임자에 관한 사항
                    <br/>
                    (1) 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                    <br/>
                    o 개인정보 보호책임자
                    <br/>
                    성명 : 윤준식
                    <br/>
                    소속 : 빗 글루미
                    <br/>
                    전화번호 : 010-3006-4367
                    <br/>
                    이메일 : bitgloomyseoul@gmail.com
                    <br/>
                    o 개인정보 보호담당자
                    <br/>
                    성명 : 윤준식
                    <br/>
                    소속 : 빗 글루미
                    <br/>
                    전화번호 : 010-3006-4367
                    <br/>
                    이메일 : bitgloomyseoul@gmail.com
                    <br/>
                    (2) 정보주체는 회사의 서비스를 이용하시면서 발생한 모든 개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당자에게 문의할 수 있습니다. 회사는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.
                    <br/>
                    <br/>
                    12. 정보주체의 권익침해에 대한 구제방법
                    <br/>
                    (1) 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
                    <br/>
                    개인정보분쟁조정위원회 : (국번없이) 1833-6972 (privacy.go.kr)
                    <br/>
                    개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
                    <br/>
                    대검찰청 : (국번없이) 1301 (www.spo.go.kr)
                    <br/>
                    경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)
                    <br/>
                    (2) 개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.
                    <br/>
                    ※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.
                    <br/>
                    <br/>
                    13. 개인정보처리방침 변경
                    <br/>
                    이 개인정보처리방침은 2024년 O8월 14일부터 적용됩니다.
                </p>
            </div>
            <button onClick={() => changeIsModalOpen(false)}>close</button>
        </Modal>
    );
}

export default PrivacyTermsModal;