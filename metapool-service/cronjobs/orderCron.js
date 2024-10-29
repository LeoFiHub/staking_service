// const cron = require('node-cron');
// const { scanPendingOrder, setPriceOrder } = require('../service/order.service')
// const {getLatestPrice} = require('../service/priceFeed_service')
// const {redisUrl} = require('../config/vars')
// const redis = require('redis')
// let redisClient = redis.createClient(redisUrl)

// cron.schedule('*/10 * * * * *', async function() {
//     console.log("running a task every 10 second");
//     let pendingOrders = await scanPendingOrder(1);
//     for(let i = 0; i < pendingOrders.length; i++){
//         order = JSON.parse(pendingOrders[i])
//         let latestPrice = await getLatestPrice(order.symbol);
//         console.log("Pending orders: ", order.orderId, " - price: ", latestPrice[0])
//         let reqSetPrice = {
//             price: latestPrice[0],
//             symbol: order.symbol,
//             orderContractAddress: order.orderId
//         }

//         try {
//             let resp = await setPriceOrder(reqSetPrice)
//             let orderInfo = `{\"orderId\":\"${order.orderId}\",\"symbol\":\"${order.symbol}\",\"createdAt\":${order.createdAt},\"status\":0}`
//             let response = await redisClient.zrem(1, orderInfo)
//             console.log("Resp: ", resp.transactionHash, " -r: ", response)
//         } catch (err) {
//             console.log(err.message)
//         }
//     }
// });