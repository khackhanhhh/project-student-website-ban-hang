const Order = require("../models/order.model");

exports.create = (req, res) => {
  const order = new Order({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    totalAmount: req.body.totalAmount,
    details: req.body.details,
    status: 'New'
  });

  order
    .save()
    .then((result) => {
      res.json({ order: result });
    })
    .catch((err) => res.status(400).send({ err }));
};
