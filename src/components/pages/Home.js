import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ProductCard from '../ProductCard';
import ApiAxios from '../../util/apiAxios';
import Layout from '../layout/Layout';
import { Link } from 'react-router-dom';
import '../../App.css'

const Home = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
    setLoading(true);
		ApiAxios.get('/get-all-products')
    .then((result) => setProducts(result.data))
    .then(() => console.log(products))

	}, []);

	return (
    <Layout>
		<div style={{ margin: "100px"}}>
			<Box p={4} display='flex' flexDirection='row'>
				{products.map((product) => (
          <Link to='/product' state={{ id: product._id }} className='linkTag'>
					<Box mb={5} mr={1} key={product.id} display="flex" flexDirection="row" sx={{ cursor: 'pointer' }}>
          <ProductCard
              
              product={{
                id: product.id,
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

export default Home;
