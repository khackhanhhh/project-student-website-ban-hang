const router = require('express').Router();
const CustomerController = require('../controllers/customer.controller');

router.post('/signup', CustomerController.create);
router.post('/login', CustomerController.login);
router.post('/logout', CustomerController.logout);

module.exports = router;
