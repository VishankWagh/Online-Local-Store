import '../styles/Home.css'
// import { colourOptions } from '../data';
import DropDown from '../components/DropDown';
import ShopCard from '../components/ShopCard';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {

    const [shopList, setShopList] = useState([]);
    const [nshopList, setNShopList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState({
        area: "",
        catg: ""
    });

    useEffect(() => {

        console.log("use ");
        async function fetchShopList() {
            const pincode = 432001;
            const response = await axios.get('http://localhost:5050/shops/shoplistbypincode/432001');
            // const response = await axios.get('http://localhost:5050/shops/shoplistbyarea/tithal');
            const shopLs = await response.data.shopList;
            const catgs = await response.data.categories;
            console.log(JSON.stringify(response));
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
        { value: 'nanakvada', label: 'Nanakvada' }
    ];

    let category = [
        { value: '', label: 'Select Category', isFixed: true },
        ...categories.map(cat => { return { value: cat.name, label: cat.name } })
    ];

    function updateSearched(srch, name) {
        const area = filter.area;
        const catg = filter.catg;
        console.log("updsrchd " + srch);
        console.log("shplstu " + JSON.stringify(shopList));
        if (name == "") {
            console.log("nn");
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

            // console.log("nn");
            // if (area + catg === "") {
            //     console.log("b nn");
            //     setNShopList(shopList)
            // }
            // else if (filter.area === "" && filter.catg !== "") {
            //     console.log("a nn");
            //     console.log("if catg " + filter.catg);
            // setNShopList(shopList.filter((shp) => {
            //     return shp.categories.includes(catg);
            // }))
            // }
            // else if (filter.area !== "" && filter.catg === "") {
            //     console.log("c nn");
            //     console.log("if area " + filter.area);
            //     setNShopList(shopList.filter((shp) => {
            //         return (shp.area == area);
            //     }))
            // }
        }
        else if (srch == "area") {
            console.log("catg " + (filter.catg === ""));
            setFilter(p => { return { ...p, area: name } })

            let nshp = shopList.filter((shop) => {
                return shop.area == name;
            })
            if (filter.catg !== "") {
                nshp = nshp.filter((shp) => {
                    return shp.categories.includes(filter.catg);
                });
            }
            console.log("nshp " + JSON.stringify(nshp));
            setNShopList(nshp);
        }
        else if (srch == "category") {
            console.log("area " + filter.area);
            setFilter(p => { return { ...p, catg: name } })

            let nshp = shopList.filter((shop) => {
                return shop.categories.includes(name);
            })
            if (filter.area !== "") {
                nshp = nshp.filter((shp) => {
                    return (shp.area == filter.area);
                });
            }
            console.log("nshpc " + JSON.stringify(nshp));
            setNShopList(nshp);
        }
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
                        <div className="carousel-item active">
                            <div className="home-txt">
                                Welcome to Quik-Buy
                            </div>
                            <div className="home-desc">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam maxime a voluptates, ea neque expedita alias placeat suscipit optio.
                            </div>
                            {/* <img src="https://themeforest.img.customer.envatousercontent.com/files/424116306/01_preview.png?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=300&s=29e3059c07d9c39ff6eb3d63e3c52395" className="d-block w-100" alt="..." /> */}
                        </div>
                        <div className="carousel-item">
                            <div className="home-txt">
                                Find your known and trusted local shops with ease
                            </div>
                            <div className="home-desc">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam maxime a voluptates, ea neque expedita alias placeat suscipit optio.
                            </div>
                            {/* <img src="https://themeforest.img.customer.envatousercontent.com/files/424116306/01_preview.png?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=300&s=29e3059c07d9c39ff6eb3d63e3c52395" className="d-block w-100" alt="..." /> */}
                        </div>
                        <div className="carousel-item">
                            <div className="home-txt">
                                Order products from desired shop in your area
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

                <div className="content">
                    <div className="drop-downs d-flex">
                        <DropDown data={areaLs} updSrchd={updateSearched} name={"area"} />
                        <DropDown data={category} updSrchd={updateSearched} name={"category"} />
                        {/* <DropDown data={area} /> */}
                    </div>
                    <div className="shops d-flex container row">
                        {nshopList.map((shop) => {
                            return (
                                <div className="shop-comp mr-1 mb-5 col-3">
                                    <div className="card" style={{ width: "18rem" }}>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3n1hDUr-6ZnNqdbLgmy8-2YELpShpwq-iyA&usqp=CAU" className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{shop.shopName}</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Owner: {shop.ownerName}</li>
                                            <li className="list-group-item">Area: {shop.area}</li>
                                            <li className="list-group-item">Pincode: {shop.pincode}</li>
                                        </ul>
                                        <div className="card-body">
                                            <a href={`/shop?sname=${shop.shopName}`} className="btn btn-primary">More Details</a>
                                            {/* <a href="/" className="card-link">Another link</a> */}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        {/* <ShopCard />
                    <ShopCard />
                    <ShopCard />
                    <ShopCard />
                    <ShopCard /> */}
                    </div>
                    {nshopList.length ? <button type="button" className="btn btn-primary load-more">Load More...</button> : "No Products Here"}
                </div>
            </div>
        </>
    );
}

export default Home;