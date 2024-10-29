const Contract = require('web3-eth-contract');
const bluebird = require('bluebird'); // eslint-disable-line no-global-assign
const HDWalletProvider = require("@truffle/hdwallet-provider");
const redis = require("redis");
const {leofiCfg} = require("../config/vars");
bluebird.promisifyAll(redis);
const {setAdminToken} = require('./token.service')
const Web3 = require('web3')
const web3 = new Web3(leofiCfg.providerUrl)


//contract config 
const gasPrice = '5000000000'
const maxErc20GasLimit = 500000
const portfolioAbi = require("../abi/portfolioAbi.json");
const provider = new HDWalletProvider({ 
    privateKeys: [leofiCfg.contractOwnerPriv], 
    providerOrUrl: leofiCfg.providerUrl,
    pollingInterval: 8000
});

const contractParams = {
    from    : leofiCfg.contractOwnerAddr,
    gasPrice: gasPrice,
    gas     : maxErc20GasLimit
};

Contract.setProvider(provider)

exports.createPortfolio = async (req)=>{
    let setAdmin = await setAdminToken({admin: leofiCfg.leofiPortfolioAddress});
    console.log("Set admin tx: ", setAdmin.transactionHash)
    let contract = new Contract(portfolioAbi, leofiCfg.leofiPortfolioAddress);
    let nonce = await getNonce(leofiCfg.contractOwnerAddr);
    try {
        let receipt = await contract.methods.createPortfolio(req.portfolioId, req.amount).send(Object.assign(contractParams, {
            nonce: nonce,
            value: web3.utils.toWei(JSON.stringify(req.amount), 'ether')
        }));
        return receipt;
    } catch (err) {
        return err.message
    }
}

exports.withDraw = async(req) =>{
    let contract = new Contract(portfolioAbi, leofiCfg.leofiPortfolioAddress)
    let nonce = await getNonce(leofiCfg.contractOwnerAddr)
    try {
        let receipt = await contract.methods.withdrawPortfolio(req.sender, req.amount, req.portfolioId).send(Object.assign(contractParams, {nonce: nonce}))
        return receipt
    } catch (err) {
        return err.message
    }
}