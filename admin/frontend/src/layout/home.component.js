import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Navbar from "./navbar.component";
import ProductsList from "../components/product/products-list.component";
import EditProduct from "../components/product/edit-product.component";
import CreateProduct from "../components/product/create-product.component";
import CreateCategory from "../components/category/create-category.component";
import CategoryList from "../components/category/category-list.component";
import EditCategory from "../components/category/edit-category.component";
import Logout from "../components/Login/Logout.conponent";
import Signup from '../components/Login/Signup.component';
import Orders from '../components/orders/orders-list';
import EditOrder from '../components/orders/edit-order';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const Home = () => {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <Navbar />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className="container-xxl ml-5 mr-5 opacity-3">
            <Route path="/" exact component={ProductsList} />
            <Route path="/edit/:id" component={EditProduct} />
            <Route path="/create" component={CreateProduct} />
            <Route path="/category" component={CreateCategory} />
            <Route path="/categorylist" component={CategoryList} />
            <Route path="/categories/edit/:id" component={EditCategory} />
            <Route path="/signup" component={Signup} />
            <Route path="/orders" component={Orders} />
            <Route path="/order/edit/:id" component={EditOrder} />
            {/* <Route path="/logout"  component={Logout} /> */}
          </div>
        </main>
      </div>
    </Router>
  )
}
export default Home
