const router = require('express').Router();
const blogpostRoutes = require('./blogpost-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');

// sets up the path location routes for api calls
router.use('/users', userRoutes);
router.use('/blogposts', blogpostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;