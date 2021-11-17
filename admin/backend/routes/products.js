const router = require('express').Router();
const productController = require('../controllers/product.controller');

function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).send('Required Login');
  }
}

router.get('/',requireLogin, productController.getList);
router.get('/:id',requireLogin, productController.get);
router.post('/:id/uploads', requireLogin, productController.uploadImages);

router.post('/add', requireLogin, productController.create);

router.put('/update/:id', requireLogin ,productController.update);
router.delete('/:id',requireLogin, productController.remove);

module.exports = router;


// router.route('/').get((req, res) => {
//   Product.find()
//     .then(products => res.json(products))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/add').post((req, res) => {
//   const namecategory = req.body.namecategory;
//   const nameproduct = req.body.nameproduct;
//   const price = Number(req.body.price);
//   const discount = Number (req.body.discount);
//   const guarantee = req.body.guarantee;
//   const description = req.body.description;

//   const newProduct = new Product({namecategory,nameproduct,price,discount,guarantee, description});

//   newProduct.save()
//     .then(() => res.json('Product added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').get((req, res) => {
//   Product.findById(req.params.id)
//     .then(product => res.json(product))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
// router.route('/:id').delete((req, res) => {
//   Product.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Product deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
// router.route('/update/:id').post((req, res) => {
//   Product.findById(req.params.id)
//     .then(product => {
//       product.namecategory = req.body.namecategory;
//       product.nameproduct = req.body.nameproduct;
//       product.price = Number(req.body.price);
//       product.discount = Number(req.body.discount);
//       product.guarantee = req.body.guarantee;
//       product.description = req.body.description;

//       product.save()
//         .then(() => res.json('Product updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// module.exports = router;
