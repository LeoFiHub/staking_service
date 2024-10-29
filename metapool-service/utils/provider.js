const HDWalletProvider = require("@truffle/hdwallet-provider");
const {leofiCfg} = require('../config/vars');
exports.contractProvider = require('web3-eth-contract');

exports.provider = new HDWalletProvider({ 
    privateKeys: [leofiCfg.contractOwnerPriv], 
    providerOrUrl: leofiCfg.providerUrl,
    pollingInterval: 8000
});

exports.adminProvider = new HDWalletProvider({
    privateKeys: [leofiCfg.leofiAdminPriv],
    providerOrUrl: leofiCfg.providerUrl,
    pollingInterval: 8000,
    networkCheckTimeout: 1000000,
    timeoutBlocks: 200
})

this.contractProvider.setProvider(this.provider)
