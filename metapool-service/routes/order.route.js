const express = require('express');
const orderController = require("../controller/order.controller")

const orderRouter = express.Router();

orderRouter.route('/createOrder').post(orderController.createOrder);
orderRouter.route('/setPriceOrder').post(orderController.setPriceOrder);
orderRouter.route('/confirmResult').post(orderController.confirmResult);
orderRouter.route('/claimProfit').post(orderController.claimProfit);
orderRouter.route('/payToPool').post(orderController.payToPool)

module.exports = orderRouter;
