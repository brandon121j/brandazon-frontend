import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ProductList from '../ProductList';
import ApiAxios from '../../util/apiAxios';
import Layout from '../layout/Layout';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import '../../App.css';

const Checkout = () => {
	const [cart, setCart] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		checkOut();
	}, []);

	const checkOut = async () => {
		try {
			setLoading(true);
			await ApiAxios.get('/checkout')
				.then((result) => setCart(result.data.cart))
				.then(() => console.log(cart));
		} catch (err) {}
	};

	return (
		<Layout>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div>
				{cart.map((product) => (
					<Link
						to="/product"
						key={product._id}
						state={{ id: product._id }}
						className="linkTag"
					>
						<Box
							mb={.5}
							display="flex"
							flexDirection="row"
							sx={{ cursor: 'pointer' }}
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
					</Link>
				))}
				</div>
			</div>
		</Layout>
	);
};

export default Checkout;
