const seesion = require('express-session');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

exports.get = (req, res) => {
  const catId = req.params.id || 0;

  Category
    .findById(catId)
    .populate('-password -email')
    .exec((err, category) => {
      if (err) {
        return res.status(400).send({ err });
      }
      // Get all products based on catId
      Product.find({ 'category': catId })
        .exec((err, data) => {
          if (err) {
            return res.status(400).send({ err });
          }

          category.products = data; 
          res.json({ category: category });
        });
    });
};


exports.getList = (req, res) => {
  Category.find()
    .populate('-password -email')
    .exec((err, data) => {
      if (err) {
        res.status(500).send({ err });
      }
      res.json({ categories: data });
    });
};

