import React, { useEffect, useState } from 'react'
import axios from "axios";

const UpdateProduct = () => {

    const [searched, setSearched] = useState(false);
    const [pName, setPName] = useState("");
    const [category, setCategory] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [prodList, setProdsList] = useState([]);

    let shopName = "Variety";
    let prevName;

    useEffect(() => {
        async function getprodlist() {
            const response = await axios.get(`http://localhost:5050/products/getproductlist/${shopName}`);
            if (response.status === 200) {
                setProdsList(response.data.prods);
            }
        }
        getprodlist();
    }, [])

    const handleSelect = async () => {
        const resp = await axios.get(`http://localhost:5050/products/singleproduct/${pName}`);

        if (resp.data.success) {
            const product = resp.data.product;
            prevName = product.name;
            setPName(product.name);
            setCategory(product.category);
            setDesc(product.desc);
            setPrice(product.price);
            setQty(product.qty);
            setSearched(true);
        }
        else {
            alert(resp.data.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`http://localhost:5050/products/updateproduct/${shopName}`, {
            pName,
            category,
            desc,
            price,
            qty,
            prevName
        });

        if (response.status === 200) {
            alert(response.data.message);
        } else {
            alert("Update Unsuccessfull");
        }
        setSearched(false);
    }

    return (<div className="col m-5">
        {!searched ?

            <div className="search-prod mb-3">
                <label htmlFor="productName" className="form-label m-3 fs-5">Search Product by Name</label>
                <div className="input-group m-0  manage-cat-inp">
                    <input type="text" list="products" className="form-control" id="productName" onChange={(e) => { setPName(e.target.value) }} placeholder="Search Product Name" />
                    <datalist id="products">
                        {prodList.map((p, ind) => {
                            return <option value={p} key={ind} />
                        })}
                    </datalist>
                    <button className="btn btn-outline-secondary h-100 btn-danger text-light" type="button" onClick={() => handleSelect()}>Select</button>
                </div>
            </div>

            :

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="pname" className="form-label">Product Name</label>
                    <input type="text" className="form-control bg-body-secondary" id="pname" value={pName} onChange={(e) => setPName(e.target.value)}></input>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="pimg">Product image</label>
                    <input type="file" className="form-control bg-body-secondary" id="pimg"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">description</label>
                    <textarea className="form-control bg-body-secondary" placeholder="Enter Product description" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                </div>
                <div className="mb-3 w-25">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control bg-body-secondary" id="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                </div>
                <div className="mb-3 w-25">
                    <label htmlFor="qty" className="form-label">Quantity</label>
                    <input type="number" className="form-control bg-body-secondary" id="qty" value={qty} onChange={(e) => setQty(e.target.value)}></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        }
    </div>
    )
}

export default UpdateProduct
