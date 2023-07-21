import React, { useState } from 'react'

const UpdateProduct = () => {

    const [searched, setSearched] = useState(true);

    return (<div className="col m-5">
        {/* {!searched ? */}

        <div className="search-prod mb-3">
            <label htmlFor="productName" className="form-label m-3 fs-5">Search Product by Name</label>
            <div className="input-group m-0  manage-cat-inp">
                <input type="text" list="products" className="form-control" id="productName" placeholder="Search Product Name" />
                <datalist id="products">
                    <option value="keyboard" />
                    <option value="Mouse" />
                    <option value="Laptop" />
                    <option value="kurta" />
                </datalist>
                <button className="btn btn-outline-secondary h-100 btn-danger text-light" type="button">Select</button>
            </div>
        </div>

        {/* : */}

        <form className="">
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Product Name</label>
                <input type="text" className="form-control bg-body-secondary" id="exampleInputEmail1" ></input>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputGroupFile01">Product image</label>
                <input type="file" className="form-control bg-body-secondary" id="inputGroupFile01"></input>
            </div>
            <div className="mb-3">
                <label htmlFor="floatingTextarea" className="form-label">description</label>
                <textarea className="form-control bg-body-secondary" placeholder="Enter Product description" id="floatingTextarea"></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
                <input type="number" className="form-control bg-body-secondary" id="exampleInputEmail1" ></input>
            </div>
            dropdown <br />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        {/* } */}
    </div>
    )
}

export default UpdateProduct
