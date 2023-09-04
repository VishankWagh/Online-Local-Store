import { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { useAuth } from '../context/auth';
import axios from 'axios';

function Profile() {

    const [auth, setAuth] = useAuth();
    const [user, setUser] = useState();
    const [dupUser, setDupUser] = useState();

    document.title = "Quik-Buy | Profile";

    useEffect(() => {
        window.scrollTo(0, 0);
        async function fetchProfile() {
            const response = await axios.get(`http://localhost:5050/user/getprofile/${auth.user.uname}`)
            setUser(response.data.user);
            setDupUser(response.data.user);
        }
        fetchProfile();
    }, [auth.user])

    async function updateUser(e) {
        e.preventDefault();
        let updUser = {};
        Object.keys(user).map((key) => {
            if (user[key] !== dupUser[key]) {
                updUser[key] = user[key];
            }
            return 1;
        })
        console.log(" upu " + JSON.stringify(updUser));
        let resp;
        if (Object.keys(updUser).length) {
            resp = await axios.post("http://localhost:5050/user/updateuser/vis", updUser);
            console.log("res " + JSON.stringify(resp));
        }
        document.querySelector(".edt-p-form").style.display = "none";
    }

    return (
        <div className="profile">
            {/* <h1>Profile</h1> */}
            <div className="sec1">
                <div className="prof-1 pf-blk">
                    <div className="p-bg"></div>
                    <div className="prof-det">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                        <div className="pf-name">{user?.name}</div>
                        <div className="p-uname"><span className="at-icn">@</span> {user?.uname}</div>
                    </div>
                </div>
                <div className="prof-2 pf-blk">
                    <table class="table">
                        <h4>Profile Details</h4>
                        <tbody>
                            {/* <tr>
                                <th>

                                </th>
                            </tr> */}
                            <tr>
                                <th><span class="material-symbols-outlined">
                                    person
                                </span> Full Name</th>
                                {/* <td></td> */}
                                <td>{user?.name}</td>
                            </tr>
                            <tr>
                                <th><span class="material-symbols-outlined">
                                    mail
                                </span> Email</th>
                                {/* <td></td> */}
                                <td><i className="email">{user?.email}</i></td>
                            </tr>
                            <tr>
                                <th><span class="material-symbols-outlined">
                                    key
                                </span> Username</th>
                                {/* <td></td> */}
                                <td>{user?.uname}</td>
                            </tr>
                            <tr>
                                <th><span class="material-symbols-outlined">
                                    location_on
                                </span> Address</th>
                                {/* <td></td> */}
                                <td>{user?.address}</td>
                            </tr>
                            <tr>
                                <th><span class="material-symbols-outlined">
                                    home_pin
                                </span> Pincode</th>
                                {/* <td></td> */}
                                <td>{user?.pincode}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="edt-p-btn" onClick={(e) => { document.querySelector(".edt-p-form").style.display = "block" }}>Edit Profile</button>
                    <div className="edt-p-form">
                        <form action="" onSubmit={(e) => { updateUser(e) }}>
                            <span className="cross" onClick={(e) => { document.querySelector(".edt-p-form").style.display = "none" }}>X</span>
                            <h4><span class="material-symbols-outlined">
                                edit_note
                            </span> Edit Profile</h4>
                            <div className="pf-inp">
                                <label htmlFor="flname">Full Name</label>
                                <input type="text" name="flname" id="flname" value={user?.name} onChange={(e) => { setUser({ ...user, name: e.target.value }) }} />
                            </div>
                            <div className="pf-inp">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" id="email" value={user?.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                            </div>
                            {/* <div className="pf-inp">
                                <label htmlFor="uname">Userame</label>
                                <input type="text" name="uname" id="uname" value={user?.uname} onChange={(e) => { setUser({ ...user, uname: e.target.value }) }} />
                            </div> */}
                            <div className="pf-inp">
                                <label htmlFor="addr">Address</label>
                                <input type="text" name="addr" id="addr" value={user?.address} onChange={(e) => { setUser({ ...user, address: e.target.value }) }} />
                            </div>
                            <div className="pf-inp">
                                <label htmlFor="pincode">Pincode</label>
                                <input type="text" name="pincode" id="pincode" value={user?.pincode} onChange={(e) => { setUser({ ...user, pincode: e.target.value }) }} />
                            </div>
                            <input type="submit" value="Save" className="sv-p-btn" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;