import React, { useEffect, useState } from 'react'
import Order from '../components/Order';
import axios from "axios"
import "../styles/Delperson.css"

const DelPerson = () => {

  const [orders, setOrders] = useState([]);
  const shopName = "Variety"

  useEffect(() => {
    displayOrders();
  }, [])


  async function displayOrders() {
    try {
      const response = await axios.get(`http://localhost:5050/orders/getorders/${shopName}`);
      const neworders = response.data.orders;
      // console.log("orders " + JSON.stringify(neworders));
      // setSelectedMenuOpt("Orders")
      setOrders(neworders);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateStatus(id, status) {
    try {
      // const response = await axios.post(`http://localhost:5050/orders/setstatus/${id}`, { status });
      // const response = await axios.post(`http://localhost:5050/orders/setstatus/${id}/${status}`, { status });

      // const response = await axios({
      //     method: 'POST',
      //     url: `http://localhost:5050/orders/setstatus/${id}`,
      //     body: { status }
      // })
      console.log("update status called " + status);
      const response = await axios.post(`http://localhost:5050/orders/setstatus/${id}`, {
        status
      });
      if (response.status === 200) {
        alert(response.data.message);
      }
      else {
        alert("Update Status Unsuccessful !!")
      }

      console.log("update " + JSON.stringify(response.data.message));
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="d-person mx-auto w-75">
      <h2 className="mb-5 mx-5 pb-4 ps-5 fw-bold fs-1 border-bottom border-5 merchant-head">Orders To Be Delivered</h2>
      {orders.map((order, index) => {
        console.log(JSON.stringify(order));
        return <Order key={index} ind={index} id={order.orderId} name={order.name} address={order.address} products={order.products} status={order.status} subTotal={order.subTotal} dcharge={order.deliveryCharge} isDperson={true} updateStatus={updateStatus} />
      })}
    </div>
  )
}

export default DelPerson
