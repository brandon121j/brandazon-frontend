import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Layout from '../layout/Layout';

import ApiAxios from '../../util/apiAxios';
import {toastSuccess, toastError} from '../../util/toast'
import axios from 'axios';

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
	};

	const submitProduct = async(e) => {
		e.preventDefault();
		try {

			let fd = new FormData();
			// console.log(values.category);
			fd.append('category', values.category);
			fd.append('brand', values.brand);
			fd.append('title', values.title);
			fd.append('description', values.description);
			fd.append('image', values.image);
			fd.append('price', values.price);
			console.log(fd.getAll('image'));
		// 	ApiAxios.post('/create-product', fd, {
		// 			headers : {
		// 				"Accept": "application/json"
		// 			}
		// 	})
		// 		.then((data) => console.log('made it here 1!'))
		// } catch(err) {
		// 	toastError('Check console');
		// 	console.log(err);
		// }
		let url = 'http://localhost:3001/create-product';
		let payload = await axios.post(url, fd,
			{
				headers : {
					"Accept": "application/json"
				}
			});
		console.log(payload)
		} catch(err) {console.log(err)}
	}

	return (
		<Layout>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
			<form onSubmit={submitProduct} multipart="urlencoded">
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
						<Button sx={{ width: 200, height: 50 }} variant="text" type='submit'>
							Create Product
						</Button>
					</Box>
				</FormControl>
				</form>
			</div>
		</Layout>
	);
};

export default Admin;
