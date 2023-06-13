import React from 'react'
import "../style/register.css"

const DRegister = () => {
    return <div className="register">
        <form>
            <h2 className="mb-4">Delivery Boy Register</h2>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Name</label>
                <input type="text" class="form-control" id="exampleInputPassword1"></input>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" class="form-label">Select Shop</label>
                <select class="form-select w-25 mb-3">
                    <option value="1" selected>Pending</option>
                    <option value="2">On The Way</option>
                    <option value="3">Delivered</option>
                </select>
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

export default DRegister
