import React from 'react'
import "../style/register.css"

/*
    name
    username
    password
    comf paswd
    pincode

*/

const CRegister = () => {
    return <div className="register">
        <form>
            <h2 className="mb-4">Customer Register</h2>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Name</label>
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
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Pincode</label>
                <input type="number" class="form-control" id="exampleInputPassword1"></input>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>

}

export default CRegister
