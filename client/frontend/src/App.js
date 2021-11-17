import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './layout/navbar.component';
import Login from "./components/Login/Login.component";
import Signup from "./components/Login/Signup.component";
import ProductList from './components/Product/products-list.component';
import ProductDetails from './components/Product/product-details.component';
import ProductByCategory from './components/Product/product-by-category.component';
import ProductCart from './components/Product/product-cart.component';


function App() {
  return (
    <Router>
      <div className="container-xxl ml-5 mr-5">
      <Navbar />
      <br/>
      <Route path="/" exact component={ProductList} />
      <Route path="/login"  component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/details/:id" component={ProductDetails} />
      <Route path="/category/:id" component={ProductByCategory} />
      <Route path="/cart/" component={ProductCart} />

      {/* <Route path="/edit/:id" component={EditProduct} />
      <Route path="/create" component={CreateProduct} />
      <Route path="/category" component={CreateCategory} />
      <Route path="/categorylist" component={CategoryList} />
      <Route path="/categories/edit/:id" component={EditCategory} /> */}
      </div>
    </Router>
    
  );
 }

export default App;