const router = require('express').Router();
const productController = require('../controllers/product.controller');

// function requireLogin(req, res, next) {
//   if (req.session && req.session.user) {
//     return next();
//   } else {
//     return res.status(401).send('Required Login');
//   }
// }

router.get('/', productController.getList);
router.get('/:id', productController.get);
router.get('/category/:id', productController.getByCategory);
router.post('/:id/uploads', productController.uploadImages);


module.exports = router;
 