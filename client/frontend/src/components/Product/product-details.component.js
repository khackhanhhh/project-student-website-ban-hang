import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import cart from '../state/cart.state'
import useCartState from '../state/cart.state'
import { useState as useStateHook } from '@hookstate/core';



const ProductDetails = (props) => {
  const [product, setProduct] = useState({});
  const proId = props.match.params.id;
  const xxx = useCartState();

  useEffect(() => {
    axios.get('/api/products/' + props.match.params.id)
      .then(response => {
        setProduct(response.data.product);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);

  useEffect(() => {
    console.log('change=', xxx.list.length)
  }, [xxx])

  const addProductToCart = product => {
    xxx.addProduct(product)
  }

  return (

    <div className="d-flex">
      <div>
        <img height="200px" src={`http://localhost:5000/uploads/${product.uploadedImage}`} />
      </div>

      <div className="ml-5">
        <h2 className="font-weight-bold">{product.name}</h2>
        <div className="d-flex flex-row">
          <p className="font-weight-bold">Category : </p>
          <p>{product?.category?.name}</p>
        </div>
        <div className="d-flex flex-row">
          <p className="font-weight-bold">Guurantee (month) : </p>
          <p>{product.guarantee}</p>
        </div>
        <div className="d-flex flex-row">
          <p className="font-weight-bold">Description : </p>
          <p>{product.description}</p>
        </div>
        <div className=" d-flex flex-row text-primary">
          <h4 className="font-weight-bold">Price : </h4>
          <h4>{product.price} đ</h4>
        </div>
        <button className="btn btn-danger mt-3" onClick={e => { e.preventDefault(); addProductToCart(product) }}>Add to card</button>
      </div>
    </div>

  );
}
export default ProductDetails;



