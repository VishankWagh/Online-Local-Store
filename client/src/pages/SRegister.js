import React, { useState } from 'react'
import axios from 'axios';
import "../styles/Register.css"

const SRegister = () => {

    const [shopName, setShopName] = useState("");
    const [shopImg, setShopImg] = useState("shop image");
    const [area, setArea] = useState("");
    const [pincode, setPincode] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [email, setEmail] = useState("");
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwd = document.getElementById("password").value;
        const cpasswd = document.getElementById("cpassword").value;
        if (passwd !== cpasswd) {
            alert("Password and Confirm Password must be same");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5050/auth/s-register", {
                shopName,
                shopImg,
                area,
                pincode,
                ownerName,
                email,
                uname,
                password,
            });
            if (response.status === 200) {
                alert(response.data.message);
            }
            else {
                alert("Unsuccessful Registration")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return <div className="register">
        <form onSubmit={handleSubmit}>
            <h2 className="mb-4">Shop Register</h2>
            <div className="mb-3">
                <label htmlFor="shopName" className="form-label">Shop Name</label>
                <input type="text" className="form-control" id="shopName" value={shopName} onChange={(e) => { setShopName(e.target.value) }} ></input>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="shopImage">Shop image</label>
                <input type="file" className="form-control bg-body-secondary" id="shopImg"></input>
            </div>
            <div className="mb-3">
                <label htmlFor="area" className="form-label">Select Shop Area</label>
                <select className="form-select w-25 mb-3" name="shopName" id="area" value={area} onChange={(e) => { setArea(e.target.value) }}>
                    <option value="pending">Pending</option>
                    <option value="on the way">On The Way</option>
                    <option value="delivered">Delivered</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="pincode" className="form-label">Pincode</label>
                <input type="number" className="form-control" id="pincode" value={pincode} onChange={(e) => { setPincode(e.target.value) }} ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="ownerName" className="form-label">Owner Name</label>
                <input type="text" className="form-control" id="ownerName" value={ownerName} onChange={(e) => { setOwnerName(e.target.value) }} ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">OwnerEmail</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="uname" className="form-label">UserName</label>
                <input type="text" className="form-control" id="uname" value={uname} onChange={(e) => { setUname(e.target.value) }} ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword"></input>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>

}

export default SRegister
