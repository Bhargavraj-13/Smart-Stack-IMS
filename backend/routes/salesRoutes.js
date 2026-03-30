const express = require('express');
const router = express.Router();
const { recordSale, getAnalytics } = require('../controllers/salesController');

router.post('/:productId', recordSale);
router.get('/analytics', getAnalytics);

module.exports = router;
