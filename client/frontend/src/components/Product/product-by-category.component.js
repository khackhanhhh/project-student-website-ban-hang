import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ProductDetails from './product-details.component';
import { Button } from 'bootstrap';
import cart from '../state/cart.state'
import useCartState from '../state/cart.state'
import { useState as useStateHook } from '@hookstate/core';

const Product = props => (

  <Link to={`/details/${props.product._id}`} className="navbar-item text-light">
    <div className="card text-center text-white" >
      <img height="200px" src={`http://localhost:5000/uploads/${props.product.uploadedImage}`} className="card-img-top" alt="..." />
      <div className="card-body bg-dark">
        <h5 className="card-title">{props.product.name}</h5>
        <p className="card-text"><s>{props.product.price}</s></p>
          <p className="card-text">{props.product.price-props.product.price/100*props.product.discount}</p>
        <button className="btn btn-primary" onClick={e => { e.preventDefault(); props.addProductToCart(props.product) }}>Add to card</button>
      </div>
    </div>
  </Link>
)

const ProductByCategory = (props) => {
  const xxx = useCartState();
  const [products, setProducts] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    axios.get('/api/products/category/' + props.match.params.id)
      .then(response => {
        setProducts(response.data.product);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [props.match.params.id]);

  // useEffect(() => {
  //   console.log('change=', xxx.get().length)
  // }, [xxx])

  const addProductToCart = product => {
    // cartState.set(p => [...p, product])
    xxx.addProduct(product)
  }

  const productList = () => {
    return products.map(currentproduct => (
      <div className="mt-3">
        <Product product={currentproduct} addProductToCart={addProductToCart} />
      </div>
    ))
  }

  return (
    <>

      <tbody>
        <div className="container"></div>
        <div className="d-flex flex-wrap justify-content-around">
          {productList()}
        </div>
      </tbody>

    </>

  );
}
export default ProductByCategory;



