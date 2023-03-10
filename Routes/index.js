const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/profilepost', require('./posts'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));


// for anty further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;