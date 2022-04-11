import React, { useState, useContext, useEffect } from 'react';
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

import { useNavigate, Link, useLocation } from 'react-router-dom';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Badge from '@material-ui/core/Badge';
import ApiAxios from '../../util/apiAxios';
import { AuthContext } from '../../context/AuthContext';
import { toastSuccess, toastError, toastInfo } from '../../util/toast';

const Header = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { state, dispatch } = useContext(AuthContext);
	const location = useLocation();

	const open = Boolean(anchorEl);

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	let navigate = useNavigate();
	

	const routeChange = (path) => {
		navigate(`/${path}`, { prevPath: location.pathname });
	};

	const logout = async () => {
		try {
			await ApiAxios.post(`/signout`)
				.then(() => {
					dispatch({
						type: 'LOGOUT',
					});
				})
				.then(window.localStorage.removeItem('userID'))
				.then(() => {
					toastInfo('User signed out!')
				})
				.catch((err) => console.log(err));
		} catch (err) {
			console.log(err);
		}
	};
	

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				sx={{ padding: '15px', background: 'rgb(19,25,33)' }}
			>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Link
						to="/"
						style={{
							textDecoration: 'none',
							color: 'inherit',
							cursor: 'pointer',
						}}
					>
						<Box>
							<Typography variant="h6" noWrap sx={{ mr: 2 }}>
								Brandazon
							</Typography>
						</Box>
					</Link>
					<Box sx={{ display: 'flex', mr: 3 }}>
						<Box sx={{ mr: 5, display: 'flex', flexDirection: 'row' }}>
							<Button onClick={handleClick} sx={{ color: 'inherit' }}>
								<Typography>My Account</Typography>
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
								<MenuItem
									onClick={() => {
										handleClose();
										routeChange('wishlist');
									}}
								>
									Wishlist
								</MenuItem>
								{
									!state.user ? (
										<MenuItem onClick={() => {handleClose();routeChange('sign-in')}}>Login</MenuItem>
									) : 
									(
										<MenuItem onClick={() => {handleClose(); logout()}}>Logout</MenuItem>
									)
								}
								
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
								<Badge style={{ color: 'inherit' }} badgeContent={state.user ? state.user.cartItems : 0 }>
								<ShoppingCartIcon />{" "}
								</Badge>
							</IconButton>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
