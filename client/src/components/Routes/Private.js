import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute({ role }) {
    const [ok, setOk] = useState();
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            let res;
            if (role === "customer") {
                res = await axios.get("http://localhost:5050/auth/user-auth/customer", {
                    headers: {
                        Authorization: auth?.token
                    },
                });
            } else if (role === "merchant") {
                res = await axios.get("http://localhost:5050/auth/user-auth/merchant", {
                    headers: {
                        Authorization: auth?.token
                    },
                });
            } else if (role === "dperson") {
                res = await axios.get("http://localhost:5050/auth/user-auth/dperson", {
                    headers: {
                        Authorization: auth?.token
                    },
                });
            }
            // const res = await axios.get("http://localhost:5050/auth/user-auth/customer", {
            //     headers: {
            //         Authorization: auth?.token
            //     },
            // });
            if (res.data.ok) {
                setOk(true);
            }
            else {
                setOk(false);
            }
        }
        if (auth?.token) authCheck();
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner />
}