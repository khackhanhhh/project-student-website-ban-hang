const multer = require('multer');
const path = require('path');

const helpers = require('../helpers');

const Product = require('../models/product.model');
const Category = require('../models/category.model');
const User = require('../models/user.model');

////////////////////////////////////

// define the storage location for our images
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

////////////////////////////////////

exports.get = (req, res) => {
  const proId = req.params.id || 0;
  Product
    .findById(proId)
    .populate('createdBy', '-password -email')
    .populate('category')
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({ err });
      }

      res.json({ product: data });
    });
};

exports.create = (req, res) => {

  const productName = req.body.name;
  const price = Number(req.body.price);
  const discount = Number(req.body.discount);
  const guarantee = Number(req.body.guarantee);
  const catId = req.body.catId;
  const user = req.session.user;
  const description = req.body.description;


    const product = new Product({
      name: productName,
      price: price,
      discount: discount,
      guarantee: guarantee,
      category: catId,
      createdBy: user,
      description: description,
    });
    Category
      .findById(catId)
      .exec((err, data) => {
        if (err) {
          res.status(400).send({ err });
        }
        product.save()
          .then((data) => {
            res.json({ productnew: data });
          })
          .catch(err => res.status(400).send({ err }));
      }
      )
      console.log(catId)
}

exports.getList = (req, res) => {
  Product.find()
    .populate('createdBy', '-password -email')
    .populate('category')
    .exec((err, data) => {
      if (err) {
        res.status(400).send({ err });
      }
      res.json({ products: data });
    });
};

exports.update = (req, res) => {
  const productName = req.body.name;
  const price = Number(req.body.price);
  const discount = Number(req.body.discount);
  const guarantee = Number(req.body.guarantee);
  const catId = req.body.catId;
  const description =req.body.description;
  // const proId = req.params.id;


  const data = {
    name: productName,
    price: price,
    discount: discount,
    guarantee: guarantee,
    category: catId,
    description:description,
  };
  if (Category.findById(catId) && Product.findById(req.params.id)) {
    Product.findByIdAndUpdate(req.params.id, data, (err, product) => {
      if (err) return res.status(500).send(err);
      if (product == null) {
        res.status(500).send({ err: "ko duoc sua!" });
      } else res.json(product);
    });
  } else {
    res.status(500).send({ err: "ko duoc sua!" });
  }
};

exports.remove = (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id,
        });
      }
      res.send({ message: "Product deleted successfully!" });
    });
};

exports.uploadImages = (req, res) => {
  const productId = req.params.id || null;

  // 'product_pic' is the name of our file input field in the HTML form
  let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('product_pic');

  upload(req, res, function(err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send('Please select an image to upload');
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Update image into product info
    Product.findByIdAndUpdate(productId, { uploadedImage: req.file.filename }, (err, product) => {
      if (err) return res.status(500).send(err);
      if (product == null) {
        res.status(500).send({ err: "ko duoc sua!" });
      } else res.json(product);
    });
  });
};