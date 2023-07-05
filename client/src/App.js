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
import Header from './components/Header'
import Merchant from './pages/Merchant'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


function App() {
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
            <Route path='/Merchant' element={<Merchant />} />
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