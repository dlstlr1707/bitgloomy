import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function OrderSingleList({orderInfo}) {
    const [isModalOpen,setIsModalOpen] = useState(false);
    return (
        <tr>
            <td><img src={orderInfo.productImg.imgURL}/></td>
            <td>{orderInfo.productName}</td>
            <td>{orderInfo.size}</td>
            <td>{orderInfo.amount}</td>
            <td>{orderInfo.price}</td>
            <td>{orderInfo.orderDate}</td>
            <td><p onClick={()=>{setIsModalOpen(true)}}>배송조회</p></td>
            <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="modal-content" // 모달 내용에 적용할 클래스명
            overlayClassName="modal-overlay" // 모달 외부에 적용할 클래스명
            contentLabel="Example Modal">
                <iframe
                src="https://link.tracker.delivery/track?client_id=12kormjabi7g52ps4s9ssi6q5c&carrier_id=kr.cjlogistics&tracking_number=500594562975"
                width="100%"
                height="500px"
                style={{ border: "none" }}
                ></iframe>
            </Modal>
        </tr>
    );
}

export default OrderSingleList;