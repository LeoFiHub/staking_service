const express = require('express');
const portfolioController = require('../controller/portfolio.controller')

const portfolioRouter = express.Router();

portfolioRouter.route('/portfolio').post(portfolioController.createPortfolio)
portfolioRouter.route('/createPortfolioConfig').post(portfolioController.createPortfolioConfig)
portfolioRouter.route('/withdrawPortfolio').post(portfolioController.withDrawPortfolio)

module.exports = portfolioRouter;
