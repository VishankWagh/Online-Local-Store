import React, { useState } from 'react'
import axios from 'axios';
import "../styles/Register.css"
import { useAuth } from '../context/auth';
import { Link, useNavigate } from 'react-router-dom';

const DRegister = () => {

    document.title = "Quik-Buy | Delivery-Person Register";

    const [name, setName] = useState("");
    const [shopName, setShopName] = useState("Variety");
    const [email, setEmail] = useState("");
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [auth, setAuth] = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwd = document.getElementById("pswd").value;
        const cpasswd = document.getElementById("cpswd").value;
        if (passwd !== cpasswd) {
            alert("Password and Confirm Password must be same");
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/d-register`, {
                name,
                shopName,
                email,
                uname,
                password
            });
            if (response.status === 200) {
                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.token
                });
                localStorage.setItem("auth", JSON.stringify(response.data));
                alert(response.data.message);
                navigate("/deliveryperson");
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
            <h2 className="register-head">
                <span className="mx-4 fs-1 material-symbols-outlined">
                    local_shipping
                </span>
                Delivery Person Register
            </h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => { setName(e.target.value) }} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="shopName" className="form-label">Select Shop</label>
                <select className="form-select w-25 mb-3" name="shopName" value={shopName} onChange={(e) => { setShopName(e.target.value) }}>
                    <option value="Variety">Variety</option>
                    <option value="Jay-Ambe">Jay-Ambe</option>
                    <option value="Home-Harmony">Home-Harmony</option>
                    <option value="Apna-Sweets">Apna-Sweets</option>
                    <option value="Saree-Emporium">Saree-Emporium</option>
                    <option value="Cafe-Coffee-Day">Cafe-Coffee-Day</option>
                    <option value="Kala-BookStore">Kala-BookStore</option>

                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="uname" className="form-label">UserName</label>
                <input type="text" className="form-control" id="uname" value={uname} onChange={(e) => { setUname(e.target.value) }} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="pswd" className="form-label">Password</label>
                <input type="password" className="form-control" id="pswd" value={password} onChange={(e) => { setPassword(e.target.value) }} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="cpswd" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpswd" required></input>
            </div>
            {/* <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Pincode</label>
                <input type="number" className="form-control" id="exampleInputPassword1" value={} onChange={(e) =>{setName(e.target.value)}} required></input>
            </div> */}
            <button type="submit" className="btn btn-primary">Register</button>
            <p className="reglgn-txt">Already have an Account? <Link to='/login' className="btn btn-primary reg-lgnbtn">Login</Link></p>
        </form>
    </div>

}

export default DRegister
