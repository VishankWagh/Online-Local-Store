import React from 'react'
import "../styles/ForgotPassword.css"

const ResetPassword = () => {

    const handleSubmit = async () => { }

    return (
        <div className="fg-pswd-par" >
            <h4>Reset Password</h4>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className='form-label' htmlFor="pswd">New Password</label>
                    <input type="password" className='form-control' name="pswd" id="pswd" />
                </div>
                <div className="mb-3">
                    <label className='form-label' htmlFor="cpswd">Confirm Password</label>
                    <input type="password" className='form-control' name="cpswd" id="cpswd" />
                </div>
                {/* <p>Mail will be sent on the Above Email id with the instructions to Reset Your Password.</p> */}
                <input type="submit" value="RESET" />
            </form>
        </div>
    )
}

export default ResetPassword
