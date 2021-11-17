const router = require('express').Router();
const categoryController = require('../controllers/category.controller');

// Middlewares to handle incomming requests
function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(401).send('Required Login');
  }
}

router.get('/',requireLogin, categoryController.getList);
router.post('/add', requireLogin, categoryController.create);

router.get('/:id',requireLogin, categoryController.get);
router.put('/update/:id', requireLogin,categoryController.update);
router.delete('/:id', requireLogin,categoryController.remove);

module.exports = router;

// router.route('/').get((req, res) => {
//   Category.find()
//     .then(categories => res.json(categories))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/add').post((req, res) => {
//   const namecategory = req.body.namecategory;

//   const newCategory = new Category({namecategory});

//   newCategory.save()
//     .then(() => res.json('Category added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').get((req, res) => {
//   Category.findById(req.params.id)
//     .then(category => res.json(category))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
// router.route('/:id').delete((req, res) => {
//   Category.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Category deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
// router.route('/update/:id').post((req, res) => {
//   Category.findById(req.params.id)
//     .then(category => {
//       category.namecategory = req.body.namecategory;
//       category.save()
//         .then(() => res.json('Product updated!'))
//         .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });
// module.exports = router;
