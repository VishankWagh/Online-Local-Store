import { useState } from "react";

function Footer() {

    const [mailBody, setMailBody] = useState("");

    return (
        <>
            <footer id="footer">
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6 foot-items">
                                <ul>
                                    <li>
                                        <h5>Quick Links</h5>
                                    </li>
                                    <li>About</li>
                                    <li>Company</li>
                                    <li>About</li>
                                    <li>Team</li>
                                    <li>FAQs</li>
                                </ul>
                            </div>
                            <div className="col-6 foot-items">
                                <ul>
                                    <li>
                                        <h5>Important Links</h5>
                                    </li>
                                    <li>Sellers</li>
                                    <li>Team</li>
                                    <li>FAQs</li>
                                    <li>Company</li>
                                    <li>About</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mail-sec">
                            <h4 className="mail">Contact Us</h4>
                            <form action="">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">E-mail Us</label>
                                    <textarea className="form-control" value={mailBody} placeholder="Enter your query here..." id="exampleFormControlTextarea1" rows="3" onChange={(e) => {
                                        setMailBody(e.target.value);
                                    }}></textarea>
                                </div>
                                {/* <input type="button" value="Send E-mail" className="btn mail-btn" /> */}
                                <a className="btn mail-btn" href={`mailto:?subject=To contact you for Subject&body=${mailBody}`}>E-Mail-Us</a>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;