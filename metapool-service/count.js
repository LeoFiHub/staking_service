const ethers = require("ethers");
(async () => {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const txCount = await provider.send("eth_getBlockTransactionCountByNumber", [
    "0x1D6",
  ]);
  console.log(txCount);
})();
