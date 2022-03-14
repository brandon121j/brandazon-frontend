import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ApiAxios from '../../util/apiAxios';
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/product.css'
import Layout from '../layout/Layout';


const Product = () => {
  const [productInfo, setProductInfo] = useState([]);
  const [loading, setLoading] = useState(false);
	const location = useLocation();
	const { id } = location.state;

  useEffect(() => {
    getProductInfo()
	}, []);

  const getProductInfo = async() => {
    try {
    setLoading(true);
    await ApiAxios.get(`/product/${id}`)
    .then((product) => setProductInfo(product.data.payload))
    .then(() => setLoading(false))
    .catch((err) => console.log(err))
  }catch(err) {
      console.log(err)
    }
  }
  
  
  return (
    <Layout>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 350 }}>
          <div style={{ display: "flex", justifyContent: "center"}}>
            <CircularProgress />
          </div>
        </div>
      ) : (
    <div className='productContainer'>
      <div className='img'>
        <img src={productInfo.image} />
      </div>
      <div className='productInfo'>
        <h3>{productInfo.title}</h3>
        <hr/>
        <div className='aboutItem'>
          <h4>About this item</h4>
          <p>{productInfo.description}</p>
        </div>
      </div>
        <div className='buttons'>
          <h4>${productInfo.price}</h4>
          <button>Add to cart</button>
          <button>Add to wishlist</button>
        </div>
    </div>
      )}
  </Layout>
  )
}

export default Product