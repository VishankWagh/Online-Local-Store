import '../styles/About.css'
import tmv from '../images/tm_vishank.jpg';
import tmu from '../images/tm_ushank.jpg';

function About() {

    document.title = "About System and Team";

    return (
        <div className='about'>
            <section className="text-center container">
                <div className="row abt-content">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="abt-head">About Our System</h1>
                        <p className="lead text-body-secondary head-p">
                            <span className="quote open-q">"</span>
                            "The initiative to take the nearby local stores on the internet, to make them easily accessible by the customers through their mobiles and laptops. This project is built to facilitate the resident people by saving time in buying their daily requirements with easy by staying at home."
                            <span className="quote close-q">"</span>
                        </p>
                        <p>
                            <a href="/" className="btn abt-hmbtn mx-2">Home Page</a>
                            <a href="#" className="btn abt-cntbtn mx-2">Contact Us</a>
                        </p>
                    </div>
                </div>
            </section>
            <div className="album abt-team">
                <div className="container">

                    <h3 className="text-center team-head">Meet Our Team</h3>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <div className="col">
                            <div className="card shadow-sm">
                                <img className="bd-placeholder-img dev-img card-img-top" src={tmv} />
                                <div className="card-body">
                                    <h4>
                                        Vishank Wagh
                                    </h4>
                                    <p className="card-text">
                                        Web developer
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button type="button" className="soc-link btn btn-sm btn-outline-secondary">&#xF472; Linked-In</button>
                                            <button type="button" className="soc-link btn btn-sm btn-outline-secondary">abc@123.com</button>
                                        </div>
                                        {/* <small className="text-body-secondary">9 mins</small> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow-sm">
                                <img className="bd-placeholder-img dev-img card-img-top" src={tmu} />
                                <div className="card-body">
                                    <h4>
                                        Ushank Wagh
                                    </h4>
                                    <p className="card-text">
                                        Web developer
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button type="button" className="soc-link btn btn-sm btn-outline-secondary">&#xF472; Linked-In</button>
                                            <button type="button" className="soc-link btn btn-sm btn-outline-secondary">def@456.com</button>
                                        </div>
                                        {/* <small className="text-body-secondary">9 mins</small> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card shadow-sm">
                                <img className="bd-placeholder-img dev-img card-img-top" src="https://daniel-stefan.dev/static/b0b02cfbc8fbe8d19c51d413cc1ff598/70b5d/avatar.png" />
                                <div className="card-body">
                                    <h4>
                                        Ankit Mishra
                                    </h4>
                                    <p className="card-text">
                                        Web developer
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <button type="button" className="soc-link btn btn-sm btn-outline-secondary">&#xF472; Linked-In</button>
                                            <button type="button" className="soc-link btn btn-sm btn-outline-secondary">ghi@789.com</button>
                                        </div>
                                        {/* <small className="text-body-secondary">9 mins</small> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;