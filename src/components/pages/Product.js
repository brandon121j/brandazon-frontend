import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ApiAxios from '../../util/apiAxios';
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/product.css';
import Layout from '../layout/Layout';
import { AuthContext } from '../../context/AuthContext';
import { Button, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const Product = () => {
	const { dispatch, state } = useContext(AuthContext);
	const location = useLocation();
	const { id } = location.state;
	const [productInfo, setProductInfo] = useState([]);
	const [loading, setLoading] = useState(false);
	const [addedToWishlist, setAddedToWishlist] = useState(false);
	const [addedToCart, setAddedToCart] = useState(false);
	

	useEffect(() => {
		getProductInfo();
		alreadyAdded();
	}, []);

	const getProductInfo = async () => {
		try {
			setLoading(true);
			await ApiAxios.get(`/product/${id}`)
				.then((product) => setProductInfo(product.data.payload))
				.then(() => setLoading(false))
				.catch((err) => console.log(err));
		} catch (err) {
			console.log(err);
		}
	};

	const alreadyAdded = () => {
		if (state.user) {
			const stringID = id.toString();
			const cart = state.user.cart;
			const wishlist = state.user.wishlist;
			const inCart = cart.includes(stringID);
			const inWishlist = wishlist.includes(stringID);
			inCart ? setAddedToCart(true) : setAddedToCart(false);
			inWishlist ? setAddedToWishlist(true) : setAddedToWishlist(false);
		}
	}

	const addToCart = async () => {
		try {
			if (!addedToCart) {
			await ApiAxios.post(`/add-to-cart/${id}`)
				.then((payload) => {
					dispatch({
						type: "UPDATE",
						email: payload.data.user.email,
						firstName: payload.data.user.firstName,
						lastName: payload.data.user.lastName,
						wishlist: payload.data.user.wishlist,
						cart: payload.data.user.cart
					})
				})
				.then(setAddedToCart(true))
				.catch((err) => console.log(err));
			} else {
				await ApiAxios.delete(`/remove-from-cart/${id}`)
				.then((payload) => dispatch({
					type: "UPDATE",
					email: payload.data.user.email,
					firstName: payload.data.user.firstName,
					lastName: payload.data.user.lastName,
					wishlist: payload.data.user.wishlist,
					cart: payload.data.user.cart
				}))
				.then(setAddedToCart(false))
				.catch((err) => console.log(err))
			}
		} catch (err) {
			console.log(err);
		}
	};

	const addToWishlist = async () => {
		try {
			if (!addedToWishlist) {
			await ApiAxios.post(`/add-to-wishlist/${id}`)		
				.then((payload) => dispatch({
					type: "UPDATE",
					email: payload.data.user.email,
					firstName: payload.data.user.firstName,
					lastName: payload.data.user.lastName,
					wishlist: payload.data.user.wishlist,
					cart: payload.data.user.cart
				}))
				.then(() => setAddedToWishlist(true))
			} else {
				await ApiAxios.delete(`/remove-from-wishlist/${id}`)
				.then((payload) => dispatch({
					type: "UPDATE",
					email: payload.data.user.email,
					firstName: payload.data.user.firstName,
					lastName: payload.data.user.lastName,
					wishlist: payload.data.user.wishlist,
					cart: payload.data.user.cart
				}))
				.then(setAddedToWishlist(false))
				.catch((err) => console.log(err))
			}
		} catch (err) {
			console.log(err);
		}
	};

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
				<div className="productContainer">
					<div className="img">
						<img src={productInfo.image} />
					</div>
					<div className="productInfo">
						<h3>{productInfo.title}</h3>
						<hr />
						<div className="aboutItem">
							<h4>About this item</h4>
							<p>{productInfo.description}</p>
						</div>
					</div>
					<div className="buttons">
						<h4>${productInfo.price}</h4>
						<Stack>
							<Button color='inherit' startIcon={addedToCart ? <ShoppingCartIcon /> : <AddShoppingCartIcon />} onClick={() => addToCart()}>{addedToCart ? 'Item added to cart!' : 'Add item to cart'}</Button>
							<Button color='inherit' startIcon={addedToWishlist ? <StarIcon /> : <StarBorderIcon />} onClick={() => {addToWishlist()}}>{addedToWishlist ? 'Item added to wishlist!' : 'Add item to wishlist'}</Button>
						</Stack>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Product;
