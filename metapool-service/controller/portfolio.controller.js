const { logger } = require('../config/logger');
const {createPortfolio, withDraw, createPortfolioConfig, getPortfolioById} = require('../service/portfolio.service')

exports.createPortfolio = async(req, res, next) =>{
    try {
        let request = {
            portfolioId: req.body.portfolioId,
            amount: req.body.amount
        }
        let resp = await createPortfolio(request);
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Create portfolio error: ", err.message);
        next(err)
    }
}

exports.withDrawPortfolio = async(req, res, next) =>{
    try {
        let request = {
            sender: req.body.sender,
            amount: req.body.amount,
            portfolioId: req.body.portfolioId
        }
        let resp = await withDraw(request)
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Withdraw portfolio error: ", err.message)
        next(err)
    }
}

exports.createPortfolioConfig = async(req, res, next) =>{
    try {
        let request = {
            configId: req.body.configId,
            duration: req.body.duration,
            symbol: req.body.symbol,
            portfolioId: req.body.portfolioId,
            bidRate: req.body.bidRate
        }
        let resp = await createPortfolioConfig(request)
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Create portfolio config error: ", err.message)
        next(err)
    }
}

exports.getPortfolioById = async(req, res, next) =>{
    try {
        let request = {
            portfolioId: req.body.portfolioId,
        }
        let resp = await getPortfolioById(request)
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Get portfolio id error: ", err.message)
        next(err)
    }
}
