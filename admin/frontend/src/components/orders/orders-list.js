
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
const Order = props => (
  <tr>
    <td>{props.orders.name}</td>
    <td>{props.orders.address}</td>
    <td>{props.orders.phone}</td>
    <td>{props.orders.totalAmount}</td>
    <td>{props.orders.status}</td>
    <td>
      <Link to={"/order/edit/" + props.orders._id}><EditIcon /></Link> | <a href="#" onClick={() => { props.deleteOrder(props.orders._id) }}><DeleteIcon className="DeleteIcon" /></a>
    </td>
  </tr>
)

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [id,setId]=useState();

  useEffect(() => {
    axios.get('/api/orders')
      .then(response => {
        setOrders(response.data.orders);
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
    axios.delete('/api/orders/' + id)
      .then(res => console.log(res.data));
    setOrders(
      orders.filter(el => el._id !== id)
    )
  };
  const deleteOrder = (id) => {
    setOpen(true);
    setId(id);
  }
  const ordersList = () => {
    return orders.map(currentorder => {
      return <Order orders={currentorder} deleteOrder={deleteOrder} key={currentorder._id} />;
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
        <DialogTitle id="alert-dialog-title">{"Are you sure delete order ?"}</DialogTitle>
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
        <h3>List Orders</h3>
      </div>

      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ordersList()}
        </tbody>
      </table>
    </div>

  );
}
export default Orders;



