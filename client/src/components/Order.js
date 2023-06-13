import React from 'react'

const Order = () => {
    return (
        <div class="md-5 mt-5 card order">
            <h5 class="card-header">Order: 1</h5>
            <div class="card-body">
                <h5 class="card-title">Customer Name: XYZ</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content. <br />Lorem ipsum dolor sit, amet consectetur adip</p>
                <p className="fw-bold mt-3">Payment Method: COD</p>
                <div className="products row">
                    <div className="col-3 center">
                        <p className="fw-bold mt-3">Name</p>
                        <ul>
                            <li>Biscuits</li>
                            <li>Biscuits</li>
                            <li>Biscuits</li>
                            <li>Biscuits</li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <p className="fw-bold mt-3">Qyantity</p>
                        <ul>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                        </ul>
                    </div>
                </div>
                <select class="form-select w-25">
                    <option value="1" selected>Pending</option>
                    <option value="2">On The Way</option>
                    <option value="3">Delivered</option>
                </select>
            </div>
        </div>
    )
}

export default Order
