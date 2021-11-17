const seesion = require('express-session');
const Category = require('../models/category.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

exports.get = (req, res) => {
  const catId = req.params.id || 0;

  Category
    .findById(catId)
    .populate('createdBy', '-password -email')
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

exports.create = (req, res) => {
  const user = req.session.user;
  const name = req.body.name;
  
    const category = new Category({
      name: name,
      createdBy: user
    });

    category.save()
      .then((result) => {
        res.json({ category: result });
      })
      .catch(err => res.status(400).send({ err }));
};

exports.getList = (req, res) => {
  Category.find()
    .populate('createdBy',  '-password -email')
    .exec((err, data) => {
      if (err) {
        res.status(500).send({ err });
      }
      res.json({ categories: data });
    });
};

exports.update = (req, res) => {

  const name = req.body.name
  const data = {
    name: name
  };
  Category.findByIdAndUpdate(req.params.id, data, (err, category) => {
    if (err) return res.status(500).send(err);
    if (category == null) {
      res.status(500).send({ err: "ko duoc sua!" });
    } else res.json(category);
  });
};

exports.remove = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: "Category not found with id " + req.params.id,
        });
      }
      res.send({ message: "Category deleted successfully!" });
    });
};
