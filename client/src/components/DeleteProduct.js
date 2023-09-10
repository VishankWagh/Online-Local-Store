import React, { useEffect, useState } from 'react'
import axios from "axios";
import Select from 'react-select';

const DeleteProduct = ({ shopName }) => {

    const [selPName, setSelPName] = useState({});
    const [pName, setPName] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(0);
    const [prodList, setProdsList] = useState([]);

    // let shopName = "Variety";


    useEffect(() => {
        async function getprodlist() {
            const response = await axios.get(`http://localhost:5050/products/getproductlist/${shopName}`);
            if (response.status === 200) {
                let nProds = [
                    // { value: '', label: 'Select Product Name', isFixed: true },
                    ...response.data.prods.map(prod => { return { value: prod, label: prod } })
                ];
                setProdsList(nProds);
                console.log("prods " + JSON.stringify(response.data.prods));
            }
        }
        getprodlist();
    }, [])

    console.log("pname " + JSON.stringify(pName), selPName);

    const handleSelect = async () => {
        const resp = await axios.get(`http://localhost:5050/products/singleproduct/${selPName.value}`);
        if (resp.data.success) {
            const product = resp.data.product;
            setPName(product.name);
            setDesc(product.desc);
            setPrice(product.price);
            setImageUrl(product.image);
        }
        else {
            alert(resp.data.message);
        }
    }

    const deleteProduct = async () => {
        const response = await axios.post(`http://localhost:5050/products/deleteproduct/${shopName}`, {
            pName: selPName.value
        });
        if (response.status === 200) {
            setProdsList(() => {
                const nProds = prodList.filter((prod) => {
                    return prod !== selPName;
                });
                return nProds
            });
            setPName("");
            setDesc("");
            setPrice("");

            alert(response.data.message);
        }
    }

    return (
        <div className="card del-prod-card m-5 w-75">
            <div className="card-header fs-4">
                <div className="search-prod mb-3">
                    <label htmlFor="productName" className="form-label m-3 fs-5">Search Product</label>
                    <div className="input-group m-0 delete-prod-inp w-50">
                        {/* <input type="text" list="products" className="form-control" id="productName" onChange={(e) => { setPName(e.target.value) }} placeholder="Search & Select Product" />
                        <datalist id="products">
                            {prodList.map((p, ind) => {
                                return <option value={p} key={ind} />
                            })}
                        </datalist> */}
                        {/* <DropDown data={prodList} name={"prods"} /> */}
                        <Select options={prodList} name="prods" className="form-control merchant-sel-inp" onChange={setSelPName} placeholder="Select Product Name" />
                        <button className="btn btn-outline-secondary h-100 btn-danger text-light" disabled={selPName.value ? false : true} type="button" onClick={() => handleSelect()} >Select</button>
                    </div>
                </div>
            </div>
            {
                pName &&
                <div className="card-body">
                    <h3 className="text-center" >Product Details</h3>
                    <div className="prod-img w-50 ms-4">
                        <img src={imageUrl !== "..." ? imageUrl : "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg"} className="object-fit-contain" alt="" />
                    </div>
                    {/* <p className="m-2 p-0" ><b className="fs-5">Product Name : </b><span className="fs-5 ms-3">Smart Watch</span></p>
                        <p className="m-2 p-0" ><b className="fs-5">Description : </b><span className="fs-5 ms-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, qui eum veritatis saepe facilis sit quis nulla iste laudantium laborum.</span><br /></p>
                        <p className="m-2 p-0" ><b className="fs-5">Price: </b><span className="fs-5 ms-3">$ 1499.00</span></p> */}

                    <table className="table mb-4">
                        <tbody>
                            <tr>
                                <th scope="row" className="fs-5" style={{ width: "28%" }} colSpan={2}>Product Name : </th>
                                <td className="fw" style={{ fontSize: "17px" }} >{pName}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="fs-5" colSpan={2}>Description : </th>
                                <td className="fw" style={{ fontSize: "17px" }} >{desc}</td>
                            </tr>
                            <tr>
                                <th scope="row" className="fs-5" colSpan={2}>Price: </th>
                                <td className="fw" style={{ fontSize: "17px" }} >$ {price}</td>
                            </tr>
                        </tbody>
                    </table>


                    <button href="#" className="btn btn-danger px-5" disabled={selPName.value ? false : true} onClick={() => { deleteProduct() }}>
                        Delete
                    </button>
                </div>
            }
        </div>
    )
}

export default DeleteProduct
