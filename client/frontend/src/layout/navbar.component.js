import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import clsx from 'clsx';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ProductByCategory from '../components/Product/product-by-category.component';
import useCartState from '../components/state/cart.state'
import { useState as useStateHook } from '@hookstate/core';

const Category = props => (
  <Link to={`/category/${props.categories._id}`} className="nav-link">{props.categories.name}</Link>
)

const Navbar = (props) => {
  const xxx = useCartState();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('/api/categories')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const CategoriesList = () => {
    return categories.map(currentcategories => {
      return (
        <li className="navbar-item">
          <Category categories={currentcategories} />
        </li>

      )

    })
  }

  let history = useHistory();

  const handleLogout = () => {
    axios.post('/api/customers/logout/')
      .then(res => {
        console.log(res.data);
        window.location = '/login';
      })
      .catch(() => {
        alert('Logout fail')
      }
      )
  }
  return (
    <nav className="d-flex justify-content-between align-items-center container-fluid navbar navbar-dark bg-dark navbar-expand-lg pr-5 pl-5">
      <div>
        <Link to="/" className="navbar-brand">Laptop KhanhKun</Link>
      </div>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto ">
          {/* <li className="navbar-item">
            <Link to="/dell" className="nav-link">Dell</Link>
          </li>
          <li className="navbar-item">
            <Link to="/macbook" className="nav-link">Macbook</Link>
          </li>
          <li className="navbar-item">
            <Link to="/hp" className="nav-link">HP</Link>
          </li>
          <li className="navbar-item">
            <Link to="/asus" className="nav-link">Asus</Link>
          </li> */}
          {CategoriesList()}
        </ul>
      </div>
      <div className="">
        <Link to="/cart" className="text-white">
          <ShoppingCartIcon className="mr-3 ShoppingCartIcon" />
          {xxx.list.length}
        </ Link>
        {/* <button className="btn btn-secondary mb-2 mr-3 pr-2 pl-2 ">
          <Link to="/login" className="text-white" >Sign in</Link>
        </button>
        <button className="btn btn-secondary mb-2 mr-3 pr-2 pl-2 ">
          <Link to="/signup" className="text-white" >Sign up</Link>
        </button> */}
        {/* <button onClick={handleLogout} className="btn btn-secondary mb-2 mr-3 pr-2 pl-2 ">
          Log out
        </button> */}
      </div>
    </nav>
  );
}
export default Navbar;