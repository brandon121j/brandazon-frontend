import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ApiAxios from './util/apiAxios';

import Checkout from './components/pages/Checkout';
import Home from './components/pages/Home';
import Product from './components/pages/Product';
import Wishlist from './components/pages/Wishlist';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';
import PrivateRoute from './util/PrivateRoute';
// import { AuthContext } from './context/AuthContext';
import Admin from './components/pages/Admin';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';



function App() {
	
	return (
		<div className="App">
			<ToastContainer theme="dark" />
			<Router>
				<Routes>
					<Route
						path="wishlist"
						element={
							<PrivateRoute>
								<Wishlist />
							</PrivateRoute>
						}
					/>
					<Route
						path="/checkout"
						element={
							<PrivateRoute>
								<Checkout />
							</PrivateRoute>
						}
					/>
					<Route path="/sign-in" element={<Signin />} />
					<Route path="/sign-up" element={<Signup />} />
					<Route path="/product" element={<Product />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
