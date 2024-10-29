const { recoverPublicKey } = require('ethers/lib/utils');
const express = require('express');
const orderRoute = require('./order.route');
const portfolioRoute = require('./portfolio.route')

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
// router.use('/order', orderRoute);
router.use('/portfolio', portfolioRoute);

module.exports = router;
