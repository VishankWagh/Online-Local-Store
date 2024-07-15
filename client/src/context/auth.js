import { useEffect, useContext, createContext, useState } from "react";
import axios from "axios";
// import Jwt from "jsonwebtoken";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    // default axios
    // axios.defaults.headers.common["Authorization"] = auth?.token;
    useEffect(() => {
        const data = localStorage.getItem("auth");

        const authConfig = async () => {
            if (data) {
                const parseData = JSON.parse(data);
                // console.log("auth " + JSON.stringify(data));

                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/loggedin`, { token: parseData.token });
                // if (response.data) {
                if (response.data.ok) {
                    setAuth(au => ({
                        ...au,
                        user: parseData.user,
                        token: parseData.token
                    }));
                } else {
                    setAuth({
                        ...auth,
                        user: null,
                        token: ""
                    });
                    localStorage.removeItem("auth");
                }
                // }
            }
        }

        authConfig();

    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };