const multer = require('multer');
const path = require('path');

const helpers = require('../helpers');

const Product = require('../models/product.model');
const Category = require('../models/category.model');

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
    .populate('category')
    .exec((err, data) => {
      if (err) {
        return res.status(400).send({ err });
      }
      res.json({ product: data });
    });
};

exports.getList = (req, res) => {
  Product.find()
  .sort('-createdAt')
    .populate('category')
    .exec((err, data) => {
      if (err) {
        res.status(400).send({ err });
      }
      res.json({ products: data });
    });
};

exports.getByCategory = (req, res) => {
  const catId = req.params.id || 0;

      // Get all products based on catId
      Product.find({ 'category': catId })
        .exec((err, data) => {
          if (err) {
            return res.status(400).send({ err });
          }

          res.json({ product: data });
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