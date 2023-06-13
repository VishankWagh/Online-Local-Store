import React from 'react'

const CreateProduct = () => {
    return (
        <form className="m-5 col">
            <h2 className="mb-4">Create Product</h2>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Product Name</label>
                <input type="text" class="form-control bg-body-secondary" id="exampleInputEmail1" ></input>
            </div>
            <div class="mb-3">
                <label class="form-label" for="inputGroupFile01">Product image</label>
                <input type="file" class="form-control bg-body-secondary" id="inputGroupFile01"></input>
            </div>
            <div class="mb-3">
                <label for="floatingTextarea" class="form-label">description</label>
                <textarea class="form-control bg-body-secondary" placeholder="Enter Product description" id="floatingTextarea"></textarea>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Price</label>
                <input type="number" class="form-control bg-body-secondary" id="exampleInputEmail1" ></input>
            </div>
            dropdown <br />
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default CreateProduct
