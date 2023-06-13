import React from 'react'

const Header = () => {
    return <nav className="navbar navbar-expand-lg bg-body-secondary p-2 position-fixed w-100 z-10" style={{ zIndex: "10" }}>
        <div className="container-fluid">
            <a className="navbar-brand ms-5 fs-2 fw-bold logo" href="#">Online Local Store</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse pe-5" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {/* <li className="nav-item me-5 fs-5">
                        <a className="nav-link active" aria-current="page" href="#">Orders</a>
                    </li>
                    <li className="nav-item me-5 fs-5">
                        <a className="nav-link" href="#">Manage-Products</a>
                    </li> */}
                    <li className="nav-item me-5 fs-5">
                        <a className="nav-link" href="#">log In</a>
                    </li>
                    <li className="nav-item me-5 fs-5">
                        <a className="nav-link" href="#">log Out</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

}

export default Header
