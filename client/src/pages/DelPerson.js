import React, { useEffect, useState } from 'react'
import Order from '../components/Order';
import axios from "axios"
import "../styles/Delperson.css"
import { useAuth } from '../context/auth';

const DelPerson = () => {

  const [orders, setOrders] = useState([]);
  const [shopName, setShopName] = useState();

  const [auth, setAuth] = useAuth();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.post("http://localhost:5050/shops/getdpshopname", { uname: auth.user.uname });
      if (response.data.success) {

        setShopName(response.data.shopName);
      }

      //disporders
      try {
        const res = await axios.get(`http://localhost:5050/orders/getorders/${response.data.shopName}`);
        const neworders = res.data.orders;
        // console.log("orders " + JSON.stringify(neworders));
        // setSelectedMenuOpt("Orders")
        setOrders(neworders);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    // displayOrders();
  }, [])

  document.title = "Quik-Buy | Delivery Person-" + shopName;


  async function updateStatus(id, status) {
    try {
      // const response = await axios.post(`http://localhost:5050/orders/setstatus/${id}`, { status });
      // const response = await axios.post(`http://localhost:5050/orders/setstatus/${id}/${status}`, { status });

      // const response = await axios({
      //     method: 'POST',
      //     url: `http://localhost:5050/orders/setstatus/${id}`,
      //     body: { status }
      // })
      const response = await axios.post(`http://localhost:5050/orders/setstatus/${id}`, {
        status
      });
      if (response.status === 200) {
        alert(response.data.message);
      }
      else {
        alert("Update Status Unsuccessful !!")
      }

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="d-person mx-auto w-75">
      <h2 className="mb-5 mx-5 pb-4 ps-5 fw-bold fs-1 border-bottom border-5 merchant-head">{shopName} - Customer Orders</h2>
      {orders.map((order, index) => {
        return <Order key={index} ind={index} id={order.orderId} name={order.name} address={order.address} products={order.products} status={order.status} subTotal={order.subTotal} dcharge={order.deliveryCharge} isDperson={true} updateStatus={updateStatus} />
      })}
    </div>
  )
}

export default DelPerson
