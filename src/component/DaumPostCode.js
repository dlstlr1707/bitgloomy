import { useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function DaumPostCode({isModalOpen,addressInput,changeIsModalOpen,setAddressInput}){
    const postCodeStyle = {
        width: '500px',
        height: '500px',
        display: isModalOpen ? 'block' : 'none',
    }; // 스타일 정의 code
    

    const onCompletePost = data => {
        //console.log(data);
        //console.log(data.address);
        setAddressInput({
            ...addressInput,
            mainAddress : data.address,
            postcode : data.zonecode
        });
        changeIsModalOpen(false);
    };

    useEffect(()=>{
    },[isModalOpen]);

    return(
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => changeIsModalOpen(false)}
            className="modal-content" // 모달 내용에 적용할 클래스명
            overlayClassName="modal-overlay" // 모달 외부에 적용할 클래스명
            contentLabel="Example Modal">
            <DaumPostcode
                style={postCodeStyle}
                onComplete={onCompletePost}
            ></DaumPostcode>
        </Modal>
    );
}

export default DaumPostCode;