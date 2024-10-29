const express = require('express');
const metapoolController = require("../controller/metapool.controller")

const metaRouter = express.Router();

metaRouter.route('/stake').get(metapoolController.staking_pool)

module.exports = metaRouter;
