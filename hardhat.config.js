require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")
// require("@nomiclabs/hardhat-etherscan"); this was commented out due to migration from waffle to toolbox source:https://ethereum.stackexchange.com/a/149833

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/sruONRtKIzasvjm2S3kx4HoislFljP4h"
const PVT_KEY = process.env.PRIVATE_KEY || "0xc24af90cc12f2283bc8877334bf00162b78066bfa1935341be491de770cbd6aa"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "HF3QTBYJHTZ5VAI5ASJZUMGXW7275R8P5S"
const COINMARKET_API_KEY = process.env.COINMARKETCAP_API_KEY || "48c53d3e-3283-4e06-8082-a9a5c06ad1f3"

module.exports = {
  //defaultNetwork : "hardhat" is already existing in bg we just dont see it and hence its a local blockchain like ganache
  //you can also explicitly state the above statement here
  defaultNetwork: "hardhat",
  networks: {
    hardhat:{},
    sepolia: {
        url: SEPOLIA_RPC_URL,
        accounts: [PVT_KEY],
        chainId:11155111,
    },
    localhost : {
      url: "http://127.0.0.1:8545/" , 
      chainId : 31337,
      //accounts: not required as hardhat localhost provides it 
      //its basically the hardhat network but not the same its a localhost running on hardhat runtime enviornment
      //so we added localhost
    }
  },
  solidity: "0.8.7",
  etherscan : {
    apiKey : ETHERSCAN_API_KEY,
    // customChains : [],
  },
  gasReporter: {
    // enabled : true, we dont want it rn
    enabled : false,
    outputFile : "gas-report.txt",
    noColors : true ,
    currency :"USD",
    coinmarketcap : COINMARKET_API_KEY
  }
};

