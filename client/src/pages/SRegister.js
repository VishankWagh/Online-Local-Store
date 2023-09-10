import React, { useState } from 'react'
import axios from 'axios';
import "../styles/Register.css"
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const SRegister = () => {

    document.title = "Quik-Buy | Shop Register";

    const [shopName, setShopName] = useState("");
    const [shopDesc, setShopDesc] = useState("");
    // const [shopImg, setShopImg] = useState("shop image");
    const [imageUrl, setImageUrl] = useState("");
    const [area, setArea] = useState("Nanakwada");
    const [pincode, setPincode] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [email, setEmail] = useState("");
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [auth, setAuth] = useAuth();

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
                shopDesc,
                imageUrl,
                area,
                pincode,
                ownerName,
                email,
                uname,
                password,
            });
            if (response.status === 200) {
                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.token
                });
                localStorage.setItem("auth", JSON.stringify(response.data));
                alert(response.data.message);
                navigate("/merchant");
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
            {/* <div> */}

            <h2 className="register-head align-items-center">
                <span className="mx-4 fs-1 material-symbols-outlined">
                    storefront
                </span>
                Shop Register
            </h2>
            {/* </div> */}
            <div className="mb-3">
                <label htmlFor="shopName" className="form-label">Shop Name</label>
                <input type="text" className="form-control" id="shopName" value={shopName} onChange={(e) => { setShopName(e.target.value) }} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="sdescription" className="form-label">Shop description</label>
                <textarea className="form-control bg-body-secondary" id="sdescription" value={shopDesc} onChange={(e) => { setShopDesc(e.target.value) }} required></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="shopImage">Shop image</label>
                <input type="url" className="form-control bg-body-secondary" id="shopImg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="area" className="form-label">Select Shop Area</label>
                <select className="form-select w-25 mb-3" name="shopName" id="area" value={area} onChange={(e) => { setArea(e.target.value) }} required>
                    <option value="Nanakwada">Nanakwada</option>
                    <option value="Halar">Halar</option>
                    <option value="Tithal">Tithal</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="pincode" className="form-label">Pincode</label>
                <input type="number" className="form-control" id="pincode" value={pincode} onChange={(e) => { setPincode(e.target.value) }} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="ownerName" className="form-label">Owner Name</label>
                <input type="text" className="form-control" id="ownerName" value={ownerName} onChange={(e) => { setOwnerName(e.target.value) }} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">OwnerEmail</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="uname" className="form-label">UserName</label>
                <input type="text" className="form-control" id="uname" value={uname} onChange={(e) => { setUname(e.target.value) }} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" required></input>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
            <p className="reglgn-txt">Already have an Account? <a href='/login' className="btn btn-primary reg-lgnbtn">Login</a></p>
        </form>
    </div>

}

export default SRegister
