import React, { useEffect, useState } from 'react'
import axios from "axios"

const CreateProduct = (props) => {

    const [pName, setPName] = useState("");
    const [category, setCategory] = useState("");
    const [catList, setCatList] = useState([]);
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);

    const shopName = props.shopName;

    useEffect(() => {
        async function getcatlist() {
            const response = await axios.get(`http://localhost:5050/categories/getcategorylist/${shopName}`);
            if (response.status === 200) {
                setCatList(response.data.categories);
            }
        }
        getcatlist();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.post(`http://localhost:5050/products/${shopName}/create`, {
                pName,
                category,
                desc,
                price,
                qty
            });
            if (response.status === 200) {
                alert(response.data.message);
            }
            else {
                alert("Unsuccessful create product")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="m-5 col" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="productName" className="form-label b">Product Name</label>
                <input type="text" className="form-control bg-body-secondary" id="productName" value={pName} onChange={(e) => setPName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label b">Select Category</label>
                <input list="brow" className="px-3 form-control bg-body-secondary" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                <datalist id="brow">
                    {catList.map((cat, ind) => {
                        return <option value={cat} />
                    })}
                    {/* <option value="Casuals" />
                    <option value="Electronics" />
                    <option value="Stationary" />
                    <option value="Home-decor" /> */}
                </datalist>
            </div>
            <div className="mb-3">
                <label className="form-label b" htmlFor="productImg">Product image</label>
                <input type="file" className="form-control bg-body-secondary" id="productImg"></input>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label b">description</label>
                <textarea className="form-control bg-body-secondary" id="description" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label b">Price</label>
                <input type="number" className="form-control bg-body-secondary" id="price" value={price} onChange={(e) => setPrice(e.target.value)} ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="cp-qty" className="form-label b">Quantity</label>
                <input type="number" className="form-control bg-body-secondary" id="cp-qty" value={qty} onChange={(e) => setQty(e.target.value)} ></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default CreateProduct
