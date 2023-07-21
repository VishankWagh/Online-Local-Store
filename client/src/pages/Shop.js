// import car from '../images/carousel.png'
import '../styles/Shop.css'
import DropDown from '../components/DropDown';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Shop() {

    const [shop, setShop] = useState({ "_id": "648927a9384f7a5496dee3ee", "name": "Jay-Ambe", "owner": "dRaj Ahir", "categories": ["Electronics", "Stationary"], "pincode": 432001, "area": "Bhilad", "prods": ["Keyboard"] });
    const [categories, setCategories] = useState([]);
    const [ncategories, setNCategories] = useState([]);
    const [productList, setProductList] = useState([]);
    const [nproductList, setNProductList] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [shopProds, setShopProds] = useState([]);
    const [catSelected, setCatSelected] = useState(null);


    useEffect(() => {
        async function fetchShop() {
            const queryParameters = new URLSearchParams(window.location.search)
            const sname = queryParameters.get("sname")
            const response = await axios.get(`http://localhost:5050/shops/singleshop/${sname}`);
            // // console.log(JSON.stringify(response));
            const shp = await response.data;
            setShop(shp);
            setCategories(shp.categories);
            setNCategories(shp.categories);
            // // console.log("prods " + JSON.stringify(shp.prods));

            const prodLst = shp.prods;

            const { data } = await axios.post('http://localhost:5050/products/shopproducts', { prodLst });
            setProductList(data?.prodArr);
            setNProductList(data?.prodArr);

            // // console.log("prarr " + JSON.stringify(data.prodArr));
            setShopProds(prodLst);
        }
        fetchShop();
    }, [setShop])

    // // console.log("shopp " + JSON.stringify(shop));
    // // console.log("prdl " + JSON.stringify(productList));


    let product = [
        { value: 'none', label: 'Search by Product' },
        ...shopProds.map(prod => { return { value: prod, label: prod } })
    ];

    let category = [
        { value: 'none', label: 'Search by Category' },
        ...shop.categories.map(cat => { return { value: cat, label: cat } })
    ];

    function handleCartClick() {
        setIsCartOpen(!isCartOpen);
    }

    function updateSearched(srch, name) {
        if (name === "none") {
            setNProductList(productList);
            setNCategories(categories);
            setShopProds(shop.prods);
        }
        else if (srch === "product") {
            const nprd = productList.filter((prd) => {
                return prd.name === name;
            })
            // console.log("nprd " + nprd);
            setNProductList(nprd);
        }
        else if (srch === "category") {
            setCatSelected(name);
            const ncatg = categories.filter((cat) => {
                return cat === name;
            })
            // console.log("ncatg " + ncatg);
            setNCategories(ncatg);

            const nprd = productList.filter((prd) => {
                return prd.category === name;
            })
            // console.log("nprd catg " + JSON.stringify(nprd));
            setShopProds(nprd.map((p) => p.name));
        }
    }

    return (
        <>
            <div className="shop">

                {/*----- MY CART ------*/}
                <div className="cart position-fixed" id='cart'>
                    <div className="cart-head">My Cart - Variety</div>
                    <div className="cart-items">
                        {/* <div className="crt-itm d-flex">
                            <div className="p-name">Onion</div>
                            <span>X</span>
                            <div className="qty">10</div>
                            <div className="price">Rs. 40</div>
                        </div> */}
                        <table class="table cart-tbl">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Onion</td>
                                    <td>10</td>
                                    <td>Rs. 40</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Potato</td>
                                    <td>20</td>
                                    <td>Rs. 50</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Pen</td>
                                    <td>10</td>
                                    <td>Rs. 20</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/*----- END MY CART ------*/}

                <div className="shop-img">
                    {/* <img src={car} alt="" /> */}
                    <div className="shop-name"><h2>{shop.shopName}</h2></div>
                    <div className="shop-area">{shop.area}</div>
                    <div className="shop-desc">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum, nesciunt sequi error fugit et est culpa voluptates ad nulla minus?
                    </div>
                </div>
                <div className="cart-icon" onClick={() => {
                    document.getElementById("cart").style.right = isCartOpen ? "-21%" : "0";
                    setIsCartOpen(!isCartOpen);
                }}>
                    <span>{isCartOpen && "<"}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg>
                    <span>{!isCartOpen && ">"}</span>
                </div>
                <div className="content">
                    <div className="drpdwns d-flex">
                        {/* <div className="input-group mb-3 pin-code-inp">
                        <input type="text" className="form-control" placeholder="Change Pincode?" />
                        <button className="btn btn-outline-secondary btn-primary text-light" type="button">Change</button>
                    </div> */}

                        <DropDown data={product} name={"product"} updSrchd={updateSearched} />
                        <DropDown data={category} name={"category"} updSrchd={updateSearched} />
                    </div>
                    <div className="all-products">
                        {ncategories.map(catg => {
                            return (
                                <div className="category">
                                    <div className="category-name"><h3>{catg}</h3></div>
                                    <div className="products row">
                                        {nproductList?.map(prod => {
                                            return prod.category === catg ? (<ProductCard sname={shop.shopName} prod={prod} />) : (null);
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;