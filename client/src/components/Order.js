import React from 'react'

const Order = (props) => {

    return (
        <div className="p-0 border-0 rounded-0 mb-5 card order">
            <h5 className="card-header order-header fs-3 fw-bold">Order : {props.ind + 1}</h5>
            <div className="card-body">
                {/* <p className="card-text mb-1"><b>UserName of Customer : </b> &nbsp; {props.uname} </p>
                <p className="card-text m-0"><b>Address : </b> {props.address} </p>
                <p className="mt-3"><b>Payment Method:</b> COD</p> */}
                <table className="table mb-4">
                    <tbody>
                        <tr>
                            <th scope="row" className="fs-5" style={{ width: "24%" }} colSpan={2}>User Name : </th>
                            <td className="w-50 fs-6" >{props.name}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="fs-5" colSpan={2}>Address : </th>
                            <td className="w-50 fs-6" >{props.address}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="fs-5" colSpan={2}>Payment : </th>
                            <td className="w-50 fs-6" >COD</td>
                        </tr>
                        {!props.isDperson && <tr>
                            <th scope="row" className="fs-5" colSpan={2}>Status : </th>
                            <td className="w-50 fs-6 fw-bold" >{props.status}</td>
                        </tr>}
                    </tbody>
                </table>
                <table className="table del-prod-card mb-3">
                    <tbody>
                        <tr>
                            <th scope="row" className="fs-5" >Name</th>
                            {/* <th scope="row" className="fs-5" >Price</th> */}
                            <th scope="row" className="fs-5" >Qty</th>
                            <td></td>
                            <th scope="row" className="fs-5" >Price</th>
                        </tr>
                        {props.products.map((product, index) => {
                            return <tr key={index}>
                                <td className="" style={{ fontSize: "17px" }} >{product.prodName}</td>
                                {/* <td className="" style={{ fontSize: "17px" }} >{product.price}</td> */}
                                <td className="" style={{ fontSize: "17px" }} >{product.qty}</td>
                                <td className="fw-light" >X</td>
                                <td className="" style={{ fontSize: "17px" }} >₹ 10{product.price}</td>
                            </tr>
                        })}
                        <tr className="border-bottom border-black">
                            {/* <td></td> */}
                            <th scope="row" className="" style={{ fontSize: "17px" }} >Delivery Charges</th>
                            <td></td>
                            <td></td>
                            <th>₹ {props.dcharge}</th>
                        </tr>
                        <tr rowSpan={2} className="">
                            <th scope="row" className="" style={{ fontSize: "17px" }} >Total</th>
                            <td></td>
                            <td></td>
                            <th>₹ {props.subTotal}</th>
                        </tr>
                    </tbody>
                </table>

                {props.isDperson && <>
                    <select className="order-status form-select d-inline rounded-0 w-25" id="status">
                        <option value="pending">Pending</option>
                        <option value="on the way">On The Way</option>
                        <option value="delivered">Delivered</option>
                    </select>
                    <button className="btn btn-primary d-inline mx-4 rounded-0 w-25" onClick={() => {
                        const status = document.getElementById("status").value;
                        console.log(status);
                        props.updateStatus(props.id, status);
                    }}>Update</button>
                </>
                }
            </div>
        </div>
    )
}

export default Order