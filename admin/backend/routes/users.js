const router = require('express').Router();
const userController = require('../controllers/user.controller');

function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
      return next();
    } else {
      return res.status(401).send('Required Login');
    }
  }

router.post('/signup', userController.create);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

module.exports = router;
