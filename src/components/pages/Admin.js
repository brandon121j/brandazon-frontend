import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Admin = () => {
	const [values, setValues] = useState({
		category: '',
		brand: '',
		title: '',
		description: '',
		image: '',
		price: '',
	});

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
		console.log(values);
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<FormControl
				variant="standard"
				sx={{ m: 5, border: 1, p: 5, borderRadius: 1 }}
			>
				<h1>Create Product</h1>
				<Box sx={{ m: 3 }}>
					<FormControl variant="standard" sx={{ width: 500 }}>
						<InputLabel id="demo-simple-select-standard-label">
							Category
						</InputLabel>
						<Select
							labelId="demo-simple-select-standard-label"
							id="demo-simple-select-standard"
							onChange={(e) => handleChange(e)}
							name="category"
							value={values.category}
							label="Category"
						>
							<MenuItem value="Books">Books</MenuItem>
							<MenuItem value="Clothing, Shoes, and Jewelry">
								Clothing, Shoes, and Jewelry
							</MenuItem>
							<MenuItem value="Electronics">Electronics</MenuItem>
							<MenuItem value="Grocery & Gourmet Foods">
								Grocery & Gourmet Foods
							</MenuItem>
							<MenuItem value="Health & Personal Care">
								Health & Personal Care
							</MenuItem>
							<MenuItem value="Health, Household & Baby Care">
								Health, Household & Baby Care
							</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box sx={{ m: 3 }}>
					<TextField
						required
						id="standard-required"
						label="Brand"
						variant="standard"
						name="brand"
						value={values.brand}
						onChange={(e) => {
							handleChange(e);
							console.log(values);
						}}
						sx={{ width: 500 }}
					/>
				</Box>
				<Box sx={{ m: 3 }}>
					<TextField
						required
						id="standard-required"
						label="Title"
						variant="standard"
						sx={{ width: 500 }}
						name="title"
						value={values.title}
						onChange={(e) => handleChange(e)}
					/>
				</Box>
				<Box sx={{ m: 3 }}>
					<TextField
						multiline
						required
						id="standard-required"
						label="Description"
						variant="standard"
						sx={{ width: 500 }}
						name="description"
						value={values.description}
						onChange={(e) => handleChange(e)}
					/>
				</Box>
				<Box sx={{ m: 3 }}>
					<Input
						required
						accept="image/*"
						id="standard-required"
						variant="standard"
						label="Image"
						sx={{ width: 425 }}
						name="image"
						value={values.image}
						type="file"
						onChange={(e) => handleChange(e)}
					/>
					<Button variant="contained" component="span">
						Upload
					</Button>
				</Box>
				<Box sx={{ m: 3 }}>
					<TextField
						required
						id="standard-required"
						label="Price"
						variant="standard"
						sx={{ width: 500 }}
						name="price"
						value={values.price}
						onChange={(e) => handleChange(e)}
					/>
				</Box>
				<Box>
					<Button sx={{ width: 200, height: 50 }} variant="text">
						Create Product
					</Button>
				</Box>
			</FormControl>
		</div>
	);
};

export default Admin;
