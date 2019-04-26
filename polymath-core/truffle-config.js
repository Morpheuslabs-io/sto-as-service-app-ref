require('babel-register');
require('babel-polyfill');
const fs = require('fs');
const keythereum = require("keythereum");
const NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker")

const HDWalletProvider = require("truffle-hdwallet-provider");

var privKeyArr = [];
getPrivKey = function (addr, keyFileFolder, passphrase) {
  let keyObject = keythereum.importFromFile(addr, keyFileFolder);
  let privateKey = keythereum.recover(passphrase, keyObject);
  let privKeyStrHex = new Buffer(privateKey.toString("hex"), "hex");
  return privKeyStrHex;
}

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
      gas: 7900000,
    },
    mainnet: {
      host: 'localhost',
      port: 8545,
      network_id: '1', // Match any network id
      gas: 7900000,
      gasPrice: 10000000000
    },
    rinkeby: {
      provider: () => {
        const rawdata = fs.readFileSync('./setting/testnet.json'); 
        const settingData = JSON.parse(rawdata);
        const privKeyStrHexOwner = getPrivKey(settingData.OWNER_ADDR, settingData.OWNER_KEY_FILE_FOLDER, settingData.OWNER_PASSPHRASE)

        let wallet = new HDWalletProvider([privKeyStrHexOwner], "https://rinkeby.infura.io/v3/426e2bd78c974009982c19b2e49f89e3")
        var nonceTracker = new NonceTrackerSubprovider()
        wallet.engine._providers.unshift(nonceTracker)
        nonceTracker.setEngine(wallet.engine)
        return wallet
      },
      network_id: '*', // Match any network id
      gas: 7900000,
      gasPrice: 5000000000
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8545,         // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffff  , // <-- Use this high gas value
      gasPrice: 0x01      // <-- Use this low gas price
    }
  },
  compilers: {
    solc: {
      version: "0.5.2",
      settings: {
        optimizer: {
          enabled: true, 
          runs: 200    
        }
      }
    }
  },
  mocha: {
    enableTimeouts: false
  }
};
