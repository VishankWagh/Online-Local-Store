import React from 'react'
import "../style/register.css"

const SRegister = () => {
    return <div className="register">
        <form>
            <h2 className="mb-4">Shop Register</h2>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Shop Name</label>
                <input type="text" class="form-control" id="exampleInputPassword1"></input>
            </div>
            <div class="mb-3">
                <label class="form-label" for="inputGroupFile01">Product image</label>
                <input type="file" class="form-control bg-body-secondary" id="inputGroupFile01"></input>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Pincode</label>
                <input type="number" class="form-control" id="exampleInputPassword1"></input>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Owner Name</label>
                <input type="text" class="form-control" id="exampleInputPassword1"></input>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">UserName</label>
                <input type="text" class="form-control" id="exampleInputPassword1"></input>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1"></input>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1"></input>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>

}

export default SRegister
