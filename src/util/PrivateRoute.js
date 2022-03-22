import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

function PrivateRoute({ children }) {
	const { state } = useContext(AuthContext);
	const loggedIn = state.user;
	const location = useLocation();

	if (loggedIn) {
		return children;
	} else {
		return <Navigate to="/sign-in" state={{ from: location }} />;
	}
}

export default PrivateRoute;