import React from 'react'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


const ProductCard = (props) => {
    const { product } = props;

    const {
      id,
      category,
      title,
      description,
      image,
      image_id,
      price,
    } = product

  return (

    <Card sx={{ mx: 'auto', width: 250, height: 250 }} style={{ paddingTop: '10px', border: "none", boxShadow: "none" }}>
        <CardMedia
          component="img"
          height="175"
          width="175"
          image={image}
        />
        <CardContent>
          <Typography>{title}</Typography>
          <Typography><b>${price}</b></Typography>
        </CardContent>
    </Card>
    

  )
}

export default ProductCard