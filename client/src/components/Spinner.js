import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/success.css';
import { useAuth } from '../context/auth';

const Spinner = () => {

    const [count, setCount] = useState(2);

    const navigate = useNavigate();
    const location = useLocation();

    const [auth, setAuth] = useAuth();

    toastConfig({
        theme: 'success',
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => --prev);
        }, 1000);
        const currURL = location.pathname + location.search;
        if (count === 0) {
            toast('You are not LoggedIn Please LogIn', {
                position: 'top-center'
            });
            setAuth({
                ...auth,
                user: null,
                token: ""
            });
            localStorage.removeItem("auth");
            navigate("/login", {
                state: currURL
            });
        }
        return () => clearInterval(interval);
    }, [count, navigate, location])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-success" style={{ height: "100vh" }} >
            {/* <h1 className="text-center">Your are not Logged in Please LogIn</h1>
            <h1 className="text-center">Redirecting in {count} seconds</h1> */}
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
