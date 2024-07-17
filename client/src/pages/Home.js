import '../styles/Home.css'
// import { colourOptions } from '../data';
import DropDown from '../components/DropDown';
import ShopCard from '../components/ShopCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cart from '../components/Cart';
import { useAuth } from '../context/auth';

function Home() {
    document.title = "Quik-Buy | Home";

    const [shopList, setShopList] = useState([]);
    const [nshopList, setNShopList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState({
        area: "",
        catg: ""
    });
    const [shop_Cart, setShop_Cart] = useState();
    const [page, setPage] = useState(0);
    const [loadMore, setLoadMore] = useState(false);

    const [auth, setAuth] = useAuth();

    useEffect(() => {
        (async () => {
            const response = await axios.get(`https://slms-backend.vercel.app/get/visitor-count/quik-buy`);
            console.log("Visitor Count:", response.data.visitCount);
        })();
        window.scrollTo(0, 0);
        auth.user && setShop_Cart(JSON.parse(localStorage.getItem("shopCart")));
        fetchShopList(page);
        // return;
    }, [auth]);

    async function fetchShopList(page) {
        // const pincode = 432001;
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/shops/shoplistbypincode/396001/${page}`);
        // const response = await axios.get('${process.env.REACT_APP_SERVER_URL}/shops/shoplistbyarea/tithal');
        const shopLs = await response.data.shopList;
        setLoadMore(shopLs.length < 4 ? false : true);
        const catgs = await response.data.categories;
        setShopList([...shopList, ...shopLs]);
        setNShopList([...nshopList, ...shopLs]);
        setCategories([...categories, ...catgs]);
    }

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
        ...categories?.map(cat => { return { value: cat.name, label: cat.name } })
    ];

    function updateSearched(srch, name) {
        // const area = filter.area;
        // const catg = filter.catg;
        if (name === "") {
            setLoadMore(shopList.length < 4 ? false : true);
            setNShopList(shopList)
            if (srch === "area") {
                setFilter(p => { return { ...p, area: name } })

                if (filter.catg === "") setNShopList(shopList)
                else {
                    setNShopList(shopList.filter((shp) => {
                        return shp.categories.includes(filter.catg);
                    }))
                }
            }
            else if (srch === "category") {
                setFilter(p => { return { ...p, catg: name } })

                if (filter.area === "") setNShopList(shopList)
                else {
                    setNShopList(shopList.filter((shp) => {
                        return (shp.area === filter.area);
                    }))
                }
            }

            // if (area + catg === "") {
            //     setNShopList(shopList)
            // }
            // else if (filter.area === "" && filter.catg !== "") {
            // setNShopList(shopList.filter((shp) => {
            //     return shp.categories.includes(catg);
            // }))
            // }
            // else if (filter.area !== "" && filter.catg === "") {
            //     setNShopList(shopList.filter((shp) => {
            //         return (shp.area == area);
            //     }))
            // }
        }
        else if (srch === "area") {
            setFilter(p => { return { ...p, area: name } })

            let nshp = shopList.filter((shop) => {
                return shop.area === name;
            })
            if (filter.catg !== "") {
                nshp = nshp.filter((shp) => {
                    return shp.categories.includes(filter.catg);
                });
            }
            setLoadMore(nshp.length < 4 ? false : true);
            setNShopList(nshp);
        }
        else if (srch === "category") {
            setFilter(p => { return { ...p, catg: name } })

            let nshp = shopList.filter((shop) => {
                return shop.categories.includes(name);
            })
            if (filter.area !== "") {
                nshp = nshp.filter((shp) => {
                    return (shp.area === filter.area);
                });
            }
            setLoadMore(nshp.length < 4 ? false : true);
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
        if (shop_Cart[shpind].cartItems[crtind].qty > 0 || (shop_Cart[shpind].cartItems[crtind].qty === 0 && inc)) {
            let newShopCart = JSON.parse(localStorage.getItem("shopCart"));
            inc ? newShopCart[shpind].cartItems[crtind].qty += 1 : newShopCart[shpind].cartItems[crtind].qty -= 1;
            setShop_Cart(newShopCart);
            localStorage.setItem("shopCart", JSON.stringify(newShopCart));
        }
    }


    //Loadmore shops
    function loadMoreShop() {
        setPage(page + 1);
        fetchShopList(page + 1);
    }

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
                        <div className="carousel-item active" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/arrangement-black-friday-shopping-carts-with-copy-space_23-2148667047.jpg?w=1060&t=st=1693850649~exp=1693851249~hmac=d32e24095778ccade4eaf02de78daed2f1b2abeb56eb987394e9a28cfe674b1a')" }}>
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
                        </div>
                        <div className="carousel-item" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/sale-concept-with-copy-space_23-2148313074.jpg?w=1060&t=st=1693851231~exp=1693851831~hmac=6b29b3b2e502a9ae7d25a899a8ab1c351696937bb4c08e89cc7e7e5b084ddc3c')" }}>
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
                        </div>
                        <div className="carousel-item" style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/top-view-black-friday-decoration-concept-with-gift-box-shopping-cart-shopping-bag-dark-background-shopping-concept-boxing-day-black-friday-composition_53476-6274.jpg')" }}>
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
                    {/* {auth.user && <Cart shopCart={shop_Cart} deleteCartItem={deleteCartItem} incdecQty={incdecQty} />} */}
                    <div className="drop-downs d-flex">
                        <DropDown data={areaLs} updSrchd={updateSearched} name={"area"} />
                        <DropDown data={category} updSrchd={updateSearched} name={"category"} />
                        {/* <DropDown data={area} /> */}
                    </div>
                    <h3 className="title" >Find Your Desired Shop...</h3>
                    <div className="shops d-flex container row">
                        {nshopList.length <= 0 && <div className="altr-txt">No Shop in selected preferences</div>}
                        {nshopList.map((shop, index) => {
                            return (
                                <ShopCard shopDetails={shop} key={index} index={index} />
                            )
                        })}
                        {/* {nshopList.map((shop, index) => {
                            return (
                                <div className="shop-comp mr-1 mb-5 col-3" key={index}>
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src={shopImgArr[index]} className="card-img-top home-shpimg" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title mb-3 fs-3">{shop.shopName}</h5>
                                            <span className="details">{shop.area} - {shop.pincode}</span>
                                        </div>
                                        <div className="ratings line">Ratings: <span>&#9733; &#9733; &#9733; &#9733; &#9734;</span></div>
                                        <p className="own line">
                                            <span className="ownedby">Owned By - </span>
                                            <span className="ownername">{shop.ownerName}</span>
                                        </p>
                                        <div className="card-body">
                                            <Link to={`/customer/shop?sname=${shop.shopName}`} className="btn btn-primary">More Details</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })} */}
                    </div>
                    {/* No Shop in selected preferences */}
                    {(loadMore && nshopList.length > 0) && <button type="button" onClick={loadMoreShop} className="btn load-more">Load More &darr;</button>}
                </div>
            </div>
        </>
    );
}

export default Home;