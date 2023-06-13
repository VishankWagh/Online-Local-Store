function Footer() {
    return (
        <>
            <div className="footer">
                <div className="row">
                    <div className="col-3">
                        <ul>
                            <li><a href="">About</a></li>
                            <li><a href="">About</a></li>
                            <li><a href="">About</a></li>
                            <li><a href="">About</a></li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <ul>
                            <li><a href="">About</a></li>
                            <li><a href="">About</a></li>
                            <li><a href="">About</a></li>
                            <li><a href="">About</a></li>
                        </ul>
                    </div>
                    <div className="col-6">
                        <div className="contact-ttl">Email Us</div>
                        <input type="text" name="contact" id="" />
                        <input type="button" value="Mail" className="btn btn-dark email-btn" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;