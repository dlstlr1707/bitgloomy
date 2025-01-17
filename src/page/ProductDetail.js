import Footer from "./Footer";
import "../css/productDetail.css";

function ProductDetail(){
    return(
        <div>
            <main>
                <div id="detailContainer">
                    <div id="detailImgDiv">

                    </div>
                    <div id="detailContentDiv">
                        <p id="pName">NOMAD CARGO PANTS WOODLAND</p>
                        <p>269,000 KRW</p>
                        <p>노마드 카고 팬츠는 전투복에서 영감받아 실용성과 편안함을 고려해 이동이 자유로운 오토 캠퍼를 위한 유니폼으로 제작되었습니다. 겉감으로 사용된 립스탑 코튼 원단은 바이오 워싱 처리되어         부드러운 텍스쳐와 립스탑 원단 특성상 찢어짐에 강한 내구성이 특징이며 우드랜드 카모플라주     패턴의 빈티지한 색감이 매력적인 원단입니다. 주머니 안감의 경우 사용감을 고려해 피치 워싱이    적용된 코튼 원단을 사용했으며 후면 플립 포켓과 사이드의 카고 포켓은 벨크로를 사용해 쉽게       고정이 가능합니다. 허리와 밑단에는 하이엔드 텐트의 가이라인으로 사용되는 다이니마 스트링을  사용해 실생활에서는 끈이 끊어질 걱정없이 사용 가능하며 리플렉티브 기능이 있어 빛이 부족한    환경에서도 쉽게 착용이 가능하게끔 도와줍니다. 내구성 및 사용성이 좋은 YKK 지퍼 및 우진          플라스틱 스토퍼를 부자재로 사용했습니다.</p>
                        <div id="meterialInfoDiv">
                            <p>PRODUCT</p>
                            <p>- 겉감 립스탑 코튼 바이오 워싱</p>
                            <p>- 주머니 안감 코튼 피치 워싱</p>
                            <p>- 플라스틱 버튼</p>
                            <p>- 허리, 밑단 다이니마 스트링</p>
                            <p>- YKK 지퍼</p>
                            <p>- 우진 플라스틱 스토퍼</p>
                            <p>- 3M 리플렉티브 웨빙</p>
                        </div>
                        <div id="fabricInfo">
                            <p>FABRIC</p>
                            <p> -F1: COTTON 100%</p>
                            <p> -F2: COTTON 100%</p>
                        </div>
                        <div id="detailOptionDiv">
                            <p>Option</p>
                            <div id="optionBoxDiv">
                                <div class="optionBox">
                                    <p>1</p>
                                </div>
                                <div class="optionBox">
                                    <p>2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default ProductDetail;