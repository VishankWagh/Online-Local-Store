import React from 'react';
import logo from '../images/QBuy-logo.jpg';
import DropDown from './DropDown';

const Header = () => {

    return <nav className="navbar navbar-expand-lg p-2 position-fixed w-100 z-10" style={{ zIndex: "10" }}>
        <div className="container-fluid">
            <a className="navbar-brand ms-5 fs-2 fw-bold logo" href="/"><img src={logo} alt="" /><span className="logo-name"> Quik-Buy</span></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse pe-5" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {/* <li className="nav-item me-5 fs-5">
                        <a className="nav-link active" aria-current="page" href="#">Orders</a>
                    </li>*/}
                    <li className="nav-item me-5 fs-5">
                        <a className="nav-link page-link" href="/">Home</a>
                    </li>
                    <li className="nav-item me-5 fs-5">
                        <a className="nav-link page-link" href="/about">About Us</a>
                    </li>
                    <li className="nav-item me-5 fs-5 signin-btn">
                        <a className="nav-link reglog-link" href="/login">
                            <span class="material-symbols-outlined sec-logo">
                                login
                            </span>
                            <span className="txt signin-txt">Sign In</span>
                        </a>
                    </li>
                    <li className="nav-item me-5 fs-5 signup-btn">
                        <span className="nav-link reglog-link" href="/customer-register">
                            <span class="material-symbols-outlined sec-logo">
                                app_registration
                            </span>
                            <select className='reg-select' name="" id="">
                                <option value="Register as">Register as</option>
                                <option value="Customer" onClick={() => {
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
                </ul>
            </div>
        </div>
    </nav>

}

export default Header
