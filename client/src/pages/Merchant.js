import React, { useEffect, useState } from 'react'
import UpdateProduct from '../components/UpdateProduct'
import Order from '../components/Order'
import CreateProduct from '../components/CreateProduct'
import axios from "axios";
import "../styles/Merchant.css"

const Merchant = () => {

    const [orders, setOrders] = useState([]);
    // const [shop, setShop] = useState();
    const [selectedMenuOpt, setSelectedMenuOpt] = useState("Orders");
    let shopName = "Variety";

    useEffect(() => {

        // async function fetchShop() {
        //     const response = await axios.get(`http://localhost:5050/shops/getshop/${shopName}`);
        //     console.log(response.data.shop);
        //     setShop(response.data.shop);
        displayOrders();
        // }
        // fetchShop();
        // eslint - disable - next - line
    }, [shopName]);


    async function displayOrders() {
        try {
            const response = await axios.get(`http://localhost:5050/orders/getorders/${shopName}`);
            const neworders = response.data.orders
            console.log("orders " + JSON.stringify(neworders));
            // setSelectedMenuOpt("Orders")
            setOrders(neworders);
        } catch (error) {
            console.log(error);
        }
    }
    console.log("orders " + JSON.stringify(orders));

    async function updateStatus(id, status) {
        try {
            // const response = await axios.post(`http://localhost:5050/orders/setstatus/${id}`, { status });
            // const response = await axios.post(`http://localhost:5050/orders/setstatus/${id}/${status}`, { status });
            const response = await axios({
                method: 'POST',
                url: `http://localhost:5050/orders/setstatus/${id}`,
                body: { status }
            })
            console.log("update " + JSON.stringify(response.data.message));
        } catch (error) {
            console.log(error);
        }
    }

    // async function createCategory() {
    //     const response = await axios.post(`http://localhost:5050/categories/addcategory/${categoryName}/${shopName}`);
    // }



    // console.log("orders " + JSON.stringify(orders));

    return <div className="merchant row position-sticky" style={{ paddingTop: "5rem" }}>
        <div className="merchant-menu list-group mx-5 mt-4 col-3 position-fixed bottom-20 text-start" style={{ marginTop: "10rem" }}>
            <p className="list-group-item m-0 py-3 px-4 border-black user-select-none list-group-item-action fs-4" aria-current="true" onClick={(e) => { displayOrders(); setSelectedMenuOpt("Orders"); }}>
                <span className="material-symbols-outlined mx-3 fs-2">checklist_rtl</span>
                Orders
            </p>
            <p className="list-group-item m-0 py-3 px-4 border-black user-select-none list-group-item-action fs-4" onClick={(e) => { setSelectedMenuOpt("Create Product"); }}>
                <span className="material-symbols-outlined mx-3 fs-2">add_notes</span>
                Create Product
            </p>
            <p className="list-group-item m-0 py-3 px-4 border-black user-select-none list-group-item-action fs-4" onClick={(e) => { setSelectedMenuOpt("Update Product"); }}>
                <span className="material-symbols-outlined mx-3 fs-2">app_registration</span>
                Update Product
            </p>
            <p className="list-group-item m-0 py-3 px-4 border-black user-select-none list-group-item-action fs-4" onClick={(e) => { setSelectedMenuOpt("Delete Product"); }}>
                <span className="material-symbols-outlined mx-3 fs-2">delete</span>
                Delete Product
            </p>
            <p className="list-group-item m-0 py-3 px-4 border-black user-select-none list-group-item-action fs-4" onClick={(e) => { setSelectedMenuOpt("Add Category"); }}>
                <span className="material-symbols-outlined mx-3 fs-2">add_notes</span>
                Add Category
            </p>
            <p className="list-group-item m-0 py-3 px-4 border-black user-select-none list-group-item-action fs-4" onClick={(e) => { setSelectedMenuOpt("Delete Category"); }}>
                <span className="material-symbols-outlined mx-3 fs-2">delete</span>
                Delete Category
            </p>
        </div>


        <div className="col-8" style={{ marginLeft: "29rem" }}>
            <h2 className="mt-4 mx-5 pb-3 font-weight-bold fs-1 border-bottom border-5 merchant-head">
                {selectedMenuOpt === "Orders" && <span className="material-symbols-outlined mx-4 fs-1">checklist_rtl</span>}
                {selectedMenuOpt === "Create Product" && <span className="material-symbols-outlined mx-4 fs-1">add_notes</span>}
                {selectedMenuOpt === "Update Product" && <span className="material-symbols-outlined mx-4 fs-1">app_registration</span>}
                {selectedMenuOpt === "Delete Product" && <span className="material-symbols-outlined mx-4 fs-1">delete</span>}
                {selectedMenuOpt === "Add Category" && <span className="material-symbols-outlined mx-4 fs-1">add_notes</span>}
                {selectedMenuOpt === "Delete Category" && <span className="material-symbols-outlined mx-4 fs-1">delete</span>}
                {selectedMenuOpt}
            </h2>
            {selectedMenuOpt === "Orders" &&
                <div className="d-flex">
                    {orders.map((order, index) => {
                        return <Order key={index} id={index} _id={order._id} uname={order.uname} address={order.address} products={order.products} totBill={order.totBill} updateStatus={updateStatus} />
                    })}
                </div>}
            {selectedMenuOpt === "Create Product" && <CreateProduct />}
            {selectedMenuOpt === "Update Product" && <UpdateProduct />}
            {selectedMenuOpt === "Delete Product" &&
                <div className="card del-prod-card m-5 w-75">
                    <div className="card-header fs-4">
                        <div className="search-prod mb-3">
                            <label htmlFor="productName" className="form-label m-3 fs-5">Search Product</label>
                            <div className="input-group m-0 delete-prod-inp w-50">
                                <input type="text" list="products" className="form-control" id="productName" placeholder="Search & Select Product" />
                                <datalist id="products">
                                    <option value="keyboard" />
                                    <option value="Mouse" />
                                    <option value="Laptop" />
                                    <option value="kurta" />
                                </datalist>
                                <button className="btn btn-outline-secondary h-100 btn-danger text-light" type="button">Select</button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="prod-img h-50 w-50 mx-4 mb-4">
                            <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg" className="object-fit-contain" alt="" />
                        </div>
                        {/* <p className="m-2 p-0" ><b className="fs-5">Product Name : </b><span className="fs-5 ms-3">Smart Watch</span></p>
                        <p className="m-2 p-0" ><b className="fs-5">Description : </b><span className="fs-5 ms-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, qui eum veritatis saepe facilis sit quis nulla iste laudantium laborum.</span><br /></p>
                        <p className="m-2 p-0" ><b className="fs-5">Price: </b><span className="fs-5 ms-3">$ 1499.00</span></p> */}

                        <table className="table mb-4">
                            <tbody>
                                <tr>
                                    <th scope="row" className="fs-5 w-15" style={{ width: "24%" }} colSpan={2}>Product Name : </th>
                                    <td className="fw" style={{ fontSize: "17px" }} >Smart Watch</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="fs-5" colSpan={2}>Description : </th>
                                    <td className="fw" style={{ fontSize: "17px" }} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, qui eum veritatis saepe facilis sit quis nulla iste laudantium laborum</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="fs-5" colSpan={2}>Price: </th>
                                    <td className="fw" style={{ fontSize: "17px" }} >$ 1499.00</td>
                                </tr>
                            </tbody>
                        </table>


                        <button href="#" className="btn btn-danger px-5">
                            Delete
                        </button>
                    </div>
                </div>

            }
            {selectedMenuOpt === "Add Category" &&
                <div className="search-prod m-5 mb-3">
                    <label htmlFor="productName" className="form-label m-3 fs-5">Select Category</label>
                    <div className="input-group m-0  manage-cat-inp">
                        <input type="text" list="categories" className="form-control" id="categoryName" placeholder="Search & Select Category" />
                        <datalist id="categories">
                            <option value="Traditionals" />
                            <option value="Casuals" />
                            <option value="Electronics" />
                            <option value="Stationary" />
                            <option value="Home-decor" />
                        </datalist>
                        <button className="btn btn-outline-secondary h-100 btn-danger text-light" type="button">Add</button>
                    </div>
                </div>}

            {selectedMenuOpt === "Delete Category" &&
                <div className="search-prod m-5 mb-3">
                    <label htmlFor="categoryName" className="form-label m-3 fs-5">Search Category</label>
                    <div className="input-group m-0  manage-cat-inp">
                        <input type="text" list="categories" className="form-control" id="categoryName" placeholder="Search & Select Category" />
                        <datalist id="categories">
                            <option value="Traditionals" />
                            <option value="Casuals" />
                            <option value="Electronics" />
                            <option value="Stationary" />
                            <option value="Home-decor" />
                        </datalist>
                        <button className="btn btn-outline-secondary h-100 btn-danger text-light" type="button">Delete</button>
                    </div>
                </div>
            }
        </div>
    </div>
}

export default Merchant
