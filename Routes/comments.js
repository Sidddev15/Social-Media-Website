const express = require('express');
const router = express.Router();
const passport = require('passport');


const commentscontroller = require('../Controllers/comments_controller');

router.post('/create', passport.checkAuthentication, commentscontroller.create);
router.get('/destroy/:id', passport.checkAuthentication,commentscontroller.destroy);
module.exports = router;