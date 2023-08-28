import React, { useEffect, useState } from 'react'
import Order from './Order';
import OverviewCard from './OverviewCard';
import "../styles/Dashboard.css"
import axios from 'axios';

const Dashboard = ({ orders, shopName, sCatList }) => {

    const [tab, setTab] = useState(1);
    const [products, setProducts] = useState([]);
    const [oDelivered, setODelivered] = useState([]);
    const [prodLst, setProdLst] = useState([]);
    const [shopNamee, setShopName] = useState(shopName);

    // console.log("pl ", prodLst);
    // console.log("ps ", shopNamee);



    useEffect(() => {
        console.log("eff");
        const getData = async () => {
            const res1 = await axios.get(`http://localhost:5050/products/getproductlist/Kala-BookStore`);
            // const response = await axios.get(`http://localhost:5050/products/getproductlist/${shopName}`);
            if (res1.status === 200) {
                setProdLst(res1.data.prods);
            } else {
                alert(res1.data);
            }
            const res2 = await axios.post("http://localhost:5050/products/shopproducts", {
                prodLst: res1.data.prods
            });
            if (res2.data.success) {
                console.log("pa ", JSON.stringify(res2.data.prodArr));
                const x = res2.data.prodArr;
                setProducts(p => [...x]);
            }

            const res3 = await axios.get("http://localhost:5050/orders/deliveredorderscount/Variety");
            setODelivered(res3.data.dOrdersLength);
        }
        getData();
    }, []);

    console.log("p", products, prodLst);

    return (<>
        <div className="menuOpt" >
            <span onClick={() => setTab(1)}>Summary</span>
            <span onClick={() => setTab(2)}>Orders</span>
            <span onClick={() => setTab(3)}>Products</span>
        </div>
        <div className="dashboard">
            {
                tab === 1 &&
                <div className="overview">
                    <OverviewCard oHead="Orders Recieved" oValue={orders.length} icon="receipt_long" />
                    <OverviewCard oHead="Orders Delivered" oValue={oDelivered} icon="local_shipping" />
                    <OverviewCard oHead="Products" oValue={prodLst.length} icon="list_alt" />
                </div>
            }
            {
                tab === 2 &&
                <div>
                    {orders ? orders.map((order, index) => {
                        console.log(JSON.stringify(order));
                        return <Order key={index} ind={index} id={order.orderId} name={order.name} address={order.address} products={order.products} status={order.status} subTotal={order.subTotal} dcharge={order.deliveryCharge} isDperson={false} />
                    })
                        : <h5>No Orders</h5>
                    }
                </div>
            }
            {
                tab === 3 &&
                <div className="prods-list">
                    {products.length ?
                        <table className="table table-striped">
                            <thead className="table-dark" style={{ backgroundColor: "#0a5616" }}>
                                <tr>
                                    <th>Sr.</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th colSpan={4} className="p-cat" > Stationary</th>
                                </tr>
                                {
                                    products.map((product, index) => {
                                        return <>
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{product.name}</td>
                                                <td>₹ {product.price}</td>
                                                <td>{product.qty}</td>
                                            </tr>
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{product.name}</td>
                                                <td>₹ {product.price}</td>
                                                <td>{product.qty}</td>
                                            </tr>
                                        </>
                                    })
                                }
                                <tr>
                                    <td></td>
                                </tr>
                                <tr className="p-cat">
                                    <th colSpan={4} > Stationary</th>
                                </tr>
                                {
                                    products.map((product, index) => {
                                        return <>
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{product.name}</td>
                                                <td>₹ {product.price}</td>
                                                <td>{product.qty}</td>
                                            </tr>
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{product.name}</td>
                                                <td>₹ {product.price}</td>
                                                <td>{product.qty}</td>
                                            </tr>
                                        </>
                                    })
                                }
                                <tr>
                                    <td></td>
                                </tr>
                                <tr className="p-cat">
                                    <th colSpan={4} > Stationary</th>
                                </tr>
                                {
                                    products.map((product, index) => {
                                        return <>
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{product.name}</td>
                                                <td>₹ {product.price}</td>
                                                <td>{product.qty}</td>
                                            </tr>
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{product.name}</td>
                                                <td>₹ {product.price}</td>
                                                <td>{product.qty}</td>
                                            </tr>
                                        </>
                                    })
                                }
                            </tbody>
                        </table>
                        :
                        <h5>No Products Found</h5>
                    }
                </div>

            }

        </div>

    </>
    )
}

export default Dashboard
