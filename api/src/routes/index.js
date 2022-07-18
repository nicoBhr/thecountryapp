const { Router } = require('express');
const countryRoutes = require('./country.js');
const activityRoutes = require('./activity.js');
const router = Router();

router.use('/countries', countryRoutes);
router.use('/activity', activityRoutes);

module.exports = router;
