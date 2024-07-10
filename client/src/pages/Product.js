import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/Product.css";
import { useEffect, useState } from 'react';
import Cart from "../components/Cart";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/auth';


function Product() {

    const navigate = useNavigate();

    const [product, setProduct] = useState([]);
    const [similarProducts, setSimilarProducts] = useState();
    const [shopName, setShopName] = useState();
    const [shop_Cart, setShop_Cart] = useState(JSON.parse(localStorage.getItem("shopCart")));
    const [showReviews, setShowReviews] = useState(2);

    const [auth, setAuth] = useAuth();

    useEffect(() => {
        window.scrollTo(0, 0)
        async function fetchProdDetails() {
            const queryParameters = new URLSearchParams(window.location.search)
            const pname = queryParameters.get("pname");
            const sname = queryParameters.get("sname");
            setShopName(sname);

            const response = await axios.get(`http://localhost:5050/products/singleproduct/${pname}`);
            // console.log("repn " + JSON.stringify(response));
            setProduct(response.data.product);
            // console.log("shpName " + shopName);

            // fetch similar products
            const cname = response.data.product.category;
            // console.log("sn cn " + JSON.stringify(response.data), cname);
            const res = await axios.get(`http://localhost:5050/products/similarproducts/${sname}/${cname}/${pname}`);
            setSimilarProducts(res.data.prodList);
        }

        fetchProdDetails();
    }, [shopName])
    // console.log("sim " + JSON.stringify(similarProducts));

    document.title = "Quik-Buy | Product - " + product.name;

    const imgUrls = [
        "https://img.freepik.com/free-photo/keyboard-with-neon-lights-high-angle_23-2149680226.jpg?w=1060&t=st=1693849417~exp=1693850017~hmac=dc5f0975cdb3409193752f09a198df21eb696fa427b177a4df011d822f38b62b",
        "https://images.unsplash.com/photo-1625750435936-f97e1748410b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1952&q=80",
        "https://img.freepik.com/free-photo/top-view-office-stationery-with-notebook-pins_23-2148524756.jpg?w=1060&t=st=1693849667~exp=1693850267~hmac=375256b8ce66d0573d70a55813bcf134a8d4c1f91417968d7f8728bfc75c24f8",
        "https://img.freepik.com/free-photo/clipboard-template-with-business-elements_23-2147986484.jpg?w=1060&t=st=1693849804~exp=1693850404~hmac=c11ba62c8c931ce484213f8a5f43f6d45875be4b34225e257fc46c97a8916e88",
        // variety shop end
        "https://img.freepik.com/premium-photo/indian-saris_163782-4518.jpg",
        "https://img.freepik.com/premium-photo/ethnic-kurta_670382-129073.jpg",
        "https://img.freepik.com/free-photo/men-leather-sandal-flip-flop-shoes_1203-7701.jpg?w=1060&t=st=1693847672~exp=1693848272~hmac=d1873e56175b81e8ea233e2bf75f9a1b8778adfcaeb832ab8ca43e96ca11cbc4",
        "https://img.freepik.com/free-photo/hooded-jacket-fashion-model-black-generated-by-ai_188544-34320.jpg?t=st=1693847586~exp=1693851186~hmac=711042455adaf12b32707f10ee75360a0eea700d2fce3e45df028dd70724b64c&w=1380",
        "https://img.freepik.com/free-photo/blank-black-t-shirt-hanger-isolated-white-background_1409-2219.jpg?w=1060&t=st=1693848154~exp=1693848754~hmac=3ec5280b04facb3d2b48ea99560bab324347f10aa0679d8b0ff3efabc24ee564",
        "https://img.freepik.com/free-photo/blue-jeans-fabric-details_150588-40.jpg?w=1060&t=st=1693848576~exp=1693849176~hmac=63bd0b1688df3306d6f7466115caf3d435bf3da664f6a9efa655a050deaa1773",
        "https://img.freepik.com/free-photo/new-sneakers_93675-130032.jpg?w=1060&t=st=1693848619~exp=1693849219~hmac=e263c9e59c0a9e2405d5ac71a6b8b43447f7952378445ebe6c95c26c1fb038a0",
        // jayambe shop end
        "https://img.freepik.com/free-photo/minimal-living-room-interior-design-with-leaf-shadow-wall_53876-129802.jpg?w=1060&t=st=1693848674~exp=1693849274~hmac=2389949896c2f9e9d6ab223e4801bba38f9b9c7339412f7ae3cd6db94cf421c1",
        "https://img.freepik.com/free-psd/table-with-tablecloth-dishware-chairs_176382-803.jpg?w=740&t=st=1693848802~exp=1693849402~hmac=970ae2a692dc64ea5341cff73119be25bdb2ba043b416b36c2f529211d535c87",
        "https://img.freepik.com/free-photo/modern-small-chair-with-blue-cushion-it-room_181624-44108.jpg?w=1060&t=st=1693848907~exp=1693849507~hmac=b3f4ed0c1c8d5c3202bfde8209d8365387fc743ab0e0cfae58a53ee6f26fbf8f",
        "https://img.freepik.com/free-psd/interior-room-with-shelves-decoration_176382-526.jpg?w=900&t=st=1693848966~exp=1693849566~hmac=98bec9e0c2eda050154aa1ee2609085c569fbc8dfc16b3d37450c44a6ae37bad",
        "https://img.freepik.com/free-photo/background-pillow-contemporary-elegance-furniture_1203-4867.jpg?w=1060&t=st=1693849031~exp=1693849631~hmac=8e5e31ead6bdc6f7ab2c10bcb3fab72578d1fff21d874d2c0e0c6e692293ac9c",
        "https://img.freepik.com/free-photo/front-view-photo-frames-as-interior-decor_23-2149390850.jpg?w=1060&t=st=1693849160~exp=1693849760~hmac=f96510ada6ec09ce005d4911bfad15edab56bc13c8e5940716a6bcd0e9b3aa62",
        "https://img.freepik.com/free-photo/top-view-religious-textile_23-2148630006.jpg?w=1060&t=st=1693849209~exp=1693849809~hmac=7ff0e6da52acb50e0635ed5e089b573bc30ece22a495e498dc8abcaf9d33143a",
        "https://img.freepik.com/free-photo/person-holding-cactus-plant-inside-light-bulb-white-desk-against-wooden-wall_23-2148053521.jpg?w=1060&t=st=1693849258~exp=1693849858~hmac=3c3a32dad08a0d27a8029baeedfc6e9cacf2d53d3be4f1bc16ecd3bae394de87"
        // homeharmony shop end


    ]
    let imgurl;
    if (product.name == "Keyboard") imgurl = imgUrls[0]
    else if (product.name == "Mouse") imgurl = imgUrls[1]
    else if (product.name == "Notebook") imgurl = imgUrls[2]
    else if (product.name == "Writing-Pad") imgurl = imgUrls[3]

    switch (product.name) {
        case "Keyboard":
            imgurl = imgUrls[0]
            break;
        case "Mouse":
            imgurl = imgUrls[1]
            break;
        case "Notebook":
            imgurl = imgUrls[2]
            break;
        case "Writing-Pad":
            imgurl = imgUrls[3]
            break;
        case "Elegant-Embroidered-Sari":
            imgurl = imgUrls[4]
            break;
        case "Traditional-Kurta":
            imgurl = imgUrls[5]
            break;
        case "Ethnic-Embellished-Sandals":
            imgurl = imgUrls[6]
            break;
        case "Hooded-Sweatshirt":
            imgurl = imgUrls[7]
            break;
        case "Cotton-T-Shirt":
            imgurl = imgUrls[8]
            break;
        case "Classic-Denim-Jeans":
            imgurl = imgUrls[9]
            break;
        case "Casual-Canvas-Sneakers":
            imgurl = imgUrls[10]
            break;
        case "Mid-Century-Modern-Sofa":
            imgurl = imgUrls[11]
            break;
        case "Wooden-Dining-Table":
            imgurl = imgUrls[12]
            break;
        case "Leather-Recliner-Chair":
            imgurl = imgUrls[13]
            break;
        case "Industrial-Bookshelf":
            imgurl = imgUrls[14]
            break;
        case "Throw-Pillow":
            imgurl = imgUrls[15]
            break;
        case "Wooden-Wall-Art":
            imgurl = imgUrls[16]
            break;
        case "Modern-Geometric-Rug":
            imgurl = imgUrls[17]
            break;
        case "Glass-Terrarium-Planter":
            imgurl = imgUrls[18]
            break;
        default:
            break;
    }


    // add to cart
    function addToCart(shopName, cartItem) {
        // Check if the shopName exists in the shopCart
        // let shopCart = JSON.parse(localStorage.getItem("shopCart"));
        let shopCart = shop_Cart;
        if (shopCart.filter((shp) => { return shp.shopName === shopName }).length) {
            // Check if the cartItem exists in the shopCart
            for (let item of shopCart) {
                if (item["shopName"] === shopName) {
                    // If the cartItem exists, increment the qty property
                    let citmFndAt = -1;
                    item.cartItems.map((citm, ind) => { if (citm.prodName === cartItem.prodName) citmFndAt = ind })
                    if (citmFndAt >= 0) {
                        item.cartItems[citmFndAt].qty += 1;
                    } else {
                        // If the cartItem does not exist, push it to the array of cartItems
                        item["cartItems"].push(cartItem);
                    }
                }
            }
        } else {
            // If the shopName does not exist, push the shopName and cartItem to the shopCart array
            shopCart.push({ "shopName": shopName, "cartItems": [cartItem] })
        }
        localStorage.setItem("shopCart", JSON.stringify(shopCart));
        setShop_Cart(JSON.parse(localStorage.getItem("shopCart")))
        document.getElementById("cart").style.right = "0%";
    }

    // delete cart item
    function deleteCartItem(shopInd, cartInd) {
        let newShopCart = JSON.parse(localStorage.getItem("shopCart"));
        const cartItems = shop_Cart[shopInd].cartItems;
        if (cartItems.length === 1) {
            newShopCart.splice(shopInd, 1);
        } else {
            cartItems.splice(cartInd, 1);
            newShopCart[shopInd].cartItems = cartItems;
        }
        localStorage.setItem("shopCart", JSON.stringify(newShopCart));
        setShop_Cart(newShopCart);
    }


    // inc qty
    function incdecQty(shpind, crtind, inc) {
        if (shop_Cart[shpind].cartItems[crtind].qty > 0 || shop_Cart[shpind].cartItems[crtind].qty == 0 && inc) {
            let newShopCart = JSON.parse(localStorage.getItem("shopCart"));
            inc ? newShopCart[shpind].cartItems[crtind].qty += 1 : newShopCart[shpind].cartItems[crtind].qty -= 1;
            setShop_Cart(newShopCart);
            localStorage.setItem("shopCart", JSON.stringify(newShopCart));
        }
    }

    // ordFromProduct
    // function ordFromProduct(){
    //     let citm = {
    //         "prodName": product.name,
    //         "qty": 1,
    //         "price": product.price
    //     }
    //     addToCart(shopName, citm);
    // }

    let imgUrl = [
        "https://img.freepik.com/free-photo/minimal-living-room-interior-design-with-leaf-shadow-wall_53876-129802.jpg?w=1060&t=st=1693848674~exp=1693849274~hmac=2389949896c2f9e9d6ab223e4801bba38f9b9c7339412f7ae3cd6db94cf421c1",
        "https://img.freepik.com/free-psd/table-with-tablecloth-dishware-chairs_176382-803.jpg?w=740&t=st=1693848802~exp=1693849402~hmac=970ae2a692dc64ea5341cff73119be25bdb2ba043b416b36c2f529211d535c87",
        "https://img.freepik.com/free-photo/modern-small-chair-with-blue-cushion-it-room_181624-44108.jpg?w=1060&t=st=1693848907~exp=1693849507~hmac=b3f4ed0c1c8d5c3202bfde8209d8365387fc743ab0e0cfae58a53ee6f26fbf8f",
        "https://img.freepik.com/free-psd/interior-room-with-shelves-decoration_176382-526.jpg?w=900&t=st=1693848966~exp=1693849566~hmac=98bec9e0c2eda050154aa1ee2609085c569fbc8dfc16b3d37450c44a6ae37bad"
    ];

    let reviews = [
        {
            name: "Vishank Wagh",
            uname: "vis",
            rating: 3,
            heading: "Good",
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam cum aliquam praesentium magnam quidem ",
            date: "11-08-2023"
        },
        {
            name: "Ushank Wagh",
            uname: "usw",
            rating: 5,
            heading: "Excellent",
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam cum aliquam praesentium magnam quidem ",
            date: "13-08-2023"
        }
    ];

    function createStars(stars) {
        // console.log("str " + stars);
        return Array.from({ length: 5 }, (_, index) => {
            stars--;
            return stars >= 0 ? <span key={index}>&#9733;</span> : <span key={index}>&#9734;</span>;
        });
    }

    function getAvgRatings() {
        let avg = 0;
        let n = 0;
        product?.reviews?.map((rv) => {
            avg += rv.rating;
            n++;
        })
        // console.log("avg " + avg);
        return avg / n;
    }
    // let date = new Date();
    // console.log("date " + date.getMonth());
    async function submitReview(e) {
        e.preventDefault();
        document.querySelector(".give-rvw").style.display = "none";
        let { uname } = auth.user;
        let heading = document.getElementById("rvw-head").value;
        let rvwDesc = document.getElementById("rvw-desc").value;
        let rating = document.getElementById("rating").value;

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        let date = (dd > 9 ? dd : `0${dd}`) + '-' + (mm > 9 ? mm : `0${mm}`) + '-' + yyyy;

        await axios.get(`http://localhost:5050/user/getname/${uname}`).then(async function ({ data }) {
            let review = {
                uname,
                name: data.name,
                heading,
                review: rvwDesc,
                rating: Number(rating),
                date
            }
            setProduct(() => {
                let prdct = { ...product };
                prdct.reviews ? prdct.reviews.push(review) : prdct.reviews = [review];
                return prdct;
            });

            const rvwRes = await axios.post(`http://localhost:5050/products/addreview/${product.name}`,
                {
                    review
                })
        });

    }
    const today = new Date();
    return (
        <>
            <div className="product">
                <Cart shopCart={shop_Cart} deleteCartItem={deleteCartItem} incdecQty={incdecQty} />
                <div className="row prod-row">
                    <div className="prod-img col-6">
                        <img src={product.image || imgurl} alt="" />
                    </div>
                    <div className="col-6 prod-details">
                        <div className="prod-name">
                            <h2>{product.name}</h2>
                            <p className="shop-name">{shopName}</p>
                            <div className="ratings">Ratings: {createStars(getAvgRatings())}</div>
                        </div>
                        {/* <div className="prod-desc">
                            {product.desc}
                        </div> */}
                        <div className="prod-price">
                            <span className="ofr-price"><strike>&#8377; {(product.price * 2) || "0"}</strike></span>
                            <span className="org-price">&#8377; {product.price || "0"}</span>
                        </div>
                        <a className="btn addcartbtn" onClick={() => {
                            let citm = {
                                "prodName": product.name,
                                "qty": 1,
                                "price": product.price
                            }
                            addToCart(shopName, citm);
                        }}>Add To Cart</a>
                        <button className="btn plc-ord" onClick={() => {
                            let citm = {
                                "prodName": product.name,
                                "qty": 1,
                                "price": product.price
                            }
                            addToCart(shopName, citm);
                            navigate(`/customer/checkout?sind=${shopName}`);
                        }}>Place Order</button>
                    </div>
                    <div className="col-12 prod-desc prod-secs">
                        <div className="psec">
                            <div className="psec-head">Product Details</div>
                            <div className="psec-cntnt">{product.desc ? product.desc : <p className="altr-txt">No Product Description</p>}.</div>
                        </div>
                        <hr />
                        <div className="psec">
                            <div className="psec-head">Customer Reviews</div>
                            <div className="psec-cntnt">
                                <button className="give-rvw-btn" onClick={(e) => { document.querySelector(".give-rvw").style.display = "block" }}><span class="material-symbols-outlined">
                                    edit_note
                                </span> Give Review</button>
                                <div className="give-rvw">
                                    <form action="" onSubmit={submitReview}>
                                        <span className="cross" onClick={(e) => { document.querySelector(".give-rvw").style.display = "none" }}>X</span>
                                        <h4><span class="material-symbols-outlined">
                                            edit_note
                                        </span> Give Review</h4>
                                        <div className="rvw-inp">
                                            <label htmlFor="rvw-head">Heading: </label>
                                            <input type="text" name="rvw-head" id="rvw-head" placeholder="Enter 1-3 word for heading" required />
                                        </div>
                                        <div className="rvw-inp">
                                            <label htmlFor="rvw-desc">Review: </label>
                                            <textarea name="rvw-desc" id="rvw-desc" cols="10" rows="1" placeholder="Describe review" required></textarea>
                                            {/* <input type="text" name="rvw-desc" id="rvw-desc" placeholder="Describe review" /> */}
                                        </div>
                                        <div className="rvw-inp">
                                            <label htmlFor="rating">Ratings: </label>
                                            <input type="text" name="rating" id="rating" placeholder="Star ratings" required />
                                        </div>
                                        <p className="light-text">Enter number from 1-5 for star ratings</p>
                                        <input type="submit" value="Submit" className="sub-rvw-btn" />
                                    </form>
                                </div>
                                <div className="reviews-list">
                                    {product?.reviews ? product?.reviews.slice(0, showReviews)?.map((review) => {
                                        return (
                                            <div className="review">
                                                <div className="r-prof">
                                                    <span className="r-clogo">{review.name.slice(0, 1)}</span>
                                                    <span className="r-cname">{review.name}</span>
                                                    <span className="ratings r-rate">
                                                        {createStars(review.rating)}
                                                    </span>
                                                </div>
                                                <div className="r-cntnt">
                                                    <div className="r-head">{review.heading}</div>
                                                    <div className="r-txt">
                                                        {review.review.length > 150 ? `${review.review.slice(0, 150)}...` : review.review}
                                                    </div>
                                                    <div className="r-date">{review.date} | {(today.getMonth() + 1) - (Number(review.date.slice(3, 5)))} month(s) ago</div>
                                                </div>
                                            </div>
                                        )
                                    }) : <p className="altr-txt">Be the first to review this product...</p>}
                                </div>
                                {product?.reviews?.length > showReviews && <button onClick={() => { setShowReviews(showReviews + 2) }} className="mr-rvw-btn">Show More</button>}
                                {showReviews > 2 && <button onClick={() => { setShowReviews(2) }} className="mr-rvw-btn">Show Less</button>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="similar-prods row">
                    <div className="category-name"><h3>More from {product.category ? product.category : "this category"}</h3></div>
                    {similarProducts ? similarProducts.map((prod, index) => {
                        {/* console.log("pro " + prod); */ }
                        return (
                            prod && <ProductCard key={index} prod={prod} sname={shopName} addToCart={addToCart} imgUrl={imgUrl[index]} removeDesc={true} />
                        )
                    }) : <p className="altr-txt">No Similar products found from this category.</p>}
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