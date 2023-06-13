import React from 'react'
import Order from '../components/Order'

const Delivery = () => {
    return (
        <div className="w-75 mx-auto" style={{ paddingTop: "6rem" }}>
            <h2 className="fw-bold">Orders</h2>
            <Order />
            <Order />
            <Order />
            <Order />
        </div>
    )
}

export default Delivery
