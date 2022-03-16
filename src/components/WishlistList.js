import React, { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import ApiAxios from '../util/apiAxios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProductList = (props) => {
	const { product } = props;

	const { id, category, title, description, image, image_id, price } = product;

	const { dispatch } = useContext(AuthContext);


	const removeFromWishlist = async(id) => {
		try {
			await ApiAxios.delete(`/remove-from-wishlist/${id}`)
				.then((payload) => dispatch({
					type: "UPDATE",
					email: payload.data.user.email,
					firstName: payload.data.user.firstName,
					lastName: payload.data.user.lastName,
					wishlist: payload.data.user.wishlist,
					cart: payload.data.user.cart
				}))
				.catch((err) => console.log(err))
		} catch(err) {
			console.log(err)
		}
	}

	return (
		<div style={{ width: '650px', border: '1px solid gray' }}>
			<List>
				<ListItem style={{ display: 'flex', justifyContent: 'space-evenly' }}>
					<Box style={{width: '100px'}}>
						<ListItemAvatar>
							<Avatar variant="square" src={image} />
						</ListItemAvatar>
					</Box>
					<Box style={{width: '300px'}}>
						<Link 
						to="/product"
						key={id}
						state={{ id: id }}
						className="linkTag">
							<ListItemText primary={title}/>
						</Link>
					</Box>
					<Box style={{width: '200px', marginLeft: '5px' }}>
						<ListItemText
							style={{ alignContent: 'end' }}
							primary={`$${price}`}
						/>
					</Box>
					<Box style={{width: '50px'}}>
						<IconButton edge="end" aria-label="delete" onClick={() => {removeFromWishlist(id)}}>
							<DeleteIcon />
						</IconButton>
					</Box>
				</ListItem>
			</List>
		</div>
	);
};

export default ProductList;
