import '../styles/Home.css'
// import { colourOptions } from '../data';
import DropDown from '../components/DropDown';
import ShopCard from '../components/ShopCard';

function Home() {

    let area = [
        { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
        { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
        { value: 'purple', label: 'Purple', color: '#5243AA' },
        { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
        { value: 'orange', label: 'Orange', color: '#FF8B00' },
        { value: 'yellow', label: 'Yellow', color: '#FFC400' },
        { value: 'green', label: 'Green', color: '#36B37E' },
        { value: 'forest', label: 'Forest', color: '#00875A' },
        { value: 'slate', label: 'Slate', color: '#253858' },
        { value: 'silver', label: 'Silver', color: '#666666' },
    ];

    return (
        <>
            <div className="home">
                <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="home-txt">
                                Welcome to Online Local store
                            </div>
                            <div className="home-desc">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam maxime a voluptates, ea neque expedita alias placeat suscipit optio.
                            </div>
                            {/* <img src="https://themeforest.img.customer.envatousercontent.com/files/424116306/01_preview.png?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=300&s=29e3059c07d9c39ff6eb3d63e3c52395" className="d-block w-100" alt="..." /> */}
                        </div>
                        <div className="carousel-item">
                            <div className="home-txt">
                                Welcome to Online Local store
                            </div>
                            <div className="home-desc">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam maxime a voluptates, ea neque expedita alias placeat suscipit optio.
                            </div>
                            {/* <img src="https://themeforest.img.customer.envatousercontent.com/files/424116306/01_preview.png?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=300&s=29e3059c07d9c39ff6eb3d63e3c52395" className="d-block w-100" alt="..." /> */}
                        </div>
                        <div className="carousel-item">
                            <div className="home-txt">
                                Welcome to Online Local store
                            </div>
                            <div className="home-desc">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam maxime a voluptates, ea neque expedita alias placeat suscipit optio.
                            </div>
                            {/* <img src="https://themeforest.img.customer.envatousercontent.com/files/424116306/01_preview.png?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=300&s=29e3059c07d9c39ff6eb3d63e3c52395" className="d-block w-100" alt="..." /> */}
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="drop-downs d-flex">
                    <DropDown data={area} />
                    <DropDown data={area} />
                    <DropDown data={area} />
                </div>
                <div className="shops d-flex container row">
                    <ShopCard />
                    <ShopCard />
                    <ShopCard />
                    <ShopCard />
                    <ShopCard />
                </div>
                <button type="button" className="btn btn-primary load-more">Load More...</button>
            </div>
        </>
    );
}

export default Home;