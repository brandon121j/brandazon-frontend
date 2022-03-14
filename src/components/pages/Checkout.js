import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ProductCard from '../ProductCard';
import ApiAxios from '../../util/apiAxios';
import Layout from '../layout/Layout';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import '../../App.css'


const Checkout = () => {
	const [cart, setCart] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		checkOut();
	}, []);

	const checkOut = async() => {
		try {
			setLoading(true);
			await ApiAxios.get('/checkout')
			.then((result) => setCart(result.data.cart))
			.then(() => console.log(cart))
		} catch(err) {

		}
	}

	return (
    <Layout>
		<div style={{ margin: "100px"}}>
			<Box p={4} display='flex' flexDirection='row'>
				{cart.map((product) => (
          <Link to='/product' key={product._id} state={{ id: product._id }} className='linkTag'>
					<Box mb={5} mr={1} display="flex" flexDirection="row" sx={{ cursor: 'pointer' }}>
          <ProductCard
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
			</Box>
		</div>
    </Layout>
	);
};

export default Checkout;
