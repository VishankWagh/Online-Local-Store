import ProductCard from "../components/ProductCard";
import "../styles/Product.css"

function Product() {
    return (
        <>
            <div className="product">
                <div className="row">
                    <div className="prod-img col-6">
                        <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg" alt="" />
                    </div>
                    <div className="col-6 prod-details">
                        <div className="prod-name">
                            <h2>Smart Watch</h2>
                            <p className="shop-name">Variety Super Store</p>
                        </div>
                        <div className="prod-desc">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis doloribus ipsa sed suscipit perferendis tempora et assumenda, quas totam modi atque non voluptas dignissimos deleniti? Iure labore soluta velit illum!
                        </div>
                        <div className="prod-price">
                            <p>Rs. 200</p>
                        </div>
                        <div className="btn btn-warning addtocart">Add To Cart</div>
                    </div>
                </div>
                <hr />
                <div className="similar-prods row">
                    <ProductCard imgUrl="https://img.rawpixel.com/private/static/images/website/2022-11/rm362-01a-mockup.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=387ad550e11628f504cd68389dc84108" />
                    <ProductCard imgUrl="https://img.rawpixel.com/private/static/images/website/2022-11/rm362-01a-mockup.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=387ad550e11628f504cd68389dc84108" />
                    <ProductCard imgUrl="https://img.rawpixel.com/private/static/images/website/2022-11/rm362-01a-mockup.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=387ad550e11628f504cd68389dc84108" />
                    <ProductCard imgUrl="https://img.rawpixel.com/private/static/images/website/2022-11/rm362-01a-mockup.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=387ad550e11628f504cd68389dc84108" />
                    <ProductCard imgUrl="https://img.rawpixel.com/private/static/images/website/2022-11/rm362-01a-mockup.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=387ad550e11628f504cd68389dc84108" />
                    <ProductCard imgUrl="https://img.rawpixel.com/private/static/images/website/2022-11/rm362-01a-mockup.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=387ad550e11628f504cd68389dc84108" />
                </div>
            </div>
        </>
    );
}

export default Product;