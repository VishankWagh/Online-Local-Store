import React, { useEffect, useState } from 'react'
import UpdateProduct from '../components/UpdateProduct'
import Order from '../components/Order'
import CreateProduct from '../components/CreateProduct'
import axios from "axios";
import "../styles/Merchant.css"
import DeleteProduct from '../components/DeleteProduct';
import { useAuth } from '../context/auth';

const Merchant = () => {

    const [orders, setOrders] = useState([]);
    const [shopName, setShopName] = useState();
    const [selectedMenuOpt, setSelectedMenuOpt] = useState("Orders");
    const [category, setCategory] = useState("");
    const [catList, setCatList] = useState([]);

    const [auth, setAuth] = useAuth();


    // let shopName = "Variety";

    useEffect(() => {

        async function fetchData() {
            //get shopname
            const response = await axios.post("http://localhost:5050/shops/getshopName", { uname: auth.user.uname });
            if (response.data.success) {
                setShopName(response.data.shopName);
            }

            //get catlist
            const res = await axios.get(`http://localhost:5050/categories/getcategorylist/${response.data.shopName}`);
            if (response.status === 200) {
                setCatList(res.data.categories);
            }
        }

        fetchData();
        displayOrders();
        // eslint - disable - next - line
    }, [shopName]);

    document.title = "Quik-Buy | " + shopName;

    async function displayOrders() {
        try {
            const response = await axios.get(`http://localhost:5050/orders/getorders/${shopName}`);
            const neworders = response.data.orders
            // console.log("orders " + JSON.stringify(neworders));
            // setSelectedMenuOpt("Orders")
            setOrders(neworders);
        } catch (error) {
            console.log(error);
        }
    }
    console.log("sn " + shopName);
    // console.log("orders " + JSON.stringify(orders));

    async function updateStatus(id, status) {
        try {
            // const response = await axios.post(`http://localhost:5050/orders/setstatus/${id}`, { status });
            // const response = await axios.post(`http://localhost:5050/orders/setstatus/${id}/${status}`, { status });

            // const response = await axios({
            //     method: 'POST',
            //     url: `http://localhost:5050/orders/setstatus/${id}`,
            //     body: { status }
            // })
            console.log("update status called " + status);
            const response = await axios.post(`http://localhost:5050/orders/setstatus/${id}`, {
                status
            });
            if (response.status === 200) {
                alert(response.data.message);
            }
            else {
                alert("Update Status Unsuccessful !!")
            }

            console.log("update " + JSON.stringify(response.data.message));
        } catch (error) {
            console.log(error);
        }
    }

    const addCategory = async () => {
        const response = await axios.post("http://localhost:5050/categories/addcategory", { categoryName: category, shopName });

        if (response.status === 200) {
            alert(response.data.message);
        }
        else {
            alert("Add category Unsuccessful !!")
        }
    }

    const deleteCategory = async () => {
        const response = await axios.post("http://localhost:5050/categories/deletecategory", { categoryName: category, shopName });

        if (response.status === 200) {
            alert(response.data.message);
        }
        else {
            alert("Add category Unsuccessful !!")
        }
    }

    // console.log("orders " + JSON.stringify(orders));

    return <div className="merchant row position-sticky" >
        <div className="merchant-menu list-group mx-5 mt-4 col-3 position-fixed bottom-20 text-start" style={{ marginTop: "10rem" }}>
            <h1 className='mer-shpnm'>{shopName}</h1>
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
                <div className="m-5">
                    {orders.map((order, index) => {
                        console.log(JSON.stringify(order));
                        return <Order key={index} ind={index} id={order.orderId} name={order.name} address={order.address} products={order.products} status={order.status} subTotal={order.subTotal} dcharge={order.deliveryCharge} isDperson={false} updateStatus={updateStatus} />
                    })}
                </div>}
            {selectedMenuOpt === "Create Product" && <CreateProduct shopName={shopName} />}
            {selectedMenuOpt === "Update Product" && <UpdateProduct />}
            {selectedMenuOpt === "Delete Product" && <DeleteProduct />}
            {selectedMenuOpt === "Add Category" &&
                <div className="search-prod m-5 mb-3">
                    <label htmlFor="productName" className="form-label m-3 fs-5">Select Category</label>
                    <div className="input-group m-0  manage-cat-inp">
                        <input type="text" list="categories" className="form-control" id="categoryName" value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder="Search & Select Category" />
                        <datalist id="categories">
                            {catList.map((cat, ind) => {
                                return <option value={cat} />
                            })}
                            {/* <option value="Traditionals" />
                            <option value="Casuals" />
                            <option value="Electronics" />
                            <option value="Stationary" />
                            <option value="Home-decor" /> */}
                        </datalist>
                        <button className="btn btn-outline-secondary h-100 btn-danger text-light" type="button" onClick={() => { addCategory() }} >Add</button>
                    </div>
                </div>}

            {selectedMenuOpt === "Delete Category" &&
                <div className="search-prod m-5 mb-3">
                    <label htmlFor="categoryName" className="form-label m-3 fs-5">Search Category</label>
                    <div className="input-group m-0  manage-cat-inp">
                        <input type="text" list="categories" className="form-control" id="categoryName" value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder="Search & Select Category" />
                        <datalist id="categories">
                            {catList.map((cat, ind) => {
                                return <option value={cat} />
                            })}
                            {/* <option value="Traditionals" />
                            <option value="Casuals" />
                            <option value="Electronics" />
                            <option value="Stationary" />
                            <option value="Home-decor" /> */}
                        </datalist>
                        <button className="btn btn-outline-secondary h-100 btn-danger text-light" type="button" onClick={() => { deleteCategory() }}>Delete</button>
                    </div>
                </div>
            }
        </div>
    </div>
}

export default Merchant
