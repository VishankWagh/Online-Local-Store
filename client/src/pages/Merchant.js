import React, { useEffect, useState } from 'react'
import UpdateProduct from '../components/UpdateProduct'
import Order from '../components/Order'
import CreateProduct from '../components/CreateProduct'
import axios from "axios";

const Merchant = () => {

    const [orders, setOrders] = useState([]);
    const [shop, setShop] = useState();
    const [selectedMenuOpt, setSelectedMenuOpt] = useState("Orders");
    let shopName = "Variety";

    useEffect(() => {
        async function fetchShop() {
            const response = await axios.get(`http://localhost:5050/categories/getshop/${shopName}`);
            console.log(response.data.shop);
            setShop(response.data.shop);
        }
        fetchShop();
        // eslint-disable-next-line
        displayOrders();
    }, []);


    async function displayOrders() {
        try {
            const response = await axios.get(`http://localhost:5050/orders/getorders/${shopName}`);
            const neworders = response.data.orders
            // console.log("orders " + JSON.stringify(neworders));
            setSelectedMenuOpt("Orders")
            setOrders(neworders);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateStatus(id, status) {
        try {
            // const response = await axios.post(`http://localhost:5050/orders/setstatus/${id}`, { status });
            const response = await axios.post(`http://localhost:5050/orders/setstatus/${id}/${status}`, { status });
            // const response = await axios({
            //     method: 'POST',
            //     url: `http://localhost:5050/orders/setstatus/${id}`,
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: { status }
            // })
            console.log("update " + JSON.stringify(response.data.message));
        } catch (error) {
            console.log(error);
        }
    }

    // async function createCategory() {
    //     const response = await axios.post(`http://localhost:5050/categories/addcategory/${categoryName}/${shopName}`);
    // }



    // console.log("orders " + JSON.stringify(orders));

    return <div className="row position-sticky" style={{ paddingTop: "5rem" }}>
        <div className="list-group m-5 col-3 position-fixed top-20 text-center" style={{ marginTop: "10rem" }}>
            <p className="list-group-item list-group-item-action fs-4 active" aria-current="true" onClick={() => { displayOrders() }}>
                Orders
            </p>
            <p className="list-group-item list-group-item-action fs-4" onClick={() => setSelectedMenuOpt("Create Product")}>Create Product</p>
            <p className="list-group-item list-group-item-action fs-4" onClick={() => setSelectedMenuOpt("Update Product")}>Update Product</p>
            <p className="list-group-item list-group-item-action fs-4" onClick={() => setSelectedMenuOpt("Delete Product")}>Delete Product</p>
            <p className="list-group-item list-group-item-action fs-4" onClick={() => setSelectedMenuOpt("Create Category")}>Create Category</p>
            <p className="list-group-item list-group-item-action fs-4" onClick={() => setSelectedMenuOpt("Update Category")}>Update Category</p>
            <p className="list-group-item list-group-item-action fs-4" onClick={() => setSelectedMenuOpt("Delete Category")}>Delete Category</p>
        </div>


        <div className="col-8" style={{ marginLeft: "29rem" }}>
            <h2 className="my-5 mx-5">{selectedMenuOpt}</h2>
            {selectedMenuOpt === "Orders" &&
                orders.map((order, index) => {
                    return <Order key={index} id={index} _id={order._id} uname={order.uname} address={order.address} products={order.products} toBill={order.toBill} updateStatus={updateStatus} />
                })}
            {selectedMenuOpt === "Create Product" && <CreateProduct />}
            {selectedMenuOpt === "Update Product" && <UpdateProduct />}
            {selectedMenuOpt === "Delete Product" && <UpdateProduct />}
            {selectedMenuOpt === "Create Category" &&
                <div className="input-group mb-3 manage-cat-inp">
                    <input type="text" className="form-control" id="categoryName" placeholder="Enter Category Name" />
                    <button className="btn btn-outline-secondary btn-primary text-light" type="button" onClick={() => {
                        // const categoryName = document.getElementById("categoryName").value;
                        // createCategory(categoryName);
                    }}>Create</button>
                </div>}
            {selectedMenuOpt === "Delete Category" &&
                <div className="input-group mb-3 manage-cat-inp">
                    <input list="brow" className="px-3" placeholder="Search & Select Category" />
                    <datalist id="brow">
                        <option value="Internet Explorer" />
                        <option value="Firefox" />
                        <option value="Chrome" />
                        <option value="Opera" />
                        <option value="Safari" />
                    </datalist>
                    <button className="btn btn-outline-secondary h-100 btn-danger text-light" type="button">Delete</button>
                </div>}
        </div>
    </div>
}

export default Merchant
