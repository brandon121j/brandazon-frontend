import React, { useState } from 'react';
import {
	AppBar,
	IconButton,
	Box,
	Toolbar,
	Typography,
	Menu,
	MenuItem,
	Container,
	Button,
} from '@mui/material';

import { useNavigate, Link } from "react-router-dom";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { flexbox } from '@mui/system';

const Header = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const open = Boolean(anchorEl);

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	let navigate = useNavigate(); 

	const routeChange = (path) => {
		navigate(`/${path}`);
		console.log(path)
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				// position="static"
				sx={{ padding: '15px', background: 'rgb(19,25,33)' }}
			>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Link to="/" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
						<Box>
							<Typography variant="h6" noWrap sx={{ mr: 2 }}>
								Brandazon
							</Typography>
						</Box>
					</Link>
					<Box sx={{ display: 'flex', mr: 3 }}>
						<Box sx={{ mr: 5, display: 'flex', flexDirection: 'row' }}>
							<Button 
								onClick={handleClick}
								sx={{ color: 'inherit' }}>
								<Typography>Account and wishlist</Typography>
								<ArrowDropDown />
							</Button>
							<Menu
								id="demo-positioned-menu"
								aria-labelledby="demo-positioned-button"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
							>
								<MenuItem onClick={() => {handleClose(); routeChange('')}}>Wishlist</MenuItem>
								<MenuItem onClick={handleClose}>My account</MenuItem>
								<MenuItem onClick={handleClose}>Logout</MenuItem>
							</Menu>
						</Box>
						<Box>
							<IconButton
								size="small"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{}}
								onClick={() => routeChange('checkout')}
							>
								<ShoppingCartIcon />
							</IconButton>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
