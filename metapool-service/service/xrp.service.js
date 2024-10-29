// const Contract = require('web3-eth-contract');

// const tokenAbi = require("../abi/tokenAbi.json");
// const {provider} = require('../utils/provider')

// Contract.setProvider(provider)

// exports.setAdminToken = async(req) =>{
//     let contract = new Contract(tokenAbi, leofiCfg.leofiTokenAddress)
//     let nonce = await getNonce(leofiCfg.contractOwnerAddr)
//     try {
//         let receipt = await contract.methods.addWhiteListAddress(req.admin).send(Object.assign(contractParams, {nonce: nonce}))
//         return receipt
//     } catch (err) {
//         return err.message
//     }
// }

const xrpl = require('xrpl')
const {leofiCfg, contractParams} = require('../config/vars')

exports.mint_nft = async () => {
    const account = "rP7aApVAyf3bjtRVVTixVSHBbU4kpd742k"

    // Connect to a testnet node
    console.log("Connecting to testnet...")
    const client = new xrpl.Client('wss://s.devnet.rippletest.net:51233')
    await client.connect()

    const standby_wallet = xrpl.Wallet.fromSeed("sEdVd1vJvRcoXCmrx7SwY8g2bhaD35h")
    const transactionJson = {
        "TransactionType": "NFTokenMint",
        "Account": "rH4PVgbcK9ryvSp37gYYHhgYK3D47FGNY7",
        "URI": xrpl.convertStringToHex("x.com"),
        "Flags": parseInt("1"),
        "TransferFee": parseInt("0"),
        "NFTokenTaxon": 0 //Required, but if you have no use for it, set to zero.
      }
    
    // ----------------------------------------------------- Submit signed blob 
    const tx = await client.submitAndWait(transactionJson, { wallet: standby_wallet} )
    const nfts = await client.request({
    method: "account_nfts",
    account: standby_wallet.classicAddress
    })

    // ------------------------------------------------------- Report results
    results = '\n\nTransaction result: '+ tx.result.meta.TransactionResult
    results += '\n\nnfts: ' + JSON.stringify(nfts, null, 2)

    console.log("NFT creating resp: ", results)
   
    await client.disconnect()
}

exports.create_trustline = async(req) =>{
    const account = "rP7aApVAyf3bjtRVVTixVSHBbU4kpd742k"

    // Connect to a testnet node
    console.log("Connecting to testnet...")
    const client = new xrpl.Client('wss://s.devnet.rippletest.net:51233')
    await client.connect()
    standbyResultField.value = results
            
    const standby_wallet = xrpl.Wallet.fromSeed("sEdVd1vJvRcoXCmrx7SwY8g2bhaD35h")
    const operational_wallet = xrpl.Wallet.fromSeed("sEdVd1vJvRcoXCmrx7SwY8g2bhaD35h")
    const currency_code = standbyCurrencyField.value
    const trustSet_tx = {
        "TransactionType": "TrustSet",
        "Account": standbyAccountField.value,
        "LimitAmount": {
            "currency": standbyCurrencyField.value,
            "issuer": standby_wallet.classicAddress,
            "value": standbyAmountField.value
        }
    }
    const ts_prepared = await client.autofill(trustSet_tx)
    const ts_signed = standby_wallet.sign(ts_prepared)
    results += '\nCreating trust line from operational account to standby account...'
    standbyResultField.value = results
    const ts_result = await client.submitAndWait(ts_signed.tx_blob)
    if (ts_result.result.meta.TransactionResult == "tesSUCCESS") {
        results += '\nTrustline established between account \n' +
        standbyDestinationField.value + ' \n and account\n' + standby_wallet.address + '.'
        standbyResultField.value = results
    } else {
        results += '\nTrustLine failed. See JavaScript console for details.'
        document.getElementById('standbyResultField').value = results     
        throw `Error sending transaction: ${ts_result.result.meta.TransactionResult}`
    }
}

exports.issue_etf = async(req) =>{
    const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233')
    console.log("Connecting to Testnet...")
    await client.connect()

    // Get credentials from the Testnet Faucet -----------------------------------
    console.log("Requesting addresses from the Testnet faucet...")
    const hot_wallet = (await client.fundWallet()).wallet
    const cold_wallet = (await client.fundWallet()).wallet
    const customer_one_wallet = (await client.fundWallet()).wallet
    const customer_two_wallet = (await client.fundWallet()).wallet
    console.log(`Got hot address ${hot_wallet.address} and cold address ${cold_wallet.address}.`)
    console.log(`Got customer_one address ${hot_wallet.address} and customer_two address ${cold_wallet.address}.`)


    // Configure issuer (cold address) settings ----------------------------------
    const cold_settings_tx = {
        "TransactionType": "AccountSet",
        "Account": cold_wallet.address,
        "TransferRate": 0,
        "TickSize": 5,
        "Domain": "6578616D706C652E636F6D", // "example.com"
        "SetFlag": xrpl.AccountSetAsfFlags.asfDefaultRipple,
        // Using tf flags, we can enable more flags in one transaction
        "Flags": (xrpl.AccountSetTfFlags.tfDisallowXRP |
                xrpl.AccountSetTfFlags.tfRequireDestTag)
    }

    const cst_prepared = await client.autofill(cold_settings_tx)
    const cst_signed = cold_wallet.sign(cst_prepared)
    console.log("Sending cold address AccountSet transaction...")
    const cst_result = await client.submitAndWait(cst_signed.tx_blob)
    if (cst_result.result.meta.TransactionResult == "tesSUCCESS") {
        console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${cst_signed.hash}`)
    } else {
        throw `Error sending transaction: ${cst_result}`
    }


    // Configure hot address settings --------------------------------------------

    const hot_settings_tx = {
        "TransactionType": "AccountSet",
        "Account": hot_wallet.address,
        "Domain": "6578616D706C652E636F6D", // "example.com"
        // enable Require Auth so we can't use trust lines that users
        // make to the hot address, even by accident:
        "SetFlag": xrpl.AccountSetAsfFlags.asfRequireAuth,
        "Flags": (xrpl.AccountSetTfFlags.tfDisallowXRP |
                xrpl.AccountSetTfFlags.tfRequireDestTag)
    }

    const hst_prepared = await client.autofill(hot_settings_tx)
    const hst_signed = hot_wallet.sign(hst_prepared)
    console.log("Sending hot address AccountSet transaction...")
    const hst_result = await client.submitAndWait(hst_signed.tx_blob)
    if (hst_result.result.meta.TransactionResult == "tesSUCCESS") {
        console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${hst_signed.hash}`)
    } else {
        throw `Error sending transaction: ${hst_result.result.meta.TransactionResult}`
    }


    // Create trust line from hot to cold address --------------------------------
    const currency_code = "FOO"
    const trust_set_tx = {
        "TransactionType": "TrustSet",
        "Account": hot_wallet.address,
        "LimitAmount": {
        "currency": currency_code,
        "issuer": cold_wallet.address,
        "value": "10000000000" // Large limit, arbitrarily chosen
        }
    }

    const ts_prepared = await client.autofill(trust_set_tx)
    const ts_signed = hot_wallet.sign(ts_prepared)
    console.log("Creating trust line from hot address to issuer...")
    const ts_result = await client.submitAndWait(ts_signed.tx_blob)
    if (ts_result.result.meta.TransactionResult == "tesSUCCESS") {
        console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${ts_signed.hash}`)
    } else {
        throw `Error sending transaction: ${ts_result.result.meta.TransactionResult}`
    }

        // Create trust line from customer_one to cold address --------------------------------
    const trust_set_tx2 = {
        "TransactionType": "TrustSet",
        "Account": customer_one_wallet.address,
        "LimitAmount": {
        "currency": currency_code,
        "issuer": cold_wallet.address,
        "value": "10000000000" // Large limit, arbitrarily chosen
        }
    }

    const ts_prepared2 = await client.autofill(trust_set_tx2)
    const ts_signed2 = customer_one_wallet.sign(ts_prepared2)
    console.log("Creating trust line from customer_one address to issuer...")
    const ts_result2 = await client.submitAndWait(ts_signed2.tx_blob)
    if (ts_result2.result.meta.TransactionResult == "tesSUCCESS") {
        console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${ts_signed2.hash}`)
    } else {
        throw `Error sending transaction: ${ts_result2.result.meta.TransactionResult}`
    }


    const trust_set_tx3 = {
        "TransactionType": "TrustSet",
        "Account": customer_two_wallet.address,
        "LimitAmount": {
        "currency": currency_code,
        "issuer": cold_wallet.address,
        "value": "10000000000" // Large limit, arbitrarily chosen
        }
    }

    const ts_prepared3 = await client.autofill(trust_set_tx3)
    const ts_signed3 = customer_two_wallet.sign(ts_prepared3)
    console.log("Creating trust line from customer_two address to issuer...")
    const ts_result3 = await client.submitAndWait(ts_signed3.tx_blob)
    if (ts_result3.result.meta.TransactionResult == "tesSUCCESS") {
        console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${ts_signed3.hash}`)
    } else {
        throw `Error sending transaction: ${ts_result3.result.meta.TransactionResult}`
    }




    // Send token ----------------------------------------------------------------
    let issue_quantity = "3800"

    const send_token_tx = {
        "TransactionType": "Payment",
        "Account": cold_wallet.address,
        "Amount": {
        "currency": currency_code,
        "value": issue_quantity,
        "issuer": cold_wallet.address
        },
        "Destination": hot_wallet.address,
        "DestinationTag": 1 // Needed since we enabled Require Destination Tags
                            // on the hot account earlier.
    }

    const pay_prepared = await client.autofill(send_token_tx)
    const pay_signed = cold_wallet.sign(pay_prepared)
    console.log(`Cold to hot - Sending ${issue_quantity} ${currency_code} to ${hot_wallet.address}...`)
    const pay_result = await client.submitAndWait(pay_signed.tx_blob)
    if (pay_result.result.meta.TransactionResult == "tesSUCCESS") {
        console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${pay_signed.hash}`)
    } else {
        console.log(pay_result)
        throw `Error sending transaction: ${pay_result.result.meta.TransactionResult}`
    }


    issue_quantity = "100"
    const send_token_tx2 = {
        "TransactionType": "Payment",
        "Account": hot_wallet.address,
        "Amount": {
        "currency": currency_code,
        "value": issue_quantity,
        "issuer": cold_wallet.address
        },
        "Destination": customer_one_wallet.address,
        "DestinationTag": 1 // Needed since we enabled Require Destination Tags
                            // on the hot account earlier.
    }

    const pay_prepared2 = await client.autofill(send_token_tx2)
    const pay_signed2 = hot_wallet.sign(pay_prepared2)
    console.log(`Hot to customer_one - Sending ${issue_quantity} ${currency_code} to ${customer_one_wallet.address}...`)
    const pay_result2 = await client.submitAndWait(pay_signed2.tx_blob)
    if (pay_result2.result.meta.TransactionResult == "tesSUCCESS") {
        console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${pay_signed2.hash}`)
    } else {
        console.log(pay_result2)
        throw `Error sending transaction: ${pay_result2.result.meta.TransactionResult}`
    }


    issue_quantity = "12"
    const send_token_tx3 = {
        "TransactionType": "Payment",
        "Account": customer_one_wallet.address,
        "Amount": {
        "currency": currency_code,
        "value": issue_quantity,
        "issuer": cold_wallet.address
        },
        "Destination": customer_two_wallet.address,
        "DestinationTag": 1 // Needed since we enabled Require Destination Tags
                            // on the hot account earlier.
    }

    const pay_prepared3 = await client.autofill(send_token_tx3)
    const pay_signed3 = customer_one_wallet.sign(pay_prepared3)
    console.log(`Customer_one to customer_two - Sending ${issue_quantity} ${currency_code} to ${customer_two_wallet.address}...`)
    const pay_result3 = await client.submitAndWait(pay_signed3.tx_blob)
    if (pay_result3.result.meta.TransactionResult == "tesSUCCESS") {
        console.log(`Transaction succeeded: https://testnet.xrpl.org/transactions/${pay_signed3.hash}`)
    } else {
        console.log(pay_result3)
        throw `Error sending transaction: ${pay_result3.result.meta.TransactionResult}`
    }


    // Check balances ------------------------------------------------------------
    console.log("Getting hot address balances...")
    const hot_balances = await client.request({
        command: "account_lines",
        account: hot_wallet.address,
        ledger_index: "validated"
    })
    console.log(hot_balances.result)

    console.log("Getting cold address balances...")
    const cold_balances = await client.request({
        command: "gateway_balances",
        account: cold_wallet.address,
        ledger_index: "validated",
        hotwallet: [hot_wallet.address]
    })
    console.log(JSON.stringify(cold_balances.result, null, 2))

    client.disconnect()
}