import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = () => {

    const [count, setCount] = useState(3);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => --prev);
        }, 1000);

        const currURL = location.pathname + location.search;
        count === 0 && navigate("/login", {
            state: currURL
        });
        return () => clearInterval(interval);
    }, [count, navigate, location])

    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-success" style={{ height: "100vh" }} >
            <h1 className="text-center">Redirecting in {count} seconds</h1>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner
