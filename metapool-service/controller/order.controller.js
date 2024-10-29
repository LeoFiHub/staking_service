const {
    createOrder,
    setPriceOrder,
    confirmResult,
    claimProfit,
    payToPool
} = require('../service/order.service')
const { logger } = require('../config/logger');

exports.createOrder = async(req, res, next) =>{
    try {
        let request = {
            orderId: req.body.orderId,
            symbol: req.body.symbol,
            portfolioId: req.body.portfolioId,
            score: req.body.score,
            owner: req.body.owner,
            side: req.body.side, //int 
            duration: req.body.duration, //int
            amount: req.body.amount //int 
        }
        let resp = await createOrder(request)
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Create order error: ", err.message)
        next(err)
    }
}

exports.setPriceOrder = async(req, res, next) =>{
    try {
        let request = {
            price: req.body.price,
            symbol: req.body.symbol,
            orderContractAddress: req.body.orderContractAddress
        }
        let resp = await setPriceOrder(request)
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Set price order error: ", err.message)
        next(err)
    }
}

exports.confirmResult = async(req, res, next) =>{
    try {
        let request = {
            orderContractAddress: req.body.orderContractAddress,
            symbol: req.body.symbol
        }
        let resp = await confirmResult(request)
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Confirm result error: ", err.message)
        next(err)
    }
}

exports.claimProfit = async(req, res, next) =>{
    try {
        let request = {
            orderContractAddress: req.body.orderContractAddress,
            sender: req.body.sender,
            amount: req.body.amount
        }
        let resp = await claimProfit(request)
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Claim profit error: ", err.message)
        next(err)
    }
}

exports.payToPool = async(req, res, next) =>{
    try {
        let request = {
            orderContractAddress: req.body.orderContractAddress,
            amount: req.body.amount
        }
        let resp = await payToPool(request)
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Pay to pool error: ", err.message)
        next(err)
    }
}