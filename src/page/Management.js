import "../css/management.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
function Management(){
    const uploadRef = useRef(null);
    const modifyRef = useRef(null);
    const deleteRef = useRef(null);
    const initProductInfo = {
        pname : "",
        modifyPname : "",
        contents : "",
        productMaterial : "",
        fabric : "",
        size : "",
        price : 0,
        quantity : 0,
        category : "",
        similarProductName : ""
    };
    const [currentTab,setCurrentTab] = useState("uploadProduct");
    const [productInfo,setProductInfo] = useState(initProductInfo);
    const [productMainImg,setProductMainImg] = useState();
    const [productImgArr,setProductImgArr] = useState();
    const handleClickedTab = (e) => {
        //console.log(uploadRef.current.style.className);
        if(e.target.id === "uploadProduct"){
            uploadRef.current.style.setProperty('background-color', '#000000');
            uploadRef.current.style.setProperty('border', 'none');
            uploadRef.current.style.setProperty('color', '#ffffff');

            modifyRef.current.style.setProperty('background-color', 'inherit');
            modifyRef.current.style.setProperty('border', '1px solid #c2c2c2');
            modifyRef.current.style.setProperty('color', '#c2c2c2');

            deleteRef.current.style.setProperty('background-color', 'inherit');
            deleteRef.current.style.setProperty('border', '1px solid #c2c2c2');
            deleteRef.current.style.setProperty('color', '#c2c2c2');
        }else if(e.target.id === "modifyProduct"){
            modifyRef.current.style.setProperty('background-color', '#000000');
            modifyRef.current.style.setProperty('border', 'none');
            modifyRef.current.style.setProperty('color', '#ffffff');

            uploadRef.current.style.setProperty('background-color', 'inherit');
            uploadRef.current.style.setProperty('border', '1px solid #c2c2c2');
            uploadRef.current.style.setProperty('color', '#c2c2c2');

            deleteRef.current.style.setProperty('background-color', 'inherit');
            deleteRef.current.style.setProperty('border', '1px solid #c2c2c2');
            deleteRef.current.style.setProperty('color', '#c2c2c2');
            
        }else if(e.target.id === "deleteProduct"){
            deleteRef.current.style.setProperty('background-color', '#000000');
            deleteRef.current.style.setProperty('border', 'none');
            deleteRef.current.style.setProperty('color', '#ffffff');

            uploadRef.current.style.setProperty('background-color', 'inherit');
            uploadRef.current.style.setProperty('border', '1px solid #c2c2c2');
            uploadRef.current.style.setProperty('color', '#c2c2c2');

            modifyRef.current.style.setProperty('background-color', 'inherit');
            modifyRef.current.style.setProperty('border', '1px solid #c2c2c2');
            modifyRef.current.style.setProperty('color', '#c2c2c2');
        }
        setCurrentTab(e.target.id);
    }
    const handleOnchange = (e) => {
        switch(e.target.id){
            case "pname":
                setProductInfo({
                    ...productInfo,
                    pname : e.target.value
                });
                break;
            case "similarProductName":
                setProductInfo({
                    ...productInfo,
                    similarProductName : e.target.value
                });
                break;
            case "contents":
                setProductInfo({
                    ...productInfo,
                    contents : e.target.value
                });
                break;
            case "productMaterial":
                setProductInfo({
                    ...productInfo,
                    productMaterial : e.target.value
                });
                break;
            case "fabric":
                setProductInfo({
                    ...productInfo,
                    fabric : e.target.value
                });
                break;
            case "size":
                setProductInfo({
                    ...productInfo,
                    size : e.target.value
                });
                break;
            case "price":
                setProductInfo({
                    ...productInfo,
                    price : e.target.value
                });
                break;
            case "quantity":
                setProductInfo({
                    ...productInfo,
                    quantity : e.target.value
                });
                break;
            case "category":
                setProductInfo({
                    ...productInfo,
                    category : e.target.value
                });
                break;
            default:
                break;
        }
    }
    const addImg = (e) => {
        //var reg = /(.*?)\.(jpg|jpeg|png)$/;
        for(var idx=0; idx<e.target.files.length;idx++){
            if(e.target.files[idx].type==="image/png"||e.target.files[idx].type==="image/jpg"||e.target.files[idx].type==="image/jpeg") {
                //alert("해당 파일은 이미지 파일입니다.");
                console.log("적합한 파일입니다.");
            } else {
                alert("해당 파일은 업로드가 불가능합니다.");
            }
        }
        if(e.target.id === "mainImg"){
            console.log("메인사진");
            console.log(e.target.files);
            setProductMainImg(e.target.files);
        }else if(e.target.id === "subImg"){
            console.log("서브사진");
            console.log(e.target.files);
            setProductImgArr(e.target.files);
        }else{
            alert("파일업로드 실패!");
        }
    }
    const renderContent = () => {
        if(currentTab === "uploadProduct"){
            return(
                <form className="managementForm">
                    <div className="managementInputDiv">
                        <p>상품명</p>
                        <input type="text" id="pname" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>연관된 상품명</p>
                        <input type="text" id="similarProductName" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>가격</p>
                        <input type="number" id="price" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>재고</p>
                        <input type="number" id="quantity" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>카테고리</p>
                        <input type="text" id="category" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>사이즈</p>
                        <input type="text" id="size" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>재질</p>
                        <input type="text" id="fabric" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>부자재</p>
                        <input type="text" id="productMaterial" onChange={handleOnchange}/>
                    </div>
                    <div className="managementTextAreaDiv">
                        <p>내용</p>
                        <textarea name="" id="contents" onChange={handleOnchange}/>
                    </div>
                    <div className="managementTextAreaDiv">
                        <p>상품 메인 사진</p>
                        <input type="file" accept="image/png,image/jpeg" required id="mainImg" onChange={addImg}/>
                    </div>
                    <div className="managementTextAreaDiv">
                        <p>상세 사진 (최대 10장)</p>
                        <input type="file" accept="image/png,image/jpeg" multiple id="subImg" onChange={addImg}/>
                    </div>
                    <button onClick={requestUpload}>등록</button>
                </form>
            );
        }else if(currentTab === "modifyProduct"){
            return(
                <form className="managementForm">
                    <div className="managementInputDiv">
                        <p>수정할 상품명</p>
                        <input type="text" id="pname" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>변경 상품명</p>
                        <input type="text" id="ModifyPname" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>연관된 상품명</p>
                        <input type="text" id="similarProductName" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>가격</p>
                        <input type="number" id="price" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>재고</p>
                        <input type="number" id="quantity" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>카테고리</p>
                        <input type="text" id="category" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>사이즈</p>
                        <input type="text" id="size" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>재질</p>
                        <input type="text" id="fabric" onChange={handleOnchange}/>
                    </div>
                    <div className="managementInputDiv">
                        <p>부자재</p>
                        <input type="text" id="productMaterial" onChange={handleOnchange}/>
                    </div>
                    <div className="managementTextAreaDiv">
                        <p>내용</p>
                        <textarea name="" id="contents" onChange={handleOnchange}/>
                    </div>
                    <div className="managementTextAreaDiv">
                        <p>상품 메인 사진</p>
                        <input type="file" accept="image/png,image/jpeg" required id="mainImg" onChange={addImg}/>
                    </div>
                    <div className="managementTextAreaDiv">
                        <p>상세 사진 (최대 10장)</p>
                        <input type="file" accept="image/png,image/jpeg" multiple id="subImg" onChange={addImg}/>
                    </div>
                    <button onClick={requestModify}>수정</button>
                </form>
            );
        }else if(currentTab === "deleteProduct"){
            // 삭제할 상품명만 입력하던지
            // 전체 상품 목록 테이블형테로 가져와서 선택한 상품 삭제요청 하던지
            // 시간 보고 결정
            return(
                <form className="managementForm">
                    <div className="managementInputDiv">
                        <p>삭제할 상품명</p>
                        <input type="text" id="pname" onChange={handleOnchange}/>
                    </div>
                    
                    <button onClick={requestDelete}>삭제</button>
                </form>
            );
        }else{
            console.log("잘못된 인자가 넘어옴!");
        }
    }
    const requestUpload = async(e) => {
        // 이미지는 form-data로 정보는 json으로 전달
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('mainImg', productMainImg[0]);
        for(var idx=0; idx<productImgArr.length;idx++){
            formData.append('subImg', productImgArr[idx]);
        }
        formData.append('productInfo', new Blob([JSON.stringify(productInfo)], {
            type: "application/json"
        }));
        
        //console.log(productImgArr);

        await axios.post('http://localhost:8080/product'
            , formData
        ).then(res => {
            console.log(res);
        }).catch(err => {
            alert('등록을 실패하였습니다.');
        });
    }
    const requestModify = (e) => {
        // 이미지는 form-data로 정보는 json으로 전달
        // 사진 수정 어떻게 처리할지 정해야함
        e.preventDefault();
        
    }
    const requestDelete = (e) => {
        // 이미지는 form-data로 정보는 json으로 전달
        // 사진 수정 어떻게 처리할지 정해야함
        e.preventDefault();
        
    }
    useEffect(()=>{
    },[productInfo,currentTab,productImgArr,productMainImg]);
    return(
            <main>
                <div id="managementContainer">
                    <div id="noticeTabMenu">
                        <ul>
                            <li ref={uploadRef} className="selectedTab" id="uploadProduct" onClick={handleClickedTab}>상품등록</li>
                            <li ref={modifyRef} className="unSelectedTab" id="modifyProduct" onClick={handleClickedTab}>상품수정</li>
                            <li ref={deleteRef} className="unSelectedTab" id="deleteProduct" onClick={handleClickedTab}>상품삭제</li>
                        </ul>
                    </div>
                    <div id="managementContentDiv">
                        {renderContent()}
                    </div>
                </div>
            </main>
    );
}

export default Management;