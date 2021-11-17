const router = require('express').Router();
const categoryController = require('../controllers/category.controller');

// function requireLogin(req, res, next) {
//   if (req.session && req.session.user) {
//     return next();
//   } else {
//     return res.status(401).send('Required Login');
//   }
// }

router.get('/', categoryController.getList);
router.get('/:id', categoryController.get);

module.exports = router;
 