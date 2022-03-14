import React from 'react';
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

import { Link } from 'react-router-dom'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import { flexbox } from '@mui/system';

const Header = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				// position="static"
				sx={{ padding: '15px', background: 'rgb(19,25,33)' }}
			>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Link to='/' style={{ text}}>
					<Box>
						<Typography variant="h6" noWrap sx={{ mr: 2 }}>
							Brandazon
						</Typography>
		
					</Box>
					</Link>
					<Box sx={{ display: "flex", mr: 3 }}>
						<Box sx={{mr: 5, display: "flex", flexDirection: 'row'}}>
							<Button sx={{ color: "inherit" }}>
							<Typography>Account and wishlist</Typography>
							<ArrowDropDown />
							</Button>
						</Box>
						<Box>
							<IconButton
								size="small"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{}}
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
