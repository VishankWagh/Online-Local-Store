import "../styles/Checkout.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from "../context/auth";

function Checkout() {

    const [checkoutCart, setCheckoutCart] = useState();
    const [shopName, setShopName] = useState("Shop");
    const [subTotal, setSubTotal] = useState(0);
    const [delCharge, setDelCharge] = useState(2);
    const [plcordTxt, setPlcordTxt] = useState("PLACE ORDER");
    const [orderCanceled, setOrderCanceled] = useState(false);
    const [ordId, setOrdId] = useState(null);
    const [sind, setSind] = useState();
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        function getChkCart() {
            const queryParameters = new URLSearchParams(window.location.search)
            let sind = queryParameters.get("sind");
            let chkitms = JSON.parse(localStorage.getItem("shopCart"));
            if (isNaN(sind)) {
                sind = chkitms.findIndex(chitms => {
                    return chitms.shopName === sind;
                });
                // console.log("sind " + sind);
            }
            // console.log("chkitms " + JSON.stringify(chkitms) + " " + sind);
            chkitms = chkitms[sind];
            setSind(sind);
            if (chkitms) {
                setCheckoutCart(chkitms.cartItems.filter((crtitm) => crtitm.qty != 0));
                setShopName(chkitms.shopName);
                setSubTotal(chkitms.cartItems?.map((chc) => chc.price * chc.qty).reduce((tot, num) => tot + num, 0));
            }
        }
        getChkCart();
    }, []);

    document.title = "Quik-Buy | Checkout to " + shopName;

    async function placeOrder() {
        // name =
        // address =
        // payment mode =
        // crt =
        // subtotal =
        // delchrg =
        // status

        if (!checkoutCart) {
            setPlcordTxt("No Items to Order")
            return;
        }

        let address = document.getElementById('addr').value;

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        let date = (dd > 9 ? dd : `0${dd}`) + '-' + (mm > 9 ? mm : `0${mm}`) + '-' + yyyy;

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders/placeorder`, {
            uname: auth.user.uname,
            address,
            pymm: "COD",
            plcordcrt: checkoutCart,
            shopName,
            subtotal: subTotal,
            delchrg: delCharge,
            date
        });
        if (response.data.success) {
            setOrdId(response.data.ordId);
            setPlcordTxt("Order Placed Successfully");
        }

        //removeing item with shopname from localstorage
        let chkitms = JSON.parse(localStorage.getItem("shopCart"));
        chkitms.splice(sind, 1);
        localStorage.setItem("shopCart", JSON.stringify(chkitms));

    }

    async function cancelOrder() {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/orders/cancelorder/${ordId}`);
        setOrderCanceled(true);
        setPlcordTxt("PLACE ORDER");
    }
    // console.log("chc " + JSON.stringify(checkoutCart));

    const imgUrls = [
        "https://img.freepik.com/free-photo/minimal-living-room-interior-design-with-leaf-shadow-wall_53876-129802.jpg?w=1060&t=st=1693848674~exp=1693849274~hmac=2389949896c2f9e9d6ab223e4801bba38f9b9c7339412f7ae3cd6db94cf421c1",
        "https://img.freepik.com/free-psd/table-with-tablecloth-dishware-chairs_176382-803.jpg?w=740&t=st=1693848802~exp=1693849402~hmac=970ae2a692dc64ea5341cff73119be25bdb2ba043b416b36c2f529211d535c87",
        "https://img.freepik.com/free-photo/modern-small-chair-with-blue-cushion-it-room_181624-44108.jpg?w=1060&t=st=1693848907~exp=1693849507~hmac=b3f4ed0c1c8d5c3202bfde8209d8365387fc743ab0e0cfae58a53ee6f26fbf8f",
        "https://img.freepik.com/free-psd/interior-room-with-shelves-decoration_176382-526.jpg?w=900&t=st=1693848966~exp=1693849566~hmac=98bec9e0c2eda050154aa1ee2609085c569fbc8dfc16b3d37450c44a6ae37bad",
        "https://img.freepik.com/free-photo/background-pillow-contemporary-elegance-furniture_1203-4867.jpg?w=1060&t=st=1693849031~exp=1693849631~hmac=8e5e31ead6bdc6f7ab2c10bcb3fab72578d1fff21d874d2c0e0c6e692293ac9c",
        "https://img.freepik.com/free-photo/front-view-photo-frames-as-interior-decor_23-2149390850.jpg?w=1060&t=st=1693849160~exp=1693849760~hmac=f96510ada6ec09ce005d4911bfad15edab56bc13c8e5940716a6bcd0e9b3aa62",
        "https://img.freepik.com/free-photo/top-view-religious-textile_23-2148630006.jpg?w=1060&t=st=1693849209~exp=1693849809~hmac=7ff0e6da52acb50e0635ed5e089b573bc30ece22a495e498dc8abcaf9d33143a",
        "https://img.freepik.com/free-photo/person-holding-cactus-plant-inside-light-bulb-white-desk-against-wooden-wall_23-2148053521.jpg?w=1060&t=st=1693849258~exp=1693849858~hmac=3c3a32dad08a0d27a8029baeedfc6e9cacf2d53d3be4f1bc16ecd3bae394de87"
    ]

    return (
        <>
            <div className="checkout">
                <div className="checkout-box">
                    <form className="row g-3">
                        <h2 className="title">Checkout</h2>
                        <div className="row">
                            <div className="col-7 shipping-details">
                                <div className="shipping-form">
                                    <h4 className="chkt-heading">Shipping Details</h4>
                                    <div className="col-12">
                                        <label htmlFor="addr" className="form-label">Address</label><br />
                                        <textarea name="addr" placeholder="Enter your Address" id="addr" cols="70" rows="2" required></textarea>
                                    </div>
                                    <div className="col-12">
                                        <p><b>Shipping Method:</b> Cash On Delivery (COD)</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="ord-sum">
                                    <h4 className="chkt-heading">Order Summary</h4>
                                    <table className="ord-tbl">
                                        <tr>
                                            <th className="ordtbl-th">Subtotal</th>
                                            <th className="ordtbl-val">&#8377; {subTotal}</th>
                                        </tr>
                                        <tr>
                                            <th className="ordtbl-th">Delivery Charges</th>
                                            <th className="ordtbl-val">&#8377; 2</th>
                                        </tr>
                                        <tr>
                                            <th className="ordtbl-th">Discount</th>
                                            <th className="ordtbl-val">&#8377; 0</th>
                                        </tr>
                                        <tr className="tot">
                                            <th className="ordtbl-th">Total</th>
                                            <th className="ordtbl-val">&#8377; {subTotal + 2 - 0}</th>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="col-5 crt-ords-details">

                                <div className="crt-sum">
                                    <h4 className="chkt-heading"><span className="ch-shpnm">{shopName}</span> - Cart Summary</h4>
                                    <div className="chitms">
                                        {checkoutCart ? checkoutCart.map((cartItem, ind) => {
                                            return (
                                                <div className="card chkt-itm" style={{ maxWidth: "540px" }}>
                                                    <div className="row g-0">
                                                        <div className="col-md-4 chimg">
                                                            <img src={cartItem.image || imgUrls[ind]} className="img-fluid rounded-start" alt="..." />
                                                        </div>
                                                        <div className="col-md-8 chdet">
                                                            <div className="card-body">
                                                                <h5 className="card-title prd-ttl">{cartItem.prodName}</h5>
                                                                <div className="card-text">
                                                                    <div className="prd-prc">&#8377; {cartItem.price}</div>
                                                                    <div className="prd-qty">{cartItem.qty} Item(s)</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : <p className="altr-txt">No Products in Cart</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <button type="button" onClick={placeOrder} className="btn btn-primary" disabled={plcordTxt == "PLACE ORDER" ? false : true}>{plcordTxt}</button>
                            {plcordTxt == "Order Placed Successfully" && <button type="button" onClick={() => {
                                cancelOrder(ordId);
                            }} className="btn btn-warning mx-2 cnclord-btn">CANCEL ORDER</button>}
                            {orderCanceled && <span className="cncltxt mx-4">Order Canceled Successfully</span>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Checkout;