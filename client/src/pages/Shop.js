// import car from '../images/carousel.png'
import '../styles/Shop.css'
import DropDown from '../components/DropDown';
import ProductCard from '../components/ProductCard';

function Shop() {

    let category = [
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
            <div className="shop">
                <div className="shop-img">
                    {/* <img src={car} alt="" /> */}
                    <div className="shop-name"><h2>Variety Super Store</h2></div>
                    <div className="shop-area">Halar</div>
                    <div className="shop-desc">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum, nesciunt sequi error fugit et est culpa voluptates ad nulla minus?
                    </div>
                </div>
                <div className="drpdwns d-flex">
                    {/* <input type="number" name="" placeholder='Change Pincode?' className="pin-code-inp" /> */}
                    <div className="input-group mb-3 pin-code-inp">
                        <input type="text" className="form-control" placeholder="Change Pincode?" />
                        <button className="btn btn-outline-secondary btn-primary text-light" type="button">Change</button>
                    </div>

                    <DropDown data={category} />
                    <DropDown data={category} />
                </div>
                <div className="products row">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </>
    );
}

export default Shop;