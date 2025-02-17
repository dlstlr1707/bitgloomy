

function OrderSingleList({orderInfo}) {
    return (
        <tr>
            <td><img src={orderInfo.productImg.imgURL}/></td>
            <td>{orderInfo.productName}</td>
            <td>{orderInfo.size}</td>
            <td>{orderInfo.amount}</td>
            <td>{orderInfo.price}</td>
            <td>{orderInfo.orderDate}</td>
            <td><a href="https://tracker.delivery/#/:carrier_id/:track_id" target="_blank">배송조회</a></td>
        </tr>
    );
}

export default OrderSingleList;