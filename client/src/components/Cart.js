import React, { useEffect, useState } from "react"
import "../styles/Cart.css"

function Cart() {

    const [cart, setCart] = useState();
    const [isCartOpen, setIsCartOpen] = useState(false);

    function addToCart() {

        console.log("crt " + localStorage.getItem("cart"));
    }
    // addToCart();

    useEffect(() => {
        async function fetchCart() {
            const crt = JSON.parse(localStorage.getItem("cart"));
            setCart(crt);
        }
        fetchCart();
    }, [])

    let totprice = 0;
    let pnm = "fahdnfudbnkjdbnfkjsdbn";

    return (
        <>
            <div className="cart position-fixed" id='cart'>
                <div className="cart-head">My Cart</div>
                <div className="cart-icon" onClick={() => {
                    document.getElementById("cart").style.right = isCartOpen ? "-24%" : "0";
                    setIsCartOpen(!isCartOpen);
                }}>
                    <span><b>{!isCartOpen && "<"}</b></span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg>
                    <span className="crt-qty">{cart?.length}</span>
                    <span><b>{isCartOpen && ">"}</b></span>
                </div>
                <div className="cart-items">
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
                            {cart?.map((citem, ind) => {
                                totprice += citem.price;
                                return (
                                    <tr>
                                        <th scope="row">{ind + 1}</th>
                                        <td>{citem.name}</td>
                                        <td><a href="" className="btn addqty-btn">+</a> {citem.qty} <a href="" className="btn delqty-btn">-</a></td>
                                        <td>&#8377; {citem.price}</td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <th scope="row">Total</th>
                                <td></td>
                                <td></td>
                                <td>&#8377; {totprice}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <a className="plc-ord btn" href="">Place Order</a>
            </div>
        </>
    )
}

export default Cart;