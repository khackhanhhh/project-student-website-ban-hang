import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const ProductOrder = props => (
    <tr>
        <td>{props.orders.product.name}</td>
        <td>{props.orders.product.price}</td>
        <td>{props.orders.product.discount}</td>
        <td>{props.orders.quantity}</td>
        <td>{props.orders.product.price * props.orders.quantity - props.orders.product.price/100*props.orders.product.discount * props.orders.quantity}</td>
    </tr>
)

const EditOrder = (props) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [product, setProduct] = useState([])
    const [totalAmount, setTotalAmount] = useState('');
    const [status, setStatus] = useState('');
    const [pro,setPro] = useState('')
    let history = useHistory();

    useEffect(() => {
        axios.get('/api/orders/' + props.match.params.id)
            .then(response => {
                setName(response.data.orders.name);
                setAddress(response.data.orders.address);
                setPhone(response.data.orders.phone);
                setProduct(response.data.orders.details);
                setTotalAmount(response.data.orders.totalAmount);
                setStatus(response.data.orders.status);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    const onChangeStatus = (e) => {
        setStatus(
            e.target.value
        );
    }


    const onSubmit = (e) => {
        e.preventDefault();

        const order = {
            status
        };

        axios.put('/api/orders/update/' + props.match.params.id, order)
            .then(res => console.log(res.data));

        window.location = '/orders';
    }

    const productList = () => {
        return product.map(currentproduct => {
            return <ProductOrder orders={currentproduct}  key={currentproduct._id} />;
        })
    }

    return (
        <div className=" mt-3">
            <h2 className="font-weight-bold">Details Order</h2>
            <div className="d-flex flex-row ">
                <p className="font-weight-bold">Name : </p>
                <p>{name}</p>
            </div>
            <div className="d-flex flex-row">
                <p className="font-weight-bold">Address : </p>
                <p>{address}</p>
            </div>
            <div className="d-flex flex-row">
                <p className="font-weight-bold">Phone :  </p>
                <p>{phone}</p>
            </div>

            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Name Product</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Amount</th>
                        <th>Sum</th>
                    </tr>
                </thead>
                <tbody>
                    {productList()}
                </tbody>
                <tr>
                <th>totalAmount</th>
                <th></th>
                <th></th>
                <th></th>
                <th>{totalAmount}</th>
                </tr>
            </table>



            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Status : </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={status}
                        onChange={onChangeStatus}
                    />
                </div>
                <div className="d-flex flex-row">
                    <div className="form-group mr-4">
                        <input type="submit" value="Save" className="btn btn-primary" />
                    </div>
                    <Link to="/orders" className="navbar-item text-light">
                        <button className="btn btn-danger form-group" >Cancel</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
export default EditOrder