import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';

import Checkout from './components/pages/Checkout';
import CreateProduct from './components/pages/CreateProduct';
import Home from './components/pages/Home';
import Product from './components/pages/Product';
import Wishlist from './components/pages/Wishlist';
import Signin from './components/pages/Signin'
import Signup from './components/pages/Signup';


function App() {




  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/checkout' element={<Checkout />}/>
            <Route path='/sign-in' element={<Signin />}/>
            <Route path='/sign-up' element={<Signup />}/>
            <Route path='/product' element={<Product />}/>
            <Route path='/' element={<Home />}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
