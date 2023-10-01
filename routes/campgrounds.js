const express = require('express');
const router = express.Router();
const Campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campgrounds');
const campgrounds = require('../models/campgrounds');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(catchAsync(Campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(Campgrounds.createCampground));

//router.get('/', catchAsync(Campgrounds.index));

//router.post('/', validateCampground, isLoggedIn, catchAsync(Campgrounds.createCampground))

router.get('/new', isLoggedIn, Campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(Campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(Campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(Campgrounds.deleteCampground))


// router.get('/:id', catchAsync(Campgrounds.showCampground))
// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(Campgrounds.updateCampground))
// router.del ete('/:id', isLoggedIn, isAuthor, catchAsync(Campgrounds.deleteCampground))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(Campgrounds.renderEditForm))

module.exports = router;