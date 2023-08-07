import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/Product.css";
import { useEffect, useState } from 'react';
import Cart from "../components/Cart";


function Product() {

    const [product, setProduct] = useState([]);
    const [similarProducts, setSimilarProducts] = useState();
    const [shopName, setShopName] = useState();
    const [shop_Cart, setShop_Cart] = useState(JSON.parse(localStorage.getItem("shopCart")));

    useEffect(() => {
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
        "https://m.media-amazon.com/images/I/618+Q58fQsL._AC_UF1000,1000_QL80_.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtaKlBbokDZmmWby5Wxr-rLqxBSDJqM4c9VA&usqp=CAU",
        "https://brownliving.in/cdn/shop/products/recycled-notebooks-pack-of-6-70-gsm-paper-216-08584-rsk80ur-notebooks-notepads-brown-living-705176_800x.jpg?v=1682966800",
        "https://m.media-amazon.com/images/I/513Ew3f7ESL._AC_UF1000,1000_QL80_.jpg",
        // variety shop end
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCCAUeStWXTjkOr5M0Xbr801Fm20hrA_NP1JdpZ_Wwic7p9Lp45M4qLClGWi-ZhsL4iYU&usqp=CAU",
        "https://images.meesho.com/images/products/280527119/zorh6_512.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlwB2aLXoNWylKEwZuKKRsheeCXq3as43LFA&usqp=CAU",
        "https://img.freepik.com/free-photo/man-wearing-hoodie-with-hoodie-it_188544-40017.jpg",
        "https://static.vecteezy.com/system/resources/thumbnails/022/827/941/small/3d-realistic-black-t-shirt-template-free-vector.jpg",
        "https://media.istockphoto.com/id/182688952/photo/full-frame-blue-denim-jeans.jpg?s=612x612&w=0&k=20&c=iYNXVbOUICN-vA8qx-B1xfJB8FrTfSfDlk5UCNWGgI8=",
        "https://m.media-amazon.com/images/I/61jcqGkoiQS._AC_UY300_.jpg",
        // jayambe shop end
        "https://www.scfurnitureltd.co.uk/wp-content/uploads/2017/11/BOSTON-FITCH-BROWN-RH-FACING-USB.jpg",
        "https://www.ulcdn.net/images/products/121923/slide/666x363/Danton_Folding_Dining_Table_Set_Capra_Chairs_Mahogany_Finish_01_IMG_0052-M.jpg?1477555973",
        "https://media.4rgos.it/i/Argos/8470618_R_Z001A?w=750&h=440&qlt=70",
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/b9f335c7-e535-4df9-bb78-5f0732782a58.__CR0,0,970,600_PT0_SX970_V1___.jpg",
        "https://media.restorationhardware.com/is/image/rhis/cat24490005-fw?wid=1000",
        "https://images.bestofbharat.com/2022/08/il_1500xN.3074781435_qutg.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtWu9Mb-bhYJUhcNuaBjZrMZwmg_Xm7VCihA&usqp=CAU",
        "https://www.ncypgarden.com/cdn/shop/products/il_fullxfull.3837944066_mxo1_1050x700.jpg?v=1651053584"
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

    let imgUrl = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCCAUeStWXTjkOr5M0Xbr801Fm20hrA_NP1JdpZ_Wwic7p9Lp45M4qLClGWi-ZhsL4iYU&usqp=CAU",
        "https://images.meesho.com/images/products/280527119/zorh6_512.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlwB2aLXoNWylKEwZuKKRsheeCXq3as43LFA&usqp=CAU",
        "https://img.freepik.com/free-photo/man-wearing-hoodie-with-hoodie-it_188544-40017.jpg"
    ];

    return (
        <>
            <div className="product">
                <Cart shopCart={shop_Cart} deleteCartItem={deleteCartItem} incdecQty={incdecQty} />
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
                        {/* <div className="prod-desc">
                            {product.desc}
                        </div> */}
                        <div className="prod-price">
                            <span className="ofr-price"><strike>&#8377; {product.price * 2}</strike></span>
                            <span className="org-price">&#8377; {product.price}</span>
                        </div>
                        <a className="btn addcartbtn" onClick={() => {
                            let citm = {
                                "prodName": product.name,
                                "qty": 1,
                                "price": product.price
                            }
                            addToCart(shopName, citm);
                        }}>Add To Cart</a>
                        <a className="btn plc-ord" href={`/customer/checkout?sind=${shopName}`}>Place Order</a>
                    </div>
                    <div className="col-12 prod-desc">
                        <p className="fs-4 fw-bold mb-3">Product Details</p>
                        {product.desc}
                        {product.desc}
                        {product.desc}
                    </div>
                </div>
                <div className="similar-prods row">
                    <div className="category-name"><h3>More from {product.category}</h3></div>
                    {similarProducts && similarProducts.map((prod, index) => {
                        {/* console.log("pro " + prod); */ }
                        return (
                            prod && <ProductCard key={index} prod={prod} sname={shopName} addToCart={addToCart} imgUrl={imgUrl[index]} />
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