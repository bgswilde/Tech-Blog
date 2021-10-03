const router = require('express').Router();

const apiRoutes = require('./api');
const blogRoutes = require('./blog-routes');
const dashboardRoutes = require('./dashboard-routes');

// establishes api routes from api/index.js file at the /api path
router.use('/api', apiRoutes);
// establishes routes from the homepage (blogRoutes, /) and dashboard (dashboardRoutes, /dashboard)
router.use('/', blogRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;