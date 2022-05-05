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
import Button from '@mui/material/Button';
import ButtonGroup from "@material-ui/core/ButtonGroup";

const ProductList = (props) => {
	const { product } = props;

	const { id, category, title, description, image, image_id, price, quantity } = product;

	const { dispatch } = useContext(AuthContext);



	return (
		<div style={{ width: '800px', border: '1px solid gray' }}>
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
					<Box style={{width: '200px' }}>
						<ListItemText
							style={{ alignContent: 'end', marginLeft: '55px' }}
							primary={`$${price}`}
						/>
					</Box>
					
					<Box style={{width: '50px'}}>
						<IconButton edge="end" aria-label="delete" onClick={() => props.removeFromCartFunction(id)}>
							<DeleteIcon />
						</IconButton>
					</Box>
				</ListItem>
			</List>
		</div>
	);
};

export default ProductList;