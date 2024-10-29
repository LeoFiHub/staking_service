// const Contract = require('web3-eth-contract');
// const bluebird = require('bluebird'); // eslint-disable-line no-global-assign
// const redis = require("redis");
// const Web3 = require('web3')
// const {redisUrl, leofiCfg, contractParams} = require("../config/vars");
// let redisClient = redis.createClient(redisUrl);
// bluebird.promisifyAll(redis);

// //contract config 
// const {setAdminToken} = require('./token.service')
// const orderAbi = require("../abi/orderAbi.json");
// const orderByteCode = require('../abi/orderByteCode.json');
// const {provider, contractProvider} = require('../utils/provider')

// const web3 = new Web3(leofiCfg.providerUrl)

// Contract.setProvider(provider)

// exports.createOrder = async (req) =>{
//     // let contract = new Contract(orderAbi, orderContractAddress);
//     //set key - orderaddress 
//     let deployContract = new web3.eth.Contract(orderAbi)
//     let payload = {
//         data: orderByteCode.object,
//         arguments: [
//             leofiCfg.contractOwnerAddr, //fee wallet address
//             [req.portfolioId,req.symbol,req.side,0,0,0,0,req.amount,0,0,req.duration], //order info
//             req.owner, //trader set owner of order
//             leofiCfg.leofiPriceFeedAddress // priceFeed address
//         ]
//     }
//     let deployTx =deployContract.deploy(payload)
//     const createTransaction = await web3.eth.accounts.signTransaction(
//         {
//            from: leofiCfg.contractOwnerAddr,
//            data: deployTx.encodeABI(),
//            gas: 5000000,
//            gasPrice: contractParams.gasPrice,
//            value: web3.utils.toWei(JSON.stringify(req.amount), 'ether')
//         },
//         leofiCfg.contractOwnerPriv
//     );
//     const createReceipt = await web3.eth.sendSignedTransaction(
//         createTransaction.rawTransaction
//     );
//     console.log('Contract deployed at address', createReceipt.contractAddress);
//     let orderInfo = {
//         orderId: createReceipt.contractAddress,
//         symbol: req.symbol,
//         createdAt: Date.now(),
//         status: 0
//     }
//     if(orderInfo.orderId == ''){
//         return 'Error missing orderId'
//     }
//     let request = {
//         orderContractAddress: createReceipt.contractAddress,
//         owner: req.owner,
//         admin: createReceipt.contractAddress,
//     }

//     let respSetAdmin = await setAdminToken(request)
//     console.log("Resp set admin token: ", respSetAdmin.transactionHash, " -s: ", respSetAdmin.status)

//     let receipt = await redisClient.zadd(req.portfolioId, req.score, JSON.stringify(orderInfo));
//     return receipt
// }