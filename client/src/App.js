import React from 'react';
import './App.css';
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Footer from './components/Footer'
import Login from './pages/Login'
import CRegister from './pages/CRegister';
import SRegister from './pages/SRegister';
import DRegister from './pages/DRegister';
import Header from './components/Header';
import Merchant from './pages/Merchant';
import About from './pages/About'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Checkout from './pages/Checkout';
import OrderHist from './pages/OrderHist';


function App() {

  function addToCart(citem) {
    let cart = [JSON.parse(localStorage.getItem("cart")), ...citem];
    // [
    //         {
    //             shopNmae: "Variety",
    //             name: "Potato",
    //             price: 70,
    //             qty: 3
    //         },
    //         {
    //             shopNmae: "Jay-Ambe",
    //             name: "Keyboard",
    //             price: 900,
    //             qty: 2
    //         },
    //         {
    //             shopNmae: "Variety",
    //             name: "Hing",
    //             price: 55,
    //             qty: 1
    //         }
    // ];
    console.log("app cart " + cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return (
    <>
      <Router>
        <Header />
        <div className="main">
          <Routes>
            <Route path='/customer-register' element={<CRegister />} />
            <Route path='/shop-register' element={<SRegister />} />
            <Route path='/deliveryperson-register' element={<DRegister />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/Shop' element={<Shop />} />
            <Route path='/Product' element={<Product />} />
            <Route path='/Orders' element={<OrderHist />} />
            <Route path='/Merchant' element={<Merchant />} />
            <Route path='/Checkout' element={<Checkout />} />
            <Route path='/About' element={<About />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;

// Home
// Cart
// Shop
// Update Products
// Delivery
// Orders
// Feedback