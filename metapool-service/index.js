Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { logger } = require('./config/logger');
const redis = require("redis");
const{redisUrl, redisTopics, env} = require("./config/vars")
// const subscriber = redis.createClient(redisUrl);
// const publisher = redis.createClient(redisUrl);
const app = require('./config/express')

// (async () => {
//     // try {
//     //     // set global variables for all module can use;
//     //     global.logger = logger;
//     //     subscriber.on("message", async (channel, message) => {
//     //         try {
//     //             // let data = JSON.parse(message); 
//     //             // if (!data.contract) return;
//     //             // logger.info(`Set price request: ${message}`);
//     //             // let result = await setPriceFeed("message");
//     //             logger.info(`Set new price for symbol, transaction ${result.transactionHash}`);
//     //             publisher.publish(redisTopics.priceResult, JSON.stringify("result"));
//     //         } catch (e) {
//     //             logger.error(`Set price feed failed: ${e.message}`);
//     //         }
//     //     });
//     //     // console.log("PQD come here: ", redisTopics.priceRequest, " -r: ", redisTopics.priceResult)
//     //     subscriber.subscribe(redisTopics.priceRequest);
//     // } catch (err) {
//     //     logger.error(`Error: ${err.message}`);
//     // }

//     return true;
// })();

module.exports = app;


