import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import '../styles/Login.css'
import { useAuth } from '../context/auth';

function Login() {

    document.title = "Quik-Buy | Login";

    const [uname, setUname] = useState("gaurav");
    const [password, setPassword] = useState("a");
    const [role, setRole] = useState("c");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const [auth, setAuth] = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function handleLoginDets(userRole) {
        setRole(userRole);
        switch (userRole) {
            case "c":
                setUname("gaurav")
                setPassword("a")
                break;
            case "s":
                setUname("emily")
                setPassword("hh")
                break;
            case "d":
                setUname("harsh")
                setPassword("dphh")
                break;
        }
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login/${role}`, {
            uname,
            password
        });

        if (response.data.success) {

            (async () => {
                const response = await axios.get(`https://slms-backend.vercel.app/get/visitor-count/quik-buy`);
                console.log("Visitor Count:", response.data.visitCount);
            })();

            setAuth({
                ...auth,
                user: response.data.user,
                token: response.data.token
            });
            localStorage.setItem("auth", JSON.stringify(response.data));
            if (role === "c") {
                navigate(location.state || "/");
            } else if (role === "s") {
                navigate("/merchant");
            } else if (role === "d") {
                navigate("/deliveryperson");
            }
        } else {
            setErrMsg(response.data.message);
        }
    }

    return (
        <>
            <div className="login">
                <form onSubmit={handleSubmit} >
                    <h2 className="login-head" >
                        <span className="mx-4 fs-1 material-symbols-outlined">
                            login
                        </span>
                        Login
                    </h2>
                    <div className="mb-3 text-center text-danger">{errMsg}</div>
                    {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
                    <p>The Username and Password are already filled. You can directly login.</p>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">Select User</label>
                        <select name="user" className="form-control" id="user" value={role} onChange={e => handleLoginDets(e.target.value)} required>
                            <option value="c">Customer</option>
                            <option value="s">Shop Keeper</option>
                            <option value="d">Delivery - person</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="uname" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="uname" value={uname} onChange={e => setUname(e.target.value)} aria-describedby="emailHelp" placeholder='Enter Username' required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pswd" className="form-label">Password</label>
                        <input type="password" className="form-control" id="pswd" value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter Password' required />
                        {/* <p className="fg-pswd" ><span className="">Forgot Password ?</span></p> */}
                    </div>
                    <button type="submit" className="mb-3 btn btn-primary" >LOGIN</button>
                    <p className="text-center" >Don't have an Account?  Please <span onClick={() => reg_redirect()} className="text-primary btn reg-btn">Register</span></p>
                </form>
            </div>
        </>
    );
}

export default Login;