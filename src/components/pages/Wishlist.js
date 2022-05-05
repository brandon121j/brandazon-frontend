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
	// const { state } = useContext(AuthContext);

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
