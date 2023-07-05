import React from 'react'

const Order = (props) => {
    return (
        <div className="my-5 mt-5 card order">
            <h5 className="card-header">Order : {props.id + 1}</h5>
            <div className="card-body  mt-3">
                <h6 className="card-text card-title fs-5"><b>UserName of Customer : </b> &nbsp; {props.uname} </h6>
                <p className="card-text mt-4"><b>Address : </b> {props.address} </p>
                <p className="fw-bold mt-2">Payment Method: COD</p>
                <div className="products row">
                    <div className="col-3 center">
                        <p className="fw-bold mt-3">Name</p>
                        <ul>
                            {props.products.map((product, index) => <li key={index}>{product.productName}</li>)}
                        </ul>
                        <p className="fw-bold mt-3">Total</p>
                    </div>
                    <div className="col-3">
                        <p className="fw-bold mt-3">Qyantity</p>
                        <ul>
                            {props.products.map((product, index) => <li key={index}>{product.qty}</li>)}
                        </ul>
                        <p className="fw-bold mt-3">₹ {props.toBill}</p>
                    </div>
                </div>
                <select className="form-select w-25 d-inline" id="status">
                    <option value="pending">Pending</option>
                    <option value="on the way">On The Way</option>
                    <option value="delivered">Delivered</option>
                </select>
                <button className="btn btn-primary d-inline mx-2" onClick={() => {
                    const status = document.getElementById("status").value;
                    props.updateStatus(props._id, status);
                }}>Update</button>
            </div>
        </div>
    )
}

export default Order
