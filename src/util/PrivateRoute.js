import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
	const userID = window.localStorage.getItem('userID');
	const location = useLocation();

	if (userID) {
		return children;
	} else {
		return <Navigate to="/sign-in" state={{ from: location }} />;
	}
}

export default PrivateRoute;