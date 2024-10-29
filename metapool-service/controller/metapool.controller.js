const {
    stake_metapool
} = require('../service/metapool.service')
const { logger } = require('../config/logger');

exports.staking_pool = async(req, res, next) =>{
    try {    
        let resp = await stake_metapool()
        res.json({
            code: 0,
            data: resp
        })
    } catch (err) {
        logger.info("Staking error: ", err.message)
        next(err)
    }
}
