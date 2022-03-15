import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ children }) {
    const {state} = useContext(AuthContext);
	const location = useLocation();

	if (state.user) {
		return children;
	} else {
		return <Navigate to="/sign-in" state={{ from: location }} />;
	}
}

export default PrivateRoute;