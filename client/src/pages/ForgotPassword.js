import React from 'react'
import "../styles/ForgotPassword.css"

const ForgotPassword = () => {

    const handleSubmit = async () => {

    }

    return (
        <div className="fg-pswd-par" >
            <h4>Forgot Password</h4>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className='form-label' htmlFor="email">Enter Registered Email</label>
                    <input type="email" className='form-control' name="email" id="email" />
                </div>
                <p>Mail will be sent on the Above Email id with the instructions to Reset Your Password.</p>
                <input type="submit" value="Send" />
            </form>
        </div>
    )
}

export default ForgotPassword
