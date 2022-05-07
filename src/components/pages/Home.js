import React, { useEffect, useState, useContext } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate, useLocation } from 'react-router-dom';
import { toastError } from '../../util/toast';

import ProductCard from '../ProductCard';
import ApiAxios from '../../util/apiAxios';
import Layout from '../layout/Layout';
import { AuthContext } from '../../context/AuthContext';
import '../../App.css'

const Home = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
  const userID = window.sessionStorage.getItem('userID');
  const location = useLocation();

	useEffect(() => {
    getProducts();
    userLoggedIn();
	}, []);

  async function getProducts() {
    try {
    setLoading(true);
		await ApiAxios.get('/get-all-products')
    .then((result) => {setProducts(result.data)})
    .then(() => setLoading(false))
    } catch (err) {
      console.log(err)
    }
  }

  const userLoggedIn = async () => {
		if (userID) {
			try {
				await ApiAxios.get('/user-info')
					.then((payload) =>
						dispatch({
							type: 'UPDATE',
							email: payload.data.user.email,
							firstName: payload.data.user.firstName,
							lastName: payload.data.user.lastName,
							wishlist: payload.data.user.wishlist,
							cart: payload.data.user.cart,
						})
				);
			} catch (err) {
				dispatch({
					type: 'LOGOUT',
				});
				sessionStorage.removeItem(userID);
				<Navigate to="/sign-in" state={{ from: location }} />
				toastError('Sign in first!');
			}
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
		<div>
			<Box style={{ width: '100%' }}>
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
