import "../styles/Checkout.css"
import { useEffect, useState } from 'react';
import axios from 'axios';

function Checkout() {

    const [checkoutCart, setCheckoutCart] = useState();
    const [shopName, setShopName] = useState("Shop");
    const [subTotal, setSubTotal] = useState(0);
    const [delCharge, setDelCharge] = useState(2);
    const [plcordTxt, setPlcordTxt] = useState("PLACE ORDER");
    const [orderCanceled, setOrderCanceled] = useState(false);
    const [ordId, setOrdId] = useState(null);
    const [sind, setSind] = useState();

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

        const response = await axios.post("http://localhost:5050/orders/placeorder", {
            uname: "vis",
            address,
            pymm: "COD",
            plcordcrt: checkoutCart,
            shopName,
            subtotal: subTotal,
            delchrg: delCharge
        });
        console.log("res " + JSON.stringify(response.data.message));
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
        const response = await axios.get(`http://localhost:5050/orders/cancelorder/${ordId}`);
        console.log("cncl " + response.data.message);
        setOrderCanceled(true);
        setPlcordTxt("PLACE ORDER");
    }
    // console.log("chc " + JSON.stringify(checkoutCart));

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
                                        <textarea name="addr" placeholder="Enter your Address" id="addr" cols="70" rows="3" required></textarea>
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
                                        {checkoutCart ? checkoutCart.map((cartItem) => {
                                            return (
                                                <div className="card chkt-itm" style={{ maxWidth: "540px" }}>
                                                    <div className="row g-0">
                                                        <div className="col-md-4 chimg">
                                                            <img src="https://img.freepik.com/free-photo/man-wearing-hoodie-with-hoodie-it_188544-40017.jpg" className="img-fluid rounded-start" alt="..." />
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