import React, { useEffect, useState, useContext } from 'react';
import { Box } from '@mui/material';
import WishlistList from '../WishlistList';
import ApiAxios from '../../util/apiAxios';
import Layout from '../layout/Layout';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from '../../context/AuthContext';
import '../../App.css';

const Checkout = () => {
	const [wishlist, setWishlist] = useState([]);
	const [loading, setLoading] = useState(false);
	const { dispatch } = useContext(AuthContext);

	useEffect(() => {
		loadWishlist();
	}, []);

	async function loadWishlist() {
		try {
		setLoading(true);
		ApiAxios.get('/get-users-wishlist')
			.then((result) => setWishlist(result.data.wishlist))
			.then(() => setLoading(false))
			.catch((err) => console.log(err));
		} catch(err) {
			console.log(err);
		}
	}

	const removeFromWishlist = async(id) => {
		try {
			await ApiAxios.delete(`/remove-from-wishlist/${id}`)
				.then((payload) => dispatch({
					type: "UPDATE",
					email: payload.data.user.email,
					firstName: payload.data.user.firstName,
					lastName: payload.data.user.lastName,
					wishlist: payload.data.user.wishlist,
					cart: payload.data.user.cart
				}))
				.then(() => setWishlist(wishlist.filter((item) => item._id !== id)))
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
					<h3 style={{ padding: 15 }}>Wishlist</h3>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<div>
							{wishlist.map((product) => (
								<Box
									mb={0.5}
									display="flex"
									flexDirection="row"
									sx={{ cursor: 'pointer' }}
									key={product._id}
								>
									<WishlistList
										product={{
											id: product._id,
											title: product.title,
											price: product.price,
											image: product.image,
										}}
										removeFromWishlistFunction = {() => removeFromWishlist(product._id)}
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
