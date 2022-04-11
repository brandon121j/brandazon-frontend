import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ApiAxios from './apiAxios';
import {toastError} from './toast'

function PrivateRoute({ children }) {
	const { dispatch } = useContext(AuthContext);
	const userID = window.localStorage.getItem('userID');
	const location = useLocation();

	useEffect(() => {
		userLoggedIn();
	}, []);

	const userLoggedIn = async () => {
		if (userID) {
			try {
				ApiAxios.get('/user-info')
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
				localStorage.removeItem(userID);
				<Navigate to="/sign-in" state={{ from: location }} />
				toastError('Sign in first!');
			}
		} 
	};

	if (userID) {
		return children;
	} else {
		return <Navigate to="/sign-in" state={{ from: location }} />;
	}
}

export default PrivateRoute;
