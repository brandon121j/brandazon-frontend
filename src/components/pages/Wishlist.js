import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ProductCard from '../ProductCard';
import ApiAxios from '../../util/apiAxios';
import Layout from '../layout/Layout';
import { Link } from 'react-router-dom';
import '../../App.css'


const Checkout = () => {
	const [wishlist, setWishlist] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
    setLoading(true);
		ApiAxios.get('/get-users-wishlist')
    .then((result) => setWishlist(result.data.wishlist))
    .then(() => console.log(wishlist))
	}, []);

	return (
    <Layout>
		<div style={{ margin: "100px"}}>
			<Box p={4} display='flex' flexDirection='row'>
				{wishlist.map((product) => (
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
