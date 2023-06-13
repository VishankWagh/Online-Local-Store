import React from 'react'
import UpdateProduct from '../components/UpdateProduct'
import Order from '../components/Order'
import CreateProduct from '../components/CreateProduct'

const Merchant = () => {
    return <div className="row position-relative" style={{ paddingTop: "5rem" }}>
        <div className="list-group m-5 col-3 position-fixed top-20" style={{ marginTop: "10rem" }}>
            <p class="list-group-item list-group-item-action fs-4 active" aria-current="true">
                Update Product
            </p>
            <p className="list-group-item list-group-item-action fs-4">Create Product</p>
            <p className="list-group-item list-group-item-action fs-4">Orders</p>
        </div>
        <div className="col-8" style={{ marginLeft: "29rem" }}>
            <h2 className="mb-4">Update Product</h2>
            {/* <UpdateProduct /> */}
            {/* <CreateProduct /> */}
            <Order />
            <Order />
            <Order />
        </div>
    </div>
}

export default Merchant
