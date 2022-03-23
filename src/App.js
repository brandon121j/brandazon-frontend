import { useContext, useEffect } from 'react';
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
import { AuthContext } from './context/AuthContext';
import Admin from './components/pages/Admin';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
	const { dispatch, state } = useContext(AuthContext);

	useEffect(() => {
		keepUserLoggedIn();
	}, []);

	const keepUserLoggedIn = async () => {
		const userID = window.localStorage.getItem('userID');

		if (userID) {
			try {
				ApiAxios.get('/user-info').then((payload) =>
					dispatch({
						type: 'LOGIN',
						email: payload.data.user.email,
						firstName: payload.data.user.firstName,
						lastName: payload.data.user.lastName,
						wishlist: payload.data.user.wishlist,
						cart: payload.data.user.cart,
					})
				);
			} catch (err) {
				dispatch({
					type: 'LOGOUT'
				})
			}
		} else {
			dispatch({ type: 'LOGOUT'})
		}
	};

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
						<Route path="/admin" element={<Admin />} />
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
