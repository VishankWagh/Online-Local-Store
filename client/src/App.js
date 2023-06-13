import React from 'react';
import './App.css';
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Footer from './components/Footer'
import Login from './pages/Login'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Shop' element={<Shop />} />
          <Route path='/Product' element={<Product />} />
          <Route path='/Login' element={<Login />} />
        </Routes>
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