import React from 'react'

const CreateProduct = () => {
    return (
        <form className="m-5 col">
            <div className="mb-3">
                <label htmlFor="productName" className="form-label b">Product Name</label>
                <input type="text" className="form-control bg-body-secondary" id="productName" ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label b">Select Category</label>
                <input list="brow" className="px-3 form-control bg-body-secondary" id="category" />
                <datalist id="brow">
                    <option value="Internet Explorer" />
                    <option value="Firefox" />
                    <option value="Chrome" />
                    <option value="Opera" />
                    <option value="Safari" />
                </datalist>
            </div>
            <div className="mb-3">
                <label className="form-label b" htmlFor="productImg">Product image</label>
                <input type="file" className="form-control bg-body-secondary" id="productImg"></input>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label b">description</label>
                <textarea className="form-control bg-body-secondary" id="description"></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label b">Price</label>
                <input type="number" className="form-control bg-body-secondary" id="price" ></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default CreateProduct
