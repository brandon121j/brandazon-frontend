import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ProductList from '../ProductList';
import ApiAxios from '../../util/apiAxios';
import Layout from '../layout/Layout';
import CircularProgress from '@mui/material/CircularProgress';
import '../../App.css';
import { AuthContext } from '../../context/AuthContext'

const Checkout = () => {
	const [cart, setCart] = useState([]);
	const [loading, setLoading] = useState(false);
	const {state} = useContext(AuthContext);
	
	useEffect(() => {
		checkOut();
	}, [state]);

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
