import React, { useContext, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ProductList from '../ProductList';
import ApiAxios from '../../util/apiAxios';
import Layout from '../layout/Layout';
import '../../App.css';
import { AuthContext } from '../../context/AuthContext'

const Checkout = () => {
	const [cart, setCart] = useState([]);
	const [loading, setLoading] = useState(false);
	const {dispatch} = useContext(AuthContext);
	
	useEffect(() => {
		checkOut();
	}, []);

	const checkOut = async () => {
		try {
			setLoading(true);
			await ApiAxios.get('/checkout')
				.then((payload) => setCart(payload.data.cart))
				.then(() => setLoading(false));
		} catch (err) {
			console.log(err);
		}
	};

	const emptyCart = async() => {
		try {
			setLoading(true);
			await ApiAxios.delete('/empty-cart')
				.then((payload) => {
					dispatch({
					type: 'UPDATE',
					email: payload.data.user.email,
					firstName: payload.data.user.firstName,
					lastName: payload.data.user.lastName,
					wishlist: payload.data.user.wishlist,
					cart: payload.data.user.cart,
				});})
				.then(() => setLoading(false));
		} catch(err) {
			console.log(err);
		}
	}

	const removeFromCart = async(id) => {
		try {
			await ApiAxios.delete(`/remove-from-cart/${id}`)
				.then((payload) => dispatch({
					type: "UPDATE",
					email: payload.data.user.email,
					firstName: payload.data.user.firstName,
					lastName: payload.data.user.lastName,
					wishlist: payload.data.user.wishlist,
					cart: payload.data.user.cart
				}))
				.then(() => setCart(cart.filter((item) => item._id !== id)))
				.catch((err) => console.log(err))
		} catch(err) {
			console.log(err)
		}
	}

	return (
		<Layout>
			{loading ? (
				<div
					style={{ display: 'flex', justifyContent: 'center', padding: 350 }}
				>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress />
					</div>
				</div>
			) : (
				<>
					<h3 style={{ padding: 15 }}>Shopping Cart</h3>
					<Button onClick={() => emptyCart()}>Empty cart</Button>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<div>
						{cart.map((product) => (
							<Box
								mb={0.5}
								display="flex"
								flexDirection="row"
								sx={{ cursor: 'pointer' }}
								key={product._id}
							>
								<ProductList
									product={{
										id: product._id,
										title: product.title,
										price: product.price,
										image: product.image,
										quantity: product.quantity
									}}
									removeFromCartFunction = {() => removeFromCart(product._id)}
								/>
							</Box>
						))}
					</div>
				</div>
				</>
			)}
		</Layout>
	);
};

export default Checkout;
