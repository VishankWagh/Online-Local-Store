import '../styles/Home.css'
// import { colourOptions } from '../data';
import DropDown from '../components/DropDown';
import ShopCard from '../components/ShopCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cart from '../components/Cart';

function Home() {
    document.title = "Quik-Buy | Home";

    const [shopList, setShopList] = useState([]);
    const [nshopList, setNShopList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState({
        area: "",
        catg: ""
    });
    const [shop_Cart, setShop_Cart] = useState(JSON.parse(localStorage.getItem("shopCart")));

    useEffect(() => {

        // console.log("use ");
        async function fetchShopList() {
            const pincode = 432001;
            const response = await axios.get('http://localhost:5050/shops/shoplistbypincode/396001');
            // const response = await axios.get('http://localhost:5050/shops/shoplistbyarea/tithal');
            const shopLs = await response.data.shopList;
            const catgs = await response.data.categories;
            console.log(JSON.stringify(catgs));
            setShopList(shopLs);
            setNShopList(shopLs);
            setCategories(catgs);
        }
        fetchShopList();
        // return;
    }, []);

    // let area = [
    //     { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    //     { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    //     { value: 'purple', label: 'Purple', color: '#5243AA' },
    //     { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    //     { value: 'orange', label: 'Orange', color: '#FF8B00' },
    //     { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    //     { value: 'green', label: 'Green', color: '#36B37E' },
    //     { value: 'forest', label: 'Forest', color: '#00875A' },
    //     { value: 'slate', label: 'Slate', color: '#253858' },
    //     { value: 'silver', label: 'Silver', color: '#666666' },
    // ];

    let areaLs = [
        { value: "", label: 'Select Area', isFixed: true },
        { value: 'halar', label: 'Halar' },
        { value: 'tithal', label: 'tithal' },
        { value: 'nanakvada', label: 'Nanakvada' },
        { value: 'Kamla-Nagar', label: 'Kamla-Nagar' },
        { value: 'Chandni-Chowk', label: 'Chandni-Chowk' }
    ];
    // https://cloud.mongodb.com/v2/6436e4ddfc447b15f06aeafa#/clusters

    let category = [
        { value: '', label: 'Select Category', isFixed: true },
        ...categories.map(cat => { return { value: cat.name, label: cat.name } })
    ];

    function updateSearched(srch, name) {
        const area = filter.area;
        const catg = filter.catg;
        // // console.log("updsrchd " + srch);
        // // console.log("shplstu " + JSON.stringify(shopList));
        if (name == "") {
            // console.log("nn");
            setNShopList(shopList)
            if (srch == "area") {
                setFilter(p => { return { ...p, area: name } })

                if (filter.catg == "") setNShopList(shopList)
                else {
                    setNShopList(shopList.filter((shp) => {
                        return shp.categories.includes(filter.catg);
                    }))
                }
            }
            else if (srch == "category") {
                setFilter(p => { return { ...p, catg: name } })

                if (filter.area == "") setNShopList(shopList)
                else {
                    setNShopList(shopList.filter((shp) => {
                        return (shp.area == filter.area);
                    }))
                }
            }

            // // console.log("nn");
            // if (area + catg === "") {
            //     // console.log("b nn");
            //     setNShopList(shopList)
            // }
            // else if (filter.area === "" && filter.catg !== "") {
            //     // console.log("a nn");
            //     // console.log("if catg " + filter.catg);
            // setNShopList(shopList.filter((shp) => {
            //     return shp.categories.includes(catg);
            // }))
            // }
            // else if (filter.area !== "" && filter.catg === "") {
            //     // console.log("c nn");
            //     // console.log("if area " + filter.area);
            //     setNShopList(shopList.filter((shp) => {
            //         return (shp.area == area);
            //     }))
            // }
        }
        else if (srch == "area") {
            // console.log("catg " + (filter.catg === ""));
            setFilter(p => { return { ...p, area: name } })

            let nshp = shopList.filter((shop) => {
                return shop.area == name;
            })
            if (filter.catg !== "") {
                nshp = nshp.filter((shp) => {
                    return shp.categories.includes(filter.catg);
                });
            }
            // console.log("nshp " + JSON.stringify(nshp));
            setNShopList(nshp);
        }
        else if (srch == "category") {
            // console.log("area " + filter.area);
            setFilter(p => { return { ...p, catg: name } })

            let nshp = shopList.filter((shop) => {
                return shop.categories.includes(name);
            })
            if (filter.area !== "") {
                nshp = nshp.filter((shp) => {
                    return (shp.area == filter.area);
                });
            }
            // console.log("nshpc " + JSON.stringify(nshp));
            setNShopList(nshp);
        }
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

    const shopImgArr =
        [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCatveyiU5Ji4sQjTCydq-Cs0H-49jsK0EbQ&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHXsjiZGfBkq3fdal8BYjQRkLwNVKx3hCnEA&usqp=CAU',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRa-uc1ljm3iuPu5fq4zOK_KTXT9jxOQJitrAEPvxsQ0ybxB0972ZaxfenGQpGJ564Ygg&usqp=CAU',
            'https://5.imimg.com/data5/HR/BA/WN/SELLER-13309345/shop-name-board.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGydmvCaRm32-wk_A8MzX6J1tVRtLc20CS1bRupC0Cu3_Br_2KZg3UIxRx7WT7ycWTGc&usqp=CAU',
            'https://c4.wallpaperflare.com/wallpaper/805/668/874/lofi-neon-coffee-house-shop-neon-glow-hd-wallpaper-preview.jpg'
        ]

    return (
        <>
            <div className="home">

                <div id="carouselExampleIndicators" className="carousel slide carousel-bx">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/top-view-black-friday-decoration-concept-with-gift-box-shopping-cart-shopping-bag-dark-background-shopping-concept-boxing-day-black-friday-composition_53476-6274.jpg')" }}>
                            <div className="bg">
                                <div className="home-txt">
                                    Welcome to Quik-Buy
                                </div>
                                <div className="home-desc">
                                    <span className="dbl-quote">"</span>
                                    Discover the joy of finding exactly what you're looking for.
                                    <span className="dbl-quote">"</span>
                                </div>
                            </div>
                            {/* <img src="https://themeforest.img.customer.envatousercontent.com/files/424116306/01_preview.png?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=300&s=29e3059c07d9c39ff6eb3d63e3c52395" className="d-block w-100" alt="..." /> */}
                        </div>
                        <div className="carousel-item" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/front-view-cyber-monday-shopping-cart-with-bags-copy-space_23-2148657638.jpg?w=1380&t=st=1689565890~exp=1689566490~hmac=850f8ef733898efd555a555b28232d9f893f4887ee458e81de908a5e33a9734a')" }}>
                            <div className="bg">

                                <div className="home-txt">
                                    Find your known and trusted local shops with ease
                                </div>
                                <div className="home-desc">
                                    <span className="dbl-quote">"</span>

                                    Elevate your shopping experience and redefine your style.
                                    <span className="dbl-quote">"</span>

                                </div>
                            </div>
                            {/* <img src="https://themeforest.img.customer.envatousercontent.com/files/424116306/01_preview.png?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=300&s=29e3059c07d9c39ff6eb3d63e3c52395" className="d-block w-100" alt="..." /> */}
                        </div>4
                        <div className="carousel-item" style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fw800/background/20230624/pngtree-online-e-commerce-store-in-sleek-3d-black-design-image_3661423.png ')" }}>
                            <div className="bg">

                                <div className="home-txt">
                                    Order products from desired shop in your area
                                </div>
                                <div className="home-desc">
                                    <span className="dbl-quote">"</span>

                                    Shop with us and indulge in the luxury of choice and convenience
                                    <span className="dbl-quote">"</span>

                                </div>
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

                <div className="content">

                    <Cart shopCart={shop_Cart} deleteCartItem={deleteCartItem} incdecQty={incdecQty} />
                    <div className="drop-downs d-flex">
                        <DropDown data={areaLs} updSrchd={updateSearched} name={"area"} />
                        <DropDown data={category} updSrchd={updateSearched} name={"category"} />
                        {/* <DropDown data={area} /> */}
                    </div>
                    <h3 className="title">Find Your Desired Shop...</h3>
                    <div className="shops d-flex container row">
                        {nshopList.map((shop, index) => {
                            return (
                                <div className="shop-comp mr-1 mb-5 col-3" key={index}>
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src={shopImgArr[index]} className="card-img-top home-shpimg" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title mb-3 fs-3">{shop.shopName}</h5>
                                            <span className="details">{shop.area} - {shop.pincode}</span>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            {/* <li className="list-group-item">Area: {shop.area}</li> */}
                                            {/* <li className="list-group-item">Owner: {shop.ownerName}</li> */}
                                            {/* <li className="list-group-item">Pincode: {shop.pincode}</li> */}
                                        </ul>
                                        <div className="ratings line">Rating: <span>&#9733; &#9733; &#9733; &#9733; &#9734;</span></div>
                                        <p className="own line">
                                            <span className="ownedby">Owned By - </span>
                                            <span className="ownername">{shop.ownerName}</span>
                                        </p>
                                        <div className="card-body">
                                            <a href={`/customer/shop?sname=${shop.shopName}`} className="btn btn-primary">More Details</a>
                                            {/* <a href="/" className="card-link">Another link</a> */}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        {nshopList.map((shop, index) => {
                            return (
                                <div className="shop-comp mr-1 mb-5 col-3" key={index}>
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src={shopImgArr[index]} className="card-img-top home-shpimg" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title mb-3 fs-3">{shop.shopName}</h5>
                                            <span className="details">{shop.area} - {shop.pincode}</span>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            {/* <li className="list-group-item">Area: {shop.area}</li> */}
                                            {/* <li className="list-group-item">Owner: {shop.ownerName}</li> */}
                                            {/* <li className="list-group-item">Pincode: {shop.pincode}</li> */}
                                        </ul>
                                        <div className="ratings line">Rating: <span>&#9733; &#9733; &#9733; &#9733; &#9734;</span></div>
                                        <p className="own line">
                                            <span className="ownedby">Owned By - </span>
                                            <span className="ownername">{shop.ownerName}</span>
                                        </p>
                                        <div className="card-body">
                                            <a href={`/shop?sname=${shop.shopName}`} className="btn btn-primary">More Details</a>
                                            {/* <a href="/" className="card-link">Another link</a> */}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {nshopList.length ? <button type="button" className="btn load-more">Load More...</button> : "No Products Here"}
                </div>
            </div>
        </>
    );
}

export default Home;