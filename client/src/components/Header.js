import React, { useEffect } from 'react';
import logo from '../images/QBuy-logo.jpg';
import { useAuth } from '../context/auth';
import { Link } from 'react-router-dom';

const Header = () => {

    const [auth, setAuth] = useAuth();

    useEffect(() => { }, [auth]);

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
                                    <option value="Customer" onClick={() => {
                                        console.log("cust")
                                        window.location.href = "/customer-register"
                                    }}>Customer</option>
                                    <option value="Shop" onClick={() => {
                                        window.location.href = "/shop-register"
                                    }}>Shop</option>
                                    <option value="Delivery-Person" onClick={() => {
                                        window.location.href = "/deliveryperson-register"
                                    }}>Delivery-Person</option>
                                </select>
                                {/* <span className="txt signup-txt">Sign Up</span> */}
                            </span>
                        </li>
                    </>) : (<>
                        <li className="nav-item me-5 fs-5 signin-btn">
                            <a className="nav-link reglog-link" href="/login" onClick={() => { handleLogout() }} >
                                <span className="material-symbols-outlined sec-logo">
                                    power_settings_new
                                </span>
                                <span className="txt signin-txt">Sign Out</span>
                            </a>
                        </li>
                        <li className="nav-item me-4 fs-5">
                            <span className="nav-link user-profile" to="/customer-register">
                                <div className="user-logo text-uppercase">
                                    u
                                </div>
                                <div className="uname">{auth.user.uname}</div>
                            </span>
                        </li>
                    </>)}
                </ul>
            </div>
        </div>
    </nav>

}

export default Header
