import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "../styles/Register.css"
import axios from "axios";
import "../styles/Register.css"
import { useAuth } from '../context/auth';

/*
    name
    username
    password
    comf paswd
    pincode

*/

const CRegister = () => {

    document.title = "Quik-Buy | Customer Register";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [uname, setUname] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");

    const navigate = useNavigate();

    const [auth, setAuth] = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwd = document.getElementById("passwd").value;
        const cpasswd = document.getElementById("cpasswd").value;
        if (passwd !== cpasswd) {
            alert("Password and Confirm Password must be same");
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/c-register`, {
                name,
                email,
                uname,
                password,
                address,
                pincode
            });
            if (response.data.success) {
                setAuth({
                    ...auth,
                    user: response.data.user,
                    token: response.data.token
                });
                localStorage.setItem("auth", JSON.stringify(response.data));
                alert(response.data.message);
                navigate("/");
            }
            else {
                alert("Unsuccessful Registration")
            }
        } catch (error) {
            console.error(error);
        }
    }

    return <div className="register">
        <form onSubmit={handleSubmit} className="">
            <h2 className="register-head">
                <span className="mx-4 fs-1 material-symbols-outlined">
                    account_box
                </span>
                Customer Register
            </h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" name="name" id="name" onChange={(e) => { setName(e.target.value) }} value={name} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" name="email" id="email" onChange={(e) => { setEmail(e.target.value) }} value={email} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="uname" className="form-label">UserName</label>
                <input type="text" className="form-control" name="uname" id="uname" onChange={(e) => { setUname(e.target.value) }} value={uname} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="passwd" className="form-label">Password</label>
                <input type="password" className="form-control" name="pswd" id="passwd" onChange={(e) => { setPassword(e.target.value) }} value={password} required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="cpasswd" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name="cpasswd" id="cpasswd" required></input>
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <textarea id="address" name="address" className="form-control" rows="4" cols="50" placeholder="Enter Your Address" onChange={(e) => { setAddress(e.target.value) }} value={address} required></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="pincode" className="form-label">Pincode</label>
                <input type="number" className="form-control" name="pincode" id="pincode" onChange={(e) => { setPincode(e.target.value) }} value={pincode} required></input>
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
            <p className="reglgn-txt">Already have an Account? <Link to='/login' className="btn btn-primary reg-lgnbtn">Login</Link></p>
        </form>
    </div>

}

export default CRegister
