
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useCartState from '../state/cart.state'
import { useState as useStateHook } from '@hookstate/core';

const Product = props => (
  <tr>
    <td>{props.product.name}</td>
    <td><img width="100px" height="100px" src={`http://localhost:5000/uploads/${props.product.uploadedImage}`} /></td>
    <td>{props.product.category.name} </td>
    <td>{props.product.price - props.product.price / 100 * props.product.discount}</td>
    <td>{props.product.discount}</td>
    <td>
      <a className="btn btn-danger" href="#" onClick={() => { props.deleteProduct(props.product) }}>Delete</a>
    </td>
  </tr>
)

const ProductCart = (props) => {
  const xxx = useCartState();
  const [currentProduct, setCurrentProduct] = useState();
  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const totalAmount = xxx.sumPrice;
  console.log('total', totalAmount)

  useEffect(() => {
    // axios.get('/api/products/' + props.match.params.id)
    //   .then(response => {
    //     setProducts(response.data.product);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
  }, []);

  const onChangeName = (e) => {
    setName(
      e.target.value
    );
  }

  const onChangePhone = (e) => {
    setPhone(e.target.value
    );
  }

  const onChangeAddress = (e) => {
    setAddress(e.target.value
    );
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    xxx.remove(currentProduct)
    setOpen(false);
    // axios.delete('/api/products/' + currentProduct.id).then(res => console.log(res.data));
  };

  const deleteProduct = (product) => {
    setOpen(true);
    setCurrentProduct(product);
  }

  const Pay = (e) => {
    e.preventDefault();

    let detailObject = {}

    xxx.list.forEach((product, index) => {
      if (detailObject[product._id]) {
        detailObject[product._id] = detailObject[product._id] + 1
      } else {
        detailObject[product._id] = 1;
      }
    })

    // convert
    let details = []

    for (const [key, value] of Object.entries(detailObject)) {
      details.push({
        "productId": key,
        "quantity": value
      })
    }

    console.log(details);

    const cart = {
      name,
      address,
      phone,
      totalAmount,
      details,
    }

    axios.post('/api/orders', cart)
      .then(res => {
        console.log(res.data);
        alert('You have successfully ordered. We will contact you as soon as possible')
        window.location = "/"
      });

  }


  const productList = () => {
    console.log('productList=', xxx.list);
    return xxx.list.map((currentproduct, index) =>
      <Product product={currentproduct} deleteProduct={deleteProduct} key={index} />
    )
  }

  return (
    <div className="d-flex flex-column justify-content-center mt-2 mr-5 ml-5" >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure delete product ?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <div className="d-flex justify-content-center">
        <h3 className="text-center text-info">My Cart</h3>
      </div>

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount (%)</th>
            {/* <th>Description</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody >
          {productList()}
        </tbody>
      </table>
      <td className="btn btn-dark mr-5 ml-5">Total amount: {xxx.sumPrice}</td>

      <div className="pt-5 mr-5 ml-5">
        <div className="d-flex flex-column justify-content-center h-100">
          <div className="card-header mt-3">
            <h3 className="text-center text-info">Enter information</h3>
          </div>
          <div className="input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="fas fa-user" /></span>
            </div>
            <input type="text"
              required
              className="form-control"
              value={name}
              onChange={onChangeName}
              placeholder="Full name"
            />
          </div>
          <div className="input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="fas fa-map-marker-alt" /></span>
            </div>
            <input type="text"
              required
              className="form-control"
              value={address}
              onChange={onChangeAddress}
              placeholder="Address"
            />
          </div>
          <div className="input-group form-group">
            <div className="input-group-prepend">
              <span className="input-group-text"><i className="fas fa-phone" /></span>
            </div>
            <input type="text"
              required
              className="form-control"
              value={phone}
              onChange={onChangePhone}
              placeholder="Number phone"
            />
          </div>
        </div>
      </div>
      <button onClick={Pay} className="btn btn-danger mb-4 mr-5 ml-5">Pay</button>
    </div>


  );
}
export default ProductCart;