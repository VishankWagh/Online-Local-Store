import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/Product.css";
import { useEffect, useState } from 'react';
import Cart from "../components/Cart";


function Product() {

    const [product, setProduct] = useState([]);
    const [similarProducts, setSimilarProducts] = useState();
    const [shopName, setShopName] = useState();

    useEffect(() => {
        async function fetchProdDetails() {
            const queryParameters = new URLSearchParams(window.location.search)
            const pname = queryParameters.get("pname");
            const sname = queryParameters.get("sname");
            setShopName(sname);

            const response = await axios.get(`http://localhost:5050/products/singleproduct/${pname}`);
            console.log("repn " + JSON.stringify(response));
            setProduct(response.data.product);
            console.log("shpName " + shopName);

            // fetch similar products
            const cname = response.data.product.category;
            console.log("sn cn " + JSON.stringify(response.data), cname);
            const res = await axios.get(`http://localhost:5050/products/similarproducts/${sname}/${cname}/${pname}`);
            setSimilarProducts(res.data.prodList);
        }

        fetchProdDetails();
    }, [shopName])
    console.log("sim " + JSON.stringify(similarProducts));

    const imgUrls = [
        "https://m.media-amazon.com/images/I/618+Q58fQsL._AC_UF1000,1000_QL80_.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtaKlBbokDZmmWby5Wxr-rLqxBSDJqM4c9VA&usqp=CAU",
        "https://brownliving.in/cdn/shop/products/recycled-notebooks-pack-of-6-70-gsm-paper-216-08584-rsk80ur-notebooks-notepads-brown-living-705176_800x.jpg?v=1682966800",
        "https://m.media-amazon.com/images/I/513Ew3f7ESL._AC_UF1000,1000_QL80_.jpg"
    ]
    let imgurl;
    if (product.name == "Keyboard") imgurl = imgUrls[0]
    else if (product.name == "Mouse") imgurl = imgUrls[1]
    else if (product.name == "Notebook") imgurl = imgUrls[2]
    else if (product.name == "Writing-Pad") imgurl = imgUrls[3]

    return (
        <>
            <div className="product">
                <Cart />
                <div className="row prod-row">
                    <div className="prod-img col-6">
                        <img src={imgurl || "https://images.bestofbharat.com/2022/08/il_1500xN.3074781435_qutg.jpg"} alt="" />
                    </div>
                    <div className="col-6 prod-details">
                        <div className="prod-name">
                            <h2>{product.name}</h2>
                            <p className="shop-name">{shopName}</p>
                            <div className="ratings">Ratings: <span>&#9733; &#9733; &#9733; &#9733; &#9734; </span></div>
                        </div>
                        <div className="prod-desc">
                            {product.desc}
                        </div>
                        <div className="prod-price">
                            <span className="ofr-price"><strike>&#8377; {product.price * 2}</strike></span>
                            <span className="org-price">&#8377; {product.price}</span>
                        </div>
                        <a className="btn addcartbtn">Add To Cart</a>
                    </div>
                </div>
                <hr />
                <div className="similar-prods row">
                    <div className="category-name"><h3>More from {product.category}</h3></div>
                    {similarProducts && similarProducts.map((prod, index) => {
                        console.log("pro " + prod);
                        return (
                            prod && <ProductCard key={index} prod={prod} sname={shopName} imgUrl="https://img.rawpixel.com/private/static/images/website/2022-11/rm362-01a-mockup.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=387ad550e11628f504cd68389dc84108" />
                        )
                    })}
                    {/* <ProductCard imgUrl="https://img.rawpixel.com/private/static/images/website/2022-11/rm362-01a-mockup.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=387ad550e11628f504cd68389dc84108" />
                    <ProductCard imgUrl="https://img.rawpixel.com/private/static/images/website/2022-11/rm362-01a-mockup.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=387ad550e11628f504cd68389dc84108" />
                    <ProductCard imgUrl="https://img.rawpixel.com/private/static/images/website/2022-11/rm362-01a-mockup.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=387ad550e11628f504cd68389dc84108" />
                    <ProductCard imgUrl="https://img.rawpixel.com/private/static/images/website/2022-11/rm362-01a-mockup.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=387ad550e11628f504cd68389dc84108" />
                    <ProductCard imgUrl="https://img.rawpixel.com/private/static/images/website/2022-11/rm362-01a-mockup.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=387ad550e11628f504cd68389dc84108" /> */}
                </div>
            </div>
        </>
    );
}

export default Product;