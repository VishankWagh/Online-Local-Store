import React from 'react'

const Order = (props) => {

    console.log(props.products[0].price);

    return (
        <div className="my-5 mx-4 border-0 rounded-0 mt-5 card order w-50 order">
            <h5 className="card-header order-header fs-3 fw-bold">Order : {props.id + 1}</h5>
            <div className="card-body mt-3">
                {/* <p className="card-text mb-1"><b>UserName of Customer : </b> &nbsp; {props.uname} </p>
                <p className="card-text m-0"><b>Address : </b> {props.address} </p>
                <p className="mt-3"><b>Payment Method:</b> COD</p> */}
                <table className="table mb-4">
                    <tbody>
                        <tr>
                            <th scope="row" className="fs-5" style={{ width: "24%" }} colSpan={2}>User Name : </th>
                            <td className="w-50" style={{ fontSize: "17px" }} >{props.uname}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="fs-5" colSpan={2}>Address : </th>
                            <td className="w-50" style={{ fontSize: "17px" }} >{props.address}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="fs-5" colSpan={2}>Payment : </th>
                            <td className="w-50" style={{ fontSize: "17px" }} >COD</td>
                        </tr>
                    </tbody>
                </table>
                <table className="table del-prod-card mb-4 text-center">
                    <tbody>
                        <tr>
                            <th scope="row" className="fs-5" >Name</th>
                            {/* <th scope="row" className="fs-5" >Price</th> */}
                            <th scope="row" className="fs-5" >Qty</th>
                        </tr>
                        {props.products.map((product, index) => {
                            console.log(index)
                            return <tr key={index}>
                                <td className="" style={{ fontSize: "17px" }} >{product.productName}</td>
                                {/* <td className="" style={{ fontSize: "17px" }} >{product.price}</td> */}
                                <td className="" style={{ fontSize: "17px" }} >{product.qty}</td>
                            </tr>
                        })}
                        <tr>
                            {/* <td></td> */}
                        </tr>
                        <tr rowSpan={2} className="border border-black">
                            <th scope="row" className="" style={{ fontSize: "17px" }} >Total</th>
                            <td className="" style={{ fontSize: "17px" }} >₹ {props.totBill}</td>
                        </tr>
                    </tbody>
                </table>

                <select className="order-status form-select d-inline rounded-0 w-50" id="status">
                    <option value="pending">Pending</option>
                    <option value="on the way">On The Way</option>
                    <option value="delivered">Delivered</option>
                </select>
                <button className="btn btn-primary d-inline mx-2 rounded-0 w-25" onClick={() => {
                    const status = document.getElementById("status").value;
                    props.updateStatus(props._id, status);
                }}>Update</button>
            </div>
        </div>
    )
}

export default Order
