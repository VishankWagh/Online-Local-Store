import { useEffect, useState } from "react";
import "../styles/OrderHist.css";
import axios from "axios";

function OrderHist() {

    const [pendOrderList, setPendOrderList] = useState();
    const [orderList, setOrderList] = useState();

    useEffect(() => {
        async function fetchOrders() {
            const response = await axios.get(`http://localhost:5050/orders/getordersbyname/${"Vishank Wagh"}`)
            const pendord = response.data.orderList.filter((ord) => ord.status === "pending");
            const ord = response.data.orderList.filter((ord) => ord.status !== "pending");
            setPendOrderList(pendord);
            setOrderList(ord);
        }
        fetchOrders();
    }, [])

    //cancel order
    async function cancelOrder(ordId) {
        const response = await axios.get(`http://localhost:5050/orders/cancelorder/${ordId}`);
        console.log("cncl " + response.data.message);
        // setOrderCanceled(true);
        // setPlcordTxt("PLACE ORDER");
    }
    let ordNo = 0;

    return (
        <>
            <div className="ord-hist">
                <div id="plcdord">
                    <h2 className="mt-5 mb-3">Placed Order</h2>
                    <div id="ord-lst" className="row">
                        {pendOrderList?.map((ordr) => {
                            ordNo += 1;
                            return (
                                <div className="card mb-3 col-6" id="ord">
                                    <div className="card-header">Order {ordNo} - <b>{ordr.shopName}</b></div>
                                    <div className="card-body">
                                        <table className="ord-tbl">
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Product Qty</th>
                                                <th>Product Price</th>
                                            </tr>
                                            <tr>
                                                <td>potato</td>
                                                <td>3</td>
                                                <td>&#8377; 30</td>
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
                                                <td>&#8377; 3</td>
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
                {ordNo = 0}
                <div id="deldord">
                    <h2 className="mt-5 mb-3">Order History</h2>
                    <div id="ord-lst" className="row">
                        {orderList?.map((ord) => {
                            ordNo += 1;
                            return (
                                <div className="card mb-3 col-6" id="ord">
                                    <div className="card-header">Order {ordNo} - <b>{ord.shopName}</b></div>
                                    <div className="card-body">
                                        <table className="ord-tbl">
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Product Qty</th>
                                                <th>Product Price</th>
                                            </tr>
                                            <tr>
                                                <td>potato</td>
                                                <td>3</td>
                                                <td>&#8377; 30</td>
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
                                                <td>&#8377; 3</td>
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