const sdk = require("@metapool/eth-liquid-staking-sdk")
const ethers = require("ethers")

exports.stake_metapool = async () => {
    console.log("Starting to stake: ")
    const NETWORK = "goerli"
    const PROVIDER_API_KEY = "gRqv46vsdKXQrAL2Mp3w9AGLGqqKgr1B"
    const WALLET_PRIVATE_KEY = "0xe8760f571a080f177b22ee7345c02c049bc4f1d8fcbf562a1e6ca315531ecf5b"
    const provider = new ethers.AlchemyProvider(NETWORK, PROVIDER_API_KEY)
    const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider)
    const stakingContractAddress = "0x748c905130CC15b92B97084Fd1eEBc2d2419146f"

    const stakingContract = new sdk.StakingContract(wallet, stakingContractAddress)
    const totalSupply = await stakingContract.totalSupply()
    console.log("T", totalSupply)

    return totalSupply
}