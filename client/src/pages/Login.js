import '../styles/Login.css'

function Login() {
    return (
        <>
            <div className="login">
                <form>
                    <h2>Login</h2><br />
                    <div className="mb-3">
                        <label htmlFor="uname" className="form-label">User Name</label>
                        <input type="email" className="form-control" id="uname" aria-describedby="emailHelp" placeholder='Enter Username' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pswd" className="form-label">Password</label>
                        <input type="password" className="form-control" id="pswd" placeholder='Enter Password' />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
}

export default Login;