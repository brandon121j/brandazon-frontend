import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ProductCard from '../ProductCard';
import ApiAxios from '../../util/apiAxios';
import Layout from '../layout/Layout';
import { Link } from 'react-router-dom';
import '../../App.css'
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
    setLoading(true);
		ApiAxios.get('/get-all-products')
    .then((result) => setProducts(result.data))
    .then(() => setLoading(false))

	}, []);

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
		<div>
			<Box style={{ width: '1800px'}}>
				{products.map((product) => (
          <Link to='/product' key={product._id} state={{ id: product._id }} className='linkTag'>
					<Box m={2}  sx={{ cursor: 'pointer', display: 'inline-block' }}>
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
    )}
    </Layout>
	);
};

export default Home;
