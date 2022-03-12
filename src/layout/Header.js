import React from 'react';

const Header = () => {
	return (
		<div className="headerContainer">
			<div>
				<Link to='/' style={{ textDecoration: 'none '}}>
				<h3>Store</h3>
				</Link>
			</div>
			<div id="shoppingCart">

			</div>
		</div>
	);
};

export default Header;