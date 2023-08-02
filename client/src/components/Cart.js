import React, { useEffect, useState } from "react"
import "../styles/Cart.css"

function Cart({ shopCart, deleteCartItem, incdecQty }) {

    useEffect(() => {
        async function fetchCart() {
            // setShopCart(JSON.parse(localStorage.getItem("shopCart")))
            // console.log("refrsh " + props.refresh);
            // localStorage.setItem("shopCart", JSON.stringify(shopCart));

            // const crt = JSON.parse(localStorage.getItem("cart"));
            // setCart(crt);
        }
        fetchCart();
    }, [])

    let totprice = 0;
    // console.log("0 0 " + JSON.stringify(shopCart[0].cartItems[0]));
    return (
        <>
            <div className="cart position-fixed" style={{ right: "-26%" }} id='cart'>
                <div className="cart-head">My Cart</div>
                <div className="cart-icon" onClick={() => {
                    document.getElementById("cart").style.right = document.getElementById("cart").style.right == "0%" ? "-26%" : "0%";
                    // isCartOpen = !isCartOpen;
                    // changeIsCartOpen(isCartOpen);
                }}>
                    {/* <span><b>&lt;</b></span> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg>
                    {/* <span className="crt-qty">{cart?.length}</span> */}
                    {/* <span><b>{isCartOpen && ">"}</b></span> */}
                </div>
                <div className="cart-items">
                    {/* {(!shopCart?.length) ? console.log("slen " + shopCart.length) : "hello"} */}
                    {shopCart?.length > 0 ? shopCart?.map((shop, shopInd) => {
                        totprice = 0;
                        return (
                            <div className="shop-cart" key={shopInd}>
                                <div className="crt-shp-nm">{shop.shopName}</div>
                                <table className="table cart-tbl">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Price</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shop.cartItems.map((citem, cartInd) => {
                                            totprice += citem.qty * citem.price;

                                            return (
                                                <tr key={cartInd}>
                                                    <th scope="row">{cartInd + 1}</th>
                                                    <td className="cart-prod-nm">{citem.prodName}</td>
                                                    <td>
                                                        <div className="qty-group">
                                                            <button className="addqty-btn" onClick={() => {
                                                                incdecQty(shopInd, cartInd, true);
                                                            }}>+</button>
                                                            {citem.qty}
                                                            <button className="delqty-btn" onClick={() => {
                                                                incdecQty(shopInd, cartInd, false);
                                                            }}>-</button>
                                                        </div>
                                                    </td>
                                                    <td>&#8377; {citem.qty * citem.price}</td>
                                                    <td>
                                                        <span className="gfdel material-symbols-outlined" onClick={() => {
                                                            deleteCartItem(shopInd, cartInd);
                                                        }}>
                                                            delete
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <th scope="row" colSpan='3'>Total</th>
                                            <td colSpan='2'>&#8377; {totprice}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <a className="plc-ord btn" href={`/checkout?sind=${shopInd}`}>Place Order</a>
                            </div>

                        )
                    }) :
                        "Cart is Empty. Add some Products to cart..."
                    }
                    {/* {cart?.map((citem, ind) => {
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
                            })} */}

                </div>
            </div>
        </>
    )
}

export default Cart;