// import { useState } from 'react';
// import navigate from "react";
import '../styles/Login.css'

function Login() {

    document.title = "Quik-Buy | Login";

    function reg_redirect() {
        // navigate("/customer-register")

        const user = document.getElementById("user").value;
        switch (user) {
            case "c":
                window.location.href = "/customer-register";
                break;
            case "s":
                window.location.href = "/shop-register";
                break;
            case "d":
                window.location.href = "/deliveryperson-register";
                break;
            default:
                // window.location.href = "/customer-register";
                break;

        }
    }

    return (
        <>
            <div className="login">
                <form>
                    <h2 className="login-head" >
                        <span className="mx-4 fs-1 material-symbols-outlined">
                            login
                        </span>
                        Login
                    </h2>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">Select User</label>
                        <select name="user" className="form-control" id="user" >
                            <option value="c">Customer</option>
                            <option value="s">Shop Keeper</option>
                            <option value="d">Delivery - person</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="uname" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="uname" aria-describedby="emailHelp" placeholder='Enter Username' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pswd" className="form-label">Password</label>
                        <input type="password" className="form-control" id="pswd" placeholder='Enter Password' />
                    </div>
                    <button type="submit" className="btn btn-primary"><a href="/">LOGIN</a></button>
                    <p>Don't have an Account?  Please <span onClick={() => reg_redirect()} className="text-primary text-decoration-underline">Register</span></p>
                    {/* () => {
                    //         switch (document.getElementById("user").value) {
                    //             case "Customer":
                    //                 return "/customer-register";
                    //             case "Shop Keeper":
                    //                 return "/shop-register"
                    //             case "Delivery - person":
                    //                 return "/deliveryperson-register"
                    //         }
                    //         // (document.getElementById("user").value) === "Customer" &&
                    //         // "/customer-register"
                    //         //     (document.getElementById("user").value) === "Shop Keeper" &&
                    //         // "/shop-register"
                    //         //     (document.getElementById("user").value) === "Delivery - person" &&
                    //         // "/deliveryperson-register"
                    //     }
                    // }>Register</a> */}
                </form>
            </div>
        </>
    );
}

export default Login;