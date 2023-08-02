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
import { AuthProvider } from './context/auth';
import PrivateRoute from './components/Routes/Private';
import DelPerson from './pages/DelPerson';


function App() {

  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="main">
          <Routes>
            <Route path='/customer/' element={<PrivateRoute role="customer" />} >
              <Route path='Shop' element={<Shop />} />
              <Route path='Product' element={<Product />} />
            </Route>
            <Route path='/customer-register' element={<CRegister />} />
            <Route path='/shop-register' element={<SRegister />} />
            <Route path='/deliveryperson-register' element={<DRegister />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/' element={<Home />} />
            {/* <Route path='/Merchant' element={<Merchant />} /> */}
            <Route path='/Merchant' element={<PrivateRoute role="merchant" />} >
              <Route path='' element={<Merchant />} />
            </Route>
            <Route path='/Deliveryperson' element={<PrivateRoute role="dperson" />} >
              <Route path='' element={<DelPerson />} />
            </Route>
            <Route path='/About' element={<About />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
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