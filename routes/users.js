const express = require('express');
const router = express.Router();
//{ mergeParams: true }
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const users = require('../controllers/users');


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))


// router.get('/register', users.renderRegister);
// router.post('/register', catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: ('/login'), keepSessionInfo: true }), users.login)

// router.get('/login', users.renderLogin)
// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: ('/login'), keepSessionInfo: true }), users.login)

router.get('/logout', users.logout);

//Colts Code was old
// router.get('/logout', (req, res) => {
//     req.logout();
//     req.flash('success', 'logged out successfully');
//     res.redirect('/campground');

// })



module.exports = router;