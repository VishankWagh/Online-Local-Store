// import car from '../images/carousel.png'
import '../styles/Shop.css'
import DropDown from '../components/DropDown';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from '../components/Cart';

function Shop() {

    const [shop, setShop] = useState({ "_id": "648927a9384f7a5496dee3ee", "name": "Jay-Ambe", "owner": "dRaj Ahir", "categories": ["Electronics", "Stationary"], "pincode": 432001, "area": "Bhilad", "prods": ["Keyboard"] });
    const [categories, setCategories] = useState([]);
    const [ncategories, setNCategories] = useState([]);
    const [productList, setProductList] = useState([]);
    const [nproductList, setNProductList] = useState([]);
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

    document.title = "Shop - " + shop.shopName;

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


    // default data if for jayambe shop
    let imgUrls = [
        [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCCAUeStWXTjkOr5M0Xbr801Fm20hrA_NP1JdpZ_Wwic7p9Lp45M4qLClGWi-ZhsL4iYU&usqp=CAU",
            "https://images.meesho.com/images/products/280527119/zorh6_512.webp",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlwB2aLXoNWylKEwZuKKRsheeCXq3as43LFA&usqp=CAU",
            "https://img.freepik.com/free-photo/man-wearing-hoodie-with-hoodie-it_188544-40017.jpg"
        ],
        [
            "https://static.vecteezy.com/system/resources/thumbnails/022/827/941/small/3d-realistic-black-t-shirt-template-free-vector.jpg",
            "https://media.istockphoto.com/id/182688952/photo/full-frame-blue-denim-jeans.jpg?s=612x612&w=0&k=20&c=iYNXVbOUICN-vA8qx-B1xfJB8FrTfSfDlk5UCNWGgI8=",
            "https://m.media-amazon.com/images/I/61jcqGkoiQS._AC_UY300_.jpg"
        ]
    ]

    const vrty = [
        [
            "https://m.media-amazon.com/images/I/618+Q58fQsL._AC_UF1000,1000_QL80_.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtaKlBbokDZmmWby5Wxr-rLqxBSDJqM4c9VA&usqp=CAU"
        ],
        [
            "https://brownliving.in/cdn/shop/products/recycled-notebooks-pack-of-6-70-gsm-paper-216-08584-rsk80ur-notebooks-notepads-brown-living-705176_800x.jpg?v=1682966800",
            "https://m.media-amazon.com/images/I/513Ew3f7ESL._AC_UF1000,1000_QL80_.jpg"
        ]
    ]

    const hmhr = [
        [
            "https://www.scfurnitureltd.co.uk/wp-content/uploads/2017/11/BOSTON-FITCH-BROWN-RH-FACING-USB.jpg",
            "https://www.ulcdn.net/images/products/121923/slide/666x363/Danton_Folding_Dining_Table_Set_Capra_Chairs_Mahogany_Finish_01_IMG_0052-M.jpg?1477555973",
            "https://media.4rgos.it/i/Argos/8470618_R_Z001A?w=750&h=440&qlt=70",
            "https://m.media-amazon.com/images/S/aplus-media-library-service-media/b9f335c7-e535-4df9-bb78-5f0732782a58.__CR0,0,970,600_PT0_SX970_V1___.jpg"
        ],
        [
            "https://media.restorationhardware.com/is/image/rhis/cat24490005-fw?wid=1000",
            "https://images.bestofbharat.com/2022/08/il_1500xN.3074781435_qutg.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtWu9Mb-bhYJUhcNuaBjZrMZwmg_Xm7VCihA&usqp=CAU",
            "https://www.ncypgarden.com/cdn/shop/products/il_fullxfull.3837944066_mxo1_1050x700.jpg?v=1651053584"
        ]
    ]

    const jayambetrad = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCCAUeStWXTjkOr5M0Xbr801Fm20hrA_NP1JdpZ_Wwic7p9Lp45M4qLClGWi-ZhsL4iYU&usqp=CAU",
        "https://images.meesho.com/images/products/280527119/zorh6_512.webp",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlwB2aLXoNWylKEwZuKKRsheeCXq3as43LFA&usqp=CAU",
        "https://img.freepik.com/free-photo/man-wearing-hoodie-with-hoodie-it_188544-40017.jpg"
    ]

    const jayambecasu = [
        "https://static.vecteezy.com/system/resources/thumbnails/022/827/941/small/3d-realistic-black-t-shirt-template-free-vector.jpg",
        "https://media.istockphoto.com/id/182688952/photo/full-frame-blue-denim-jeans.jpg?s=612x612&w=0&k=20&c=iYNXVbOUICN-vA8qx-B1xfJB8FrTfSfDlk5UCNWGgI8=",
        "https://m.media-amazon.com/images/I/61jcqGkoiQS._AC_UY300_.jpg"
    ]

    const homeharmonyfur = [
        "https://www.scfurnitureltd.co.uk/wp-content/uploads/2017/11/BOSTON-FITCH-BROWN-RH-FACING-USB.jpg",
        "https://www.ulcdn.net/images/products/121923/slide/666x363/Danton_Folding_Dining_Table_Set_Capra_Chairs_Mahogany_Finish_01_IMG_0052-M.jpg?1477555973",
        "https://media.4rgos.it/i/Argos/8470618_R_Z001A?w=750&h=440&qlt=70",
        "https://m.media-amazon.com/images/S/aplus-media-library-service-media/b9f335c7-e535-4df9-bb78-5f0732782a58.__CR0,0,970,600_PT0_SX970_V1___.jpg"
    ]

    const homeharmonydec = [
        "https://media.restorationhardware.com/is/image/rhis/cat24490005-fw?wid=1000",
        "https://images.bestofbharat.com/2022/08/il_1500xN.3074781435_qutg.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtWu9Mb-bhYJUhcNuaBjZrMZwmg_Xm7VCihA&usqp=CAU",
        "https://www.ncypgarden.com/cdn/shop/products/il_fullxfull.3837944066_mxo1_1050x700.jpg?v=1651053584"
    ]

    return (
        <>
            <div className="shop">

                <Cart />

                <div className="shop-img">
                    {/* <img src={car} alt="" /> */}
                    <div className="shop-head">
                        <div className="shop-name"><h2>{shop.shopName}</h2></div>
                        <div className="shop-ownernm">Owner: <b>{shop.ownerName}</b></div>
                        <div className="shop-area">{shop.area} - {shop.pincode}</div>
                        <div className="shp-ratings ratings">Ratings: <span>&#9733; &#9733; &#9733; &#9733; &#9734; </span></div>
                    </div>
                </div>

                <div className="content">
                    <div className="drop-downs d-flex">
                        {/* <div className="input-group mb-3 pin-code-inp">
                        <input type="text" className="form-control" placeholder="Change Pincode?" />
                        <button className="btn btn-outline-secondary btn-primary text-light" type="button">Change</button>
                    </div> */}

                        <DropDown data={product} name={"product"} updSrchd={updateSearched} />
                        <DropDown data={category} name={"category"} updSrchd={updateSearched} />
                    </div>
                    <div className="all-products">
                        {ncategories.map((catg, ind) => {
                            if (shop.shopName == "Variety") {
                                imgUrls = vrty;
                            }
                            if (shop.shopName == "Home-Harmony") {
                                imgUrls = hmhr;
                            }
                            {/* console.log("c " + catg) */ }
                            {/* imgUrls = shop.shopName == "Jay-Ambe" ? catg == "Traditionals" ? jayambetrad : jayambecasu : null
                            imgUrls = shop.shopName == "Home-Harmony" ? catg == "Furniture" ? homeharmonyfur : homeharmonydec : null */}
                            return (
                                <div className="category" key={ind}>
                                    <div className="category-name"><h3>{catg}</h3></div>
                                    <div className="products row">
                                        {nproductList?.filter((prf) => {
                                            return prf.category == catg;
                                        })
                                            .map((prod, index) => {
                                                {/* console.log(prod.name + " prd " + index) */ }
                                                return (<ProductCard key={index} sname={shop.shopName} prod={prod} imgUrl={imgUrls[ind][index]} />);
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