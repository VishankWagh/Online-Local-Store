import React from 'react'

const UpdateProduct = () => {
    return (
        <form className="m-5 col">
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
    )
}

export default UpdateProduct
