import { useEffect, useState } from "react";
import "../styles/OrderHist.css";
import axios from "axios";
import { useAuth } from "../context/auth";

function OrderHist() {

    const [pendOrderList, setPendOrderList] = useState();
    const [orderList, setOrderList] = useState();

    const [auth, setAuth] = useAuth();

    useEffect(() => {
        async function fetchOrders() {
            // const nameRes = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user/getname/${auth.user.uname}`);
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/orders/getordersbyname/${auth.user.uname}`);
            const pendord = response.data.orderList.filter((ord) => ord.status === "pending");
            const ord = response.data.orderList.filter((ord) => ord.status !== "pending");
            setPendOrderList(pendord);
            setOrderList(ord);
        }
        fetchOrders();
    }, []);

    document.title = "Quik-Buy | Order History";

    //cancel order
    async function cancelOrder(ordId) {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/orders/cancelorder/${ordId}`);
        // setOrderCanceled(true);
        // setPlcordTxt("PLACE ORDER");
    }
    let ordNo = 0;
    let ordHistNo = 0;

    return (
        <>
            <div className="ord-hist">
                <div id="plcdord">
                    <h2 className="mt-5 mb-3">Placed Order</h2>
                    <div id="ord-lst" className="row">
                        {orderList?.length <= 0 && <div className="altr-txt">No Orders Placed Recently</div>}
                        {pendOrderList?.map((ordr) => {
                            ordNo += 1;
                            return (
                                <div className="card mb-3 col-6" id="ord">
                                    <div className="card-header">Order {ordNo} - <b>{ordr.shopName}</b><span className="ord-hist-date">Placed At : {ordr.date} | Status : {ordr.status}</span></div>
                                    <div className="card-body">
                                        <table className="ord-tbl">
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Product Qty</th>
                                                <th>Product Price</th>
                                            </tr>
                                            {ordr.products.map((prd) => {
                                                return (
                                                    <tr>
                                                        <td>{prd.prodName}</td>
                                                        <td>{prd.qty}</td>
                                                        <td>&#8377; {prd.price}</td>
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <th>Subtotal</th>
                                                <td></td>
                                                <th>&#8377; {ordr.subTotal}</th>
                                            </tr>
                                            <tr>
                                                <th>Delivery Charge</th>
                                                <td></td>
                                                <td>&#8377; {ordr.deliveryCharge}</td>
                                            </tr>
                                            <tr className="total-tr">
                                                <th>Total</th>
                                                <td></td>
                                                <th>&#8377; {ordr.subTotal + 3}</th>
                                            </tr>
                                        </table>
                                    </div>
                                    <button name="cancelOrder" id="cnclbtn" onClick={() => { cancelOrder(ordr.orderId); document.getElementById("cnclbtn").style.cursor = "not-allowed"; }} className="cnclord-btn">CANCEL ORDER</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* {ordNo = 0} */}
                <div id="deldord">
                    <h2 className="mt-5 mb-3">Order History</h2>
                    <div id="ord-lst" className="row">
                        {orderList?.length <= 0 && <div className="altr-txt">No Orders in History</div>}

                        {orderList?.map((ord) => {
                            ordHistNo += 1;
                            return (
                                <div className="card mb-3 col-6" id="ord">
                                    <div className="card-header">Order {ordHistNo} - <b>{ord.shopName}</b><span className="ord-hist-date">Placed At : {ord.date} | Status : {ord.status}</span></div>
                                    <div className="card-body pb-4">
                                        <table className="ord-tbl">
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Product Qty</th>
                                                <th>Product Price</th>
                                            </tr>
                                            {ord.products.map((prd) => {
                                                return (
                                                    <tr>
                                                        <td>{prd.prodName}</td>
                                                        <td>{prd.qty}</td>
                                                        <td>&#8377; {prd.price}</td>
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <th>Subtotal</th>
                                                <td></td>
                                                <th>&#8377; {ord.subTotal}</th>
                                            </tr>
                                            <tr>
                                                <th>Delivery Charge</th>
                                                <td></td>
                                                <td>&#8377; {ord.deliveryCharge}</td>
                                            </tr>
                                            <tr className="total-tr">
                                                <th>Total</th>
                                                <td></td>
                                                <th>&#8377; {ord.subTotal + 3}</th>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderHist;