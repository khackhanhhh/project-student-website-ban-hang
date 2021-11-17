const router = require('express').Router();
const OrderController = require('../controllers/order.controller');

function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
      return next();
    } else {
      return res.status(401).send('Required Login');
    }
  }

router.post('/',requireLogin, OrderController.create);
router.get('/', requireLogin, OrderController.getList);
router.get('/:id' , requireLogin, OrderController.get);
router.delete('/:id' ,requireLogin, OrderController.remove);
router.put('/update/:id', requireLogin, OrderController.update);

module.exports = router;
