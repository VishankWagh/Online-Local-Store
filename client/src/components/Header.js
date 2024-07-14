import React, { useEffect, useState } from 'react';
import logo from '../images/QBuy-logo.jpg';
import { useAuth } from '../context/auth';
import { Link } from 'react-router-dom';
import axios from "axios";

const Header = () => {

    const [auth, setAuth] = useAuth();
    const [fullName, setFullName] = useState("fname");

    useEffect(() => {
        auth.user && (async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getname/${auth.user.uname}`);
            console.log(response);
            if (response.data.success) {
                setFullName(response.data.name);
            }
            else {
                console.log("Error", response.data.message);
            }
        })();
    }, [auth]);


    function regSelect(sel) {
        // console.log("reg " + sel);
        if (sel === "Customer") {
            window.location.href = "/customer-register";
        }
        else if (sel === "Shop") {
            window.location.href = "/shop-register";
        }
        else if (sel === "Delivery-Person") {
            window.location.href = "/deliveryperson-register";
        }
    }

    function handleLogout() {
        setAuth({
            ...auth,
            user: null,
            token: ""
        });
        localStorage.removeItem("auth");
    }

    return <nav className="navbar navbar-expand-lg p-2 position-fixed w-100 z-10" style={{ zIndex: "10" }}>
        <div className="container-fluid">
            <Link className="navbar-brand ms-5 fs-2 fw-bold logo" to="/"><img src={logo} alt="" /><span className="logo-name"> Quik-Buy</span></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {/* <li className="nav-item me-5 fs-5">
                        <a className="nav-link active" aria-current="page" href="#">Orders</a>
                    </li>*/}
                    <li className="nav-item me-5 fs-5">
                        <Link className="nav-link page-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item me-5 fs-5">
                        <Link className="nav-link page-link" to="/about">About Us</Link>
                    </li>
                    {/* {console.log("autn " + JSON.stringify(auth))} */}
                    {auth.user?.role === "Customer" &&
                        <li className="nav-item me-5 fs-5">
                            <Link className="nav-link page-link" to="/customer/orders">Orders</Link>
                        </li>
                    }
                    {auth.user?.role === "Merchant" &&
                        <li className="nav-item me-5 fs-5">
                            <Link className="nav-link page-link" to="/merchant">DashBoard</Link>
                        </li>
                    }
                    {auth.user?.role === "DeliveryPerson" &&
                        <li className="nav-item me-5 fs-5">
                            <Link className="nav-link page-link" to="/deliveryperson">DashBoard</Link>
                        </li>
                    }
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nav2">
                    {!auth.user ? (<>
                        <li className="nav-item fs-5 signin-btn">
                            <Link className="nav-link reglog-link" to="/login">
                                <span className="material-symbols-outlined sec-logo">
                                    login
                                </span>
                                <span className="txt signin-txt">Sign In</span>
                            </Link>
                        </li>
                        <li className="nav-item fs-5 signup-btn">
                            <span className="nav-link reglog-link">
                                <span className="material-symbols-outlined sec-logo">
                                    app_registration
                                </span>
                                <select className='reg-select' name="" id="" onChange={(e) => regSelect(e.target.value)}>
                                    <option value="Register as">Sign Up as</option>
                                    <option value="Customer"><Link to="/customer-register">Customer</Link></option>
                                    <option value="Shop"><Link to="/shop-register">Shop-Owner</Link></option>
                                    <option value="Delivery-Person"><Link to="/deliveryperson-register">Delivery-Person</Link></option>
                                </select>
                                {/* onClick={() => {
                                        window.location.href = "/deliveryperson-register"
                                    }} */}
                                {/* <span className="txt signup-txt">Sign Up</span> */}
                            </span>
                        </li>
                    </>) : (<>
                        <li className="nav-item me-5 fs-5 signin-btn">
                            <Link className="nav-link reglog-link" to="/login" onClick={() => { handleLogout() }} >
                                <span className="material-symbols-outlined sec-logo">
                                    power_settings_new
                                </span>
                                <span className="txt signin-txt">Sign Out</span>
                            </Link>
                        </li>
                        <li className="nav-item me-4 fs-5">
                            <Link to={`/${auth.user.role.toLowerCase()}/profile`}>
                                <span className="nav-link user-profile">
                                    <div className="user-logo text-uppercase">
                                        {fullName.slice(0, 1)}
                                    </div>
                                    <div className="uname">{fullName.split(" ")[0]}</div>
                                </span>
                            </Link>
                        </li>
                    </>)}
                </ul>
            </div>
        </div>
    </nav>

}

export default Header
