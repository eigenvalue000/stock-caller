const router = require('express').Router();
const userRoutes = require('./userRoutes');
const portfolioRoutes = require('./portfolioRoutes');

router.use('/users', userRoutes);
router.use('/portfolio', portfolioRoutes);

module.exports = router;
