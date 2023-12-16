import React from 'react';
import Header from './components/pages/Header';
import './App.css';

import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Products from './components/pages/Products';
import Cart from './components/pages/Cart';

function App() {
  return (
    // <div>
    //   <Header/>
    // </div>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Products/>} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
