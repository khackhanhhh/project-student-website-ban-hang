const Order = require("../models/order.model");
const Product = require("../models/product.model");

exports.create = (req, res) => {
  const order = new Order({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    totalAmount: req.body.totalAmount,
    details: req.body.details,
    status: "New",
  });

  order
    .save()
    .then((result) => {
      res.json({ order: result });
    })
    .catch((err) => res.status(400).send({ err }));
};

exports.getList = async (req, res) => {
  Order.find().exec(async (err, orders) => {
    if (err) {
      res.status(500).send({ err });
    }

    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        let data = orders[i];

        if (data && data.details) {
          for (let j = 0; j < data.details.length; j++) {
            try {
              const product = await Product
                .findById(data.details[j].productId)
                .populate('category')
                .exec(

                );

              data.details[j].product = product;
            } catch (error) {
              res.status(500).send({ err });
            }
          }
        }
      }
    }
    res.json({ orders: orders });
  });
};

exports.get =async (req,res) => {
  Order.findById(req.params.id).exec(async (err, orders) => {
    if (err) {
      res.status(500).send({ err });
    }

    for (let j = 0; j < orders.details.length; j++) {
      try {
        console.log(orders.details[j].productId)
        const product = await Product
          .findById(orders.details[j].productId)
          .populate('category')
          .exec(

          );

          orders.details[j].product = product;
      } catch (error) {
        res.status(500).send({ err });
      }
    }

    // if (orders) {
    //   for (let i = 0; i < orders.length; i++) {
    //     let data = orders[i];

    //     if (data && data.details) {
    //       for (let j = 0; j < data.details.length; j++) {
    //         try {
    //           const product = await Product
    //             .findById(data.details[j].productId)
    //             .populate('category')
    //             .exec(

    //             );

    //           data.details[j].product = product;
    //         } catch (error) {
    //           res.status(500).send({ err });
    //         }
    //       }
    //     }
    //   }
    // }
    res.json({ orders: orders });
  });
  // console.log('detail', req.params.id);

  // const orderId = req.params.id || 0;
  // Order
  // .findById(orderId)
  // .exec(async(err,orders)=> {
  //   if (err) {
  //     return res.status(500).send({ err });
  //   }

  //   if (orders) {
  //     for (let i = 0; i < orders.length; i++) {
  //       let data = orders[i];

  //       if (data && data.details) {
  //         for (let j = 0; j < data.details.length; j++) {
  //           try {
  //             const product = await Product
  //               .findById(data.details[j].productId)
  //               .populate('category')
  //               .exec();
  //               data.details[j].product = product;

  //               console.log('product=', product, j);
  //           } catch (error) {
  //             res.status(500).send({ err });
  //           }
  //         }
  //       }
  //     }
  //   }
  //   res.json({ orders: orders });
  // });
}



exports.update = (req, res) => {

  const status = req.body.status
  const data = {
    status: status
  };
  Order.findByIdAndUpdate(req.params.id, data, (err, order) => {
    if (err) return res.status(500).send(err);
    if (order == null) {
      res.status(500).send({ err: "ko duoc sua!" });
    } else res.json(order);
  });
};

exports.remove = (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then((order) => {
      if (!order) {
        return res.status(404).send({
          message: "Order not found with id " + req.params.id,
        });
      }
      res.send({ message: "Order deleted successfully!" });
    });
};
