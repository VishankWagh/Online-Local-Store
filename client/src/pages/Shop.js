// import car from '../images/carousel.png'
import '../styles/Shop.css'
import DropDown from '../components/DropDown';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from '../components/Cart';
import { useAuth } from '../context/auth';

function Shop() {

    const [shop, setShop] = useState({ "_id": "648927a9384f7a5496dee3ee", "name": "Jay-Ambe", "owner": "dRaj Ahir", "categories": ["Electronics", "Stationary"], "pincode": 432001, "area": "Bhilad", "prods": ["Keyboard"] });
    const [categories, setCategories] = useState([]);
    const [ncategories, setNCategories] = useState([]);
    const [productList, setProductList] = useState([]);
    const [nproductList, setNProductList] = useState([]);
    const [shopProds, setShopProds] = useState([]);
    const [catSelected, setCatSelected] = useState(null);
    const [shop_Cart, setShop_Cart] = useState();

    const [auth, setAuth] = useAuth();

    // just for loading temporary static images. remove when upload images in db
    const [sind, setSind] = useState();
    // remove it afterwards

    // const [isCartOpen, setIsCartOpen] = useState(false);

    // let dummydata = { "_id": { "$oid": "64c2a2742f3006ed8f135171" }, "shopName": "gopal-dairy", "shopImg": "shop image", "area": "azad chowk", "pincode": { "$numberInt": "391760" }, "ownerName": "Raj thakkar", "email": "raj@gmail.com", "uname": "raj", "password": "$2b$fmsodifd10$4VHpjRdS/S3zqi0D6eJ9Du7dpGu88KwlD6vy3ukypORWmMxGbD7Ai", "categories": [], "prods": [], "id": { "$numberInt": "6" } }

    useEffect(() => {
        window.scrollTo(0, 0)
        async function fetchShop() {
            const queryParameters = new URLSearchParams(window.location.search)
            const sname = queryParameters.get("sname")
            setSind(queryParameters.get('sind'));
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/shops/singleshop/${sname}`);
            // // console.log(JSON.stringify(response));
            const shp = await response.data;
            setShop(shp);
            setCategories(shp.categories);
            setNCategories(shp.categories);
            // // console.log("prods " + JSON.stringify(shp.prods));

            const prodLst = shp.prods;

            const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/products/shopproducts`, { prodLst });
            setProductList(data?.prodArr);
            setNProductList(data?.prodArr);

            // // console.log("prarr " + JSON.stringify(data.prodArr));
            setShopProds(prodLst);
            auth?.user?.uname && setShop_Cart(JSON.parse(localStorage.getItem("shopCart")));
        }
        fetchShop(shop_Cart);
    }, [])

    document.title = "Quik-Buy | Shop - " + shop.shopName;

    // // console.log("shopp " + JSON.stringify(shop));
    // // console.log("prdl " + JSON.stringify(productList));

    const shopImgArr =
        [
            "https://img.freepik.com/premium-photo/illustration-digital-art-drawing-store-shop-market-generative-ai_35887-14371.jpg?w=1060",
            "https://img.freepik.com/free-photo/man-looking-clothes-full-shot_23-2150082889.jpg?w=1060&t=st=1693850876~exp=1693851476~hmac=376c878f2ea22041cb4a73d443c99f1abe3849e26c5490f93eb772b0c3bf347f",
            "https://img.freepik.com/premium-photo/interior-photo-ikea-damansara-malaysia-member-preview-sale_176841-43127.jpg?w=1380",
            "https://img.freepik.com/free-photo/various-cakes-supermarket-shelves-sale_627829-7332.jpg?w=1060&t=st=1693851534~exp=1693852134~hmac=33af2b66e68f63bebc2e22630ea372512ec6566f4b587b820e083db8169d6600",
            "https://img.freepik.com/free-photo/textiles-sale_1398-3775.jpg?w=900&t=st=1693851510~exp=1693852110~hmac=a2979d626d8acc92844df94b38d75fd6374c2e35649beb36ac86601ee8063960",
            "https://img.freepik.com/premium-photo/international-coffee-day-delicious-coffee-beautiful-latte-decoration-business-afternoon-tea-drinks_911849-239358.jpg",
            "https://img.freepik.com/premium-photo/photo-inside-empty-stationary-shop-photography-ai-generated_925376-7269.jpg?w=1060"
        ]


    let product = [
        { value: 'none', label: 'Search by Product' },
        ...shopProds.map(prod => { return { value: prod, label: prod } })
    ];

    let category = [
        { value: 'none', label: 'Search by Category' },
        ...shop.categories.map(cat => { return { value: cat, label: cat } })
    ];


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

    // set is cart open
    // function changeIsCartOpen(curr) {
    //     setIsCartOpen(!curr);
    // }

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
        if (shop_Cart[shpind].cartItems[crtind].qty > 0 || shop_Cart[shpind].cartItems[crtind].qty === 0 && inc) {
            let newShopCart = JSON.parse(localStorage.getItem("shopCart"));
            inc ? newShopCart[shpind].cartItems[crtind].qty += 1 : newShopCart[shpind].cartItems[crtind].qty -= 1;
            setShop_Cart(newShopCart);
            localStorage.setItem("shopCart", JSON.stringify(newShopCart));
        }
    }

    // default data is for jayambe shop
    let imgUrls = [
        // jay ambe
        [
            "https://img.freepik.com/premium-photo/indian-saris_163782-4518.jpg",
            "https://img.freepik.com/premium-photo/ethnic-kurta_670382-129073.jpg",
            "https://img.freepik.com/free-photo/men-leather-sandal-flip-flop-shoes_1203-7701.jpg?w=1060&t=st=1693847672~exp=1693848272~hmac=d1873e56175b81e8ea233e2bf75f9a1b8778adfcaeb832ab8ca43e96ca11cbc4",
            "https://img.freepik.com/free-photo/hooded-jacket-fashion-model-black-generated-by-ai_188544-34320.jpg?t=st=1693847586~exp=1693851186~hmac=711042455adaf12b32707f10ee75360a0eea700d2fce3e45df028dd70724b64c&w=1380"
        ],
        [
            "https://img.freepik.com/free-photo/blank-black-t-shirt-hanger-isolated-white-background_1409-2219.jpg?w=1060&t=st=1693848154~exp=1693848754~hmac=3ec5280b04facb3d2b48ea99560bab324347f10aa0679d8b0ff3efabc24ee564",
            "https://img.freepik.com/free-photo/blue-jeans-fabric-details_150588-40.jpg?w=1060&t=st=1693848576~exp=1693849176~hmac=63bd0b1688df3306d6f7466115caf3d435bf3da664f6a9efa655a050deaa1773",
            "https://img.freepik.com/free-photo/new-sneakers_93675-130032.jpg?w=1060&t=st=1693848619~exp=1693849219~hmac=e263c9e59c0a9e2405d5ac71a6b8b43447f7952378445ebe6c95c26c1fb038a0"
        ]
    ]

    const vrty = [
        [
            "https://img.freepik.com/free-photo/keyboard-with-neon-lights-high-angle_23-2149680226.jpg?w=1060&t=st=1693849417~exp=1693850017~hmac=dc5f0975cdb3409193752f09a198df21eb696fa427b177a4df011d822f38b62b",
            "https://images.unsplash.com/photo-1625750435936-f97e1748410b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1952&q=80"
        ],
        [
            "https://img.freepik.com/free-photo/top-view-office-stationery-with-notebook-pins_23-2148524756.jpg?w=1060&t=st=1693849667~exp=1693850267~hmac=375256b8ce66d0573d70a55813bcf134a8d4c1f91417968d7f8728bfc75c24f8",
            "https://img.freepik.com/free-photo/clipboard-template-with-business-elements_23-2147986484.jpg?w=1060&t=st=1693849804~exp=1693850404~hmac=c11ba62c8c931ce484213f8a5f43f6d45875be4b34225e257fc46c97a8916e88"
        ]
    ]

    const hmhr = [
        [
            "https://img.freepik.com/free-photo/minimal-living-room-interior-design-with-leaf-shadow-wall_53876-129802.jpg?w=1060&t=st=1693848674~exp=1693849274~hmac=2389949896c2f9e9d6ab223e4801bba38f9b9c7339412f7ae3cd6db94cf421c1",
            "https://img.freepik.com/free-psd/table-with-tablecloth-dishware-chairs_176382-803.jpg?w=740&t=st=1693848802~exp=1693849402~hmac=970ae2a692dc64ea5341cff73119be25bdb2ba043b416b36c2f529211d535c87",
            "https://img.freepik.com/free-photo/modern-small-chair-with-blue-cushion-it-room_181624-44108.jpg?w=1060&t=st=1693848907~exp=1693849507~hmac=b3f4ed0c1c8d5c3202bfde8209d8365387fc743ab0e0cfae58a53ee6f26fbf8f",
            "https://img.freepik.com/free-psd/interior-room-with-shelves-decoration_176382-526.jpg?w=900&t=st=1693848966~exp=1693849566~hmac=98bec9e0c2eda050154aa1ee2609085c569fbc8dfc16b3d37450c44a6ae37bad"
        ],
        [
            "https://img.freepik.com/free-photo/background-pillow-contemporary-elegance-furniture_1203-4867.jpg?w=1060&t=st=1693849031~exp=1693849631~hmac=8e5e31ead6bdc6f7ab2c10bcb3fab72578d1fff21d874d2c0e0c6e692293ac9c",
            "https://img.freepik.com/free-photo/front-view-photo-frames-as-interior-decor_23-2149390850.jpg?w=1060&t=st=1693849160~exp=1693849760~hmac=f96510ada6ec09ce005d4911bfad15edab56bc13c8e5940716a6bcd0e9b3aa62",
            "https://img.freepik.com/free-photo/top-view-religious-textile_23-2148630006.jpg?w=1060&t=st=1693849209~exp=1693849809~hmac=7ff0e6da52acb50e0635ed5e089b573bc30ece22a495e498dc8abcaf9d33143a",
            "https://img.freepik.com/free-photo/person-holding-cactus-plant-inside-light-bulb-white-desk-against-wooden-wall_23-2148053521.jpg?w=1060&t=st=1693849258~exp=1693849858~hmac=3c3a32dad08a0d27a8029baeedfc6e9cacf2d53d3be4f1bc16ecd3bae394de87"
        ]
    ]

    return (
        <>
            <div className="shop">

                {shop_Cart && <Cart shopCart={shop_Cart} deleteCartItem={deleteCartItem} incdecQty={incdecQty} />}
                <div className="shop-img" style={{ backgroundImage: `url("${shop.shopImg || shopImgArr[sind]}")` }}>
                    {/* <img src={car} alt="" /> */}
                    <div className="shop-head">
                        <div className="shop-name"><h2>{shop.shopName}</h2></div>
                        <div className="shop-oth-dets">
                            <div className="shop-ownernm">Owner: <b>{shop.ownerName}</b></div>
                            <div className="shop-area">{shop.area} - {shop.pincode}</div>
                            <div className="shp-ratings ratings">Ratings: <span>&#9733; &#9733; &#9733; &#9733; &#9734; </span></div>
                        </div>
                    </div>
                </div>

                <div className="content">
                    {/* <div className="input-group mb-3 pin-code-inp">
                        <input type="text" className="form-control" placeholder="Change Pincode?" />
                        <button className="btn btn-outline-secondary btn-primary text-light" type="button">Change</button>
                    </div> */}

                    <div className="drop-downs d-flex">
                        <DropDown data={product} name={"product"} updSrchd={updateSearched} />
                        <DropDown data={category} name={"category"} updSrchd={updateSearched} />
                    </div>
                    <div className="all-products">
                        {ncategories.length ? ncategories.map((catg, ind) => {
                            if (shop.shopName === "Variety") {
                                imgUrls = vrty;
                            }
                            if (shop.shopName === "Home-Harmony") {
                                imgUrls = hmhr;
                            }
                            return (
                                <div className="category" key={ind}>
                                    <div className="category" key={ind}>
                                        <div className="category-name"><h3>{catg}</h3></div>
                                        <div className="products row">
                                            {nproductList ? nproductList?.filter((prf) => {
                                                return prf.category === catg;
                                            })
                                                .map((prod, index) => {
                                                    return (<ProductCard sname={shop.shopName} prod={prod} imgUrl={imgUrls[ind][index]} addToCart={addToCart} key={index} />);
                                                }) : <p className="altr-txt">No products found under ${catg}</p>}
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <p className="altr-txt">There is no category in this Shop</p>}

                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;