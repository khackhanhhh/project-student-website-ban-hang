const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');

require('dotenv').config();

/////////////////////// APP CONFIGURATION

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET_KEY,
    cookie: { maxAge: 86400000  },
  })
);
// app.use('/uploads', express.static('uploads'));

/////////////////////// DATABASE CONNECTION

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify : false,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

/////////////////////// ROUTES

const categoriesRoute = require('./routes/categories');
const productsRoute = require('./routes/products');
const customersRoute = require('./routes/customers');
const ordersRoute = require('./routes/orders');

app.use('/api/categories', categoriesRoute);
app.use('/api/products', productsRoute);
app.use('/api/customers', customersRoute);
app.use('/api/orders', ordersRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
