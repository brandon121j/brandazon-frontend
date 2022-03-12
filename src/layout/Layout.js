
import React from 'react';
import Header from './Header';

const Layout = (props) => {
	const { children } = props;
	return (
		<div>
			<div className='header'>
				<Header />
			</div>
			<div className='children'>{children}</div>
		</div>
	);
};

export default Layout;