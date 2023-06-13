import React from 'react';
import './App.css';
import Header from './components/Header';
import UpdateProduct from './components/UpdateProduct';
import CreateProduct from './components/CreateProduct';
import Merchant from './pages/Merchant';
import Delivery from './pages/Delivery';
import CRegister from './pages/CRegister';
import SRegister from './pages/SRegister';
import DRegister from './pages/DRegister';

function App() {
  return (
    <>
      <Header />
      {/* <Merchant /> */}
      {/* <Delivery /> */}
      {/* <CRegister /> */}
      {/* <SRegister /> */}
      <DRegister />
    </>
  );
}

export default App;
