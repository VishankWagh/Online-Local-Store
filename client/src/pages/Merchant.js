import React, { useEffect, useState } from 'react'
import UpdateProduct from '../components/UpdateProduct'
import Order from '../components/Order'
import CreateProduct from '../components/CreateProduct'
import axios from "axios";
import "../styles/Merchant.css"
import DeleteProduct from '../components/DeleteProduct';
import { useAuth } from '../context/auth';
import Select from 'react-select';
import Dashboard from '../components/Dashboard';

const Merchant = () => {

    const [orders, setOrders] = useState([]);
    const [shopName, setShopName] = useState();
    const [selectedMenuOpt, setSelectedMenuOpt] = useState("Dashboard");
    const [category, setCategory] = useState({});
    const [sCatList, setSCatList] = useState([]);
    const [catList, setCatList] = useState([]);

    const [auth, setAuth] = useAuth();


    // let shopName = "Variety";

    useEffect(() => {

        async function fetchData() {
            //get shopname
            const res1 = await axios.post(`${process.env.REACT_APP_SERVER_URL}/shops/getshopName`, { uname: auth.user.uname });
            if (res1.data.success) {
                setShopName(res1.data.shopName);
            }

            //get shop catlist
            const res2 = await axios.get(`${process.env.REACT_APP_SERVER_URL}/categories/getcategorylist/${res1.data.shopName}`);
            if (res2.status === 200) {
                let nSCat = [
                    // { value: '', label: 'Select Category Name', isFixed: true },
                    ...res2.data.categories.map(cat => { return { value: cat, label: cat } })
                ];
                setSCatList(nSCat);
            }

            //get all catlist
            const res3 = await axios.get(`${process.env.REACT_APP_SERVER_URL}/categories/getallcategories`);
            if (res3.status === 200) {
                let nCat = [
                    // { value: '', label: 'Select Category', isFixed: true },
                    ...res3.data.categories.map(cat => { return { value: cat, label: cat } })
                ];
                setCatList(nCat);
                // console.log(JSON.stringify(res3.data.categories));
            }
        }

        fetchData();
        displayOrders();
        // eslint - disable - next - line
    }, [shopName]);

    document.title = "Quik-Buy | " + shopName;

    async function displayOrders() {
        try {
            if (shopName) {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/orders/getorders/${shopName}`);
                const neworders = response.data.orders
                // console.log("orders " + JSON.stringify(neworders));
                // setSelectedMenuOpt("Orders")
                setOrders(neworders);
            }
        } catch (error) {
            console.log(error);
        }
    }
    // console.log("sn " + shopName);
    // console.log("orders " + JSON.stringify(sCatList));

    async function updateStatus(id, status) {
        try {
            // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders/setstatus/${id}`, { status });
            // const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders/setstatus/${id}/${status}`, { status });

            // const response = await axios({
            //     method: 'POST',
            //     url: `${process.env.REACT_APP_SERVER_URL}/orders/setstatus/${id}`,
            //     body: { status }
            // })
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders/setstatus/${id}`, {
                status
            });
            if (response.status === 200) {
                alert(response.data.message);
            }
            else {
                alert("Update Status Unsuccessful !!")
            }

        } catch (error) {
            console.log(error);
        }
    }

    const addCategory = async () => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/categories/addcategory`, { categoryName: category.value, shopName });

        if (response.status === 200) {
            alert(response.data.message);
        }
        else {
            alert("Add category Unsuccessful !!")
        }
    }

    const deleteCategory = async () => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/categories/deletecategory`, { categoryName: category.value, shopName });

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
            <h1 className='mer-shpnm'>{shopName ? shopName : "Shop Menu"}</h1>
            <p className="list-group-item m-0 py-3 px-4 border-black user-select-none list-group-item-action fs-4" aria-current="true" onClick={(e) => { setSelectedMenuOpt("Dashboard"); }}>
                <span className="material-symbols-outlined mx-3 fs-2">apps</span>
                Dashboard
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
            <p className="list-group-item m-0 py-3 px-4 border-black user-select-none list-group-item-action fs-4" onClick={(e) => { setSelectedMenuOpt("Add Category"); setCategory({}); }}>
                <span className="material-symbols-outlined mx-3 fs-2">add_notes</span>
                Add Category
            </p>
            <p className="list-group-item m-0 py-3 px-4 border-black user-select-none list-group-item-action fs-4" onClick={(e) => { setSelectedMenuOpt("Delete Category"); setCategory({}); }}>
                <span className="material-symbols-outlined mx-3 fs-2">delete</span>
                Delete Category
            </p>
        </div>


        <div className="col-8" style={{ marginLeft: "29rem" }}>
            <h2 className="mt-4 mb-0 mx-5 pb-3 font-weight-bold fs-1 border-bottom border-5 merchant-head">
                {selectedMenuOpt === "Dashboard" && <span className="material-symbols-outlined mx-4 fs-1">apps</span>}
                {selectedMenuOpt === "Create Product" && <span className="material-symbols-outlined mx-4 fs-1">add_notes</span>}
                {selectedMenuOpt === "Update Product" && <span className="material-symbols-outlined mx-4 fs-1">app_registration</span>}
                {selectedMenuOpt === "Delete Product" && <span className="material-symbols-outlined mx-4 fs-1">delete</span>}
                {selectedMenuOpt === "Add Category" && <span className="material-symbols-outlined mx-4 fs-1">add_notes</span>}
                {selectedMenuOpt === "Delete Category" && <span className="material-symbols-outlined mx-4 fs-1">delete</span>}
                {selectedMenuOpt}
            </h2>
            {/* {selectedMenuOpt === "Orders" &&
                <div className="m-5">
                    {orders ? orders.map((order, index) => {
                        console.log(JSON.stringify(order));
                        return <Order key={index} ind={index} id={order.orderId} name={order.name} address={order.address} products={order.products} status={order.status} subTotal={order.subTotal} dcharge={order.deliveryCharge} isDperson={false} updateStatus={updateStatus} />
                    })
                        : <h5>No Orders</h5>
                    }
                </div>} */}
            {selectedMenuOpt === "Dashboard" && <Dashboard shopName={shopName} orders={orders} sCatList={sCatList} updateStatus={updateStatus} />}
            {selectedMenuOpt === "Create Product" && <CreateProduct shopName={shopName} sCatList={sCatList} />}
            {selectedMenuOpt === "Update Product" && <UpdateProduct shopName={shopName} />}
            {selectedMenuOpt === "Delete Product" && <DeleteProduct shopName={shopName} />}
            {selectedMenuOpt === "Add Category" &&
                <div className="search-prod m-5 mb-3">
                    <label htmlFor="productName" className="form-label m-3 fs-5">Select Category</label>
                    <div className="input-group m-0  manage-cat-inp">
                        {/* <input type="text" list="categories" className="form-control" id="categoryName" value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder="Search & Select Category" />
                        <datalist id="categories">
                            {catList.map((cat, ind) => {
                                return <option value={cat} key={ind} />
                            })}
                        </datalist> */}
                        <Select options={catList} name="prods" className="form-control merchant-sel-inp" onChange={setCategory} placeholder="Select Category" />
                        <button className="btn btn-outline-secondary h-100 btn-danger text-light" disabled={category.value ? false : true} type="button" onClick={() => { addCategory() }} >Add</button>
                    </div>
                </div>}

            {selectedMenuOpt === "Delete Category" &&
                <div className="search-prod m-5 mb-3">
                    <label htmlFor="categoryName" className="form-label m-3 fs-5">Search Category</label>
                    <div className="input-group m-0  manage-cat-inp">
                        {/* <input type="text" list="categories" className="form-control" id="categoryName" value={category} onChange={(e) => { setCategory(e.target.value) }} placeholder="Search & Select Category" />
                        <datalist id="categories">
                            {sCatList.map((cat, ind) => {
                                return <option value={cat.value} key={ind} />
                            })}
                        </datalist> */}
                        <Select options={sCatList} name="prods" className="form-control merchant-sel-inp" onChange={setCategory} placeholder="Select Category" />
                        <button className="btn btn-outline-secondary h-100 btn-danger text-light" disabled={category.value ? false : true} type="button" onClick={() => { deleteCategory() }}>Delete</button>
                    </div>
                </div>
            }
        </div>
    </div>
}

export default Merchant
