
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
const Product = props => (
  <tr>
    <td>{props.product.name}</td>
    <td><img width ="100px" height="100px" src={`/uploads/${props.product.uploadedImage}`} /></td>
    <td>{props.product.category.name} </td>
    <td>{props.product.price}</td>
    <td>{props.product.discount}</td>
    <td>{props.product.createdBy.username}</td>
    {/* <td>{props.product.description}</td> */}
    <td>
      <Link to={"/edit/" + props.product._id}><EditIcon /></Link> | <a href="#" onClick={() => { props.deleteProduct(props.product._id) }}><DeleteIcon className="DeleteIcon" /></a>
    </td>
  </tr>
)

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [id,setId]=useState();

  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    setOpen(false);
    axios.delete('/api/products/' + id)
      .then(res => console.log(res.data));
    setProducts(
      products.filter(el => el._id !== id)
    )
  };
  const deleteProduct = (id) => {
    setOpen(true);
    setId(id);
  }
  const productList = () => {
    return products.map(currentproduct => {
      return <Product product={currentproduct} deleteProduct={deleteProduct} key={currentproduct._id} />;
    })
  }

  return (
    <div className=" mt-3" >
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
      <div className="d-flex justify-content-between ">
        <h3>List Product</h3>

        <Link to="/create" className="navbar-item text-light">
          <button className="btn btn-success mb-2 mr-3 ">Add</button>
        </Link>

      </div>

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount (%)</th>
            <th>Create By</th>
            {/* <th>Description</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList()}
        </tbody>
      </table>
    </div>

  );
}
export default ProductList;



