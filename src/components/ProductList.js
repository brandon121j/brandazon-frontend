import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { display } from '@mui/system';
import { Box } from '@mui/system';

const ProductList = (props) => {
	const { product } = props;

	const { id, category, title, description, image, image_id, price } = product;

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
						<ListItemText primary={title}/>
					</Box>
					<Box style={{width: '200px', marginLeft: '5px' }}>
						<ListItemText
							style={{ alignContent: 'end' }}
							primary={`$${price}`}
						/>
					</Box>
					<Box style={{width: '50px'}}>
						<IconButton edge="end" aria-label="delete">
							<DeleteIcon />
						</IconButton>
					</Box>
				</ListItem>
			</List>
		</div>
	);
};

export default ProductList;
