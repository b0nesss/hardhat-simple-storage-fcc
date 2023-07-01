const { ethers, run, network } = require("hardhat")

//rn verify function will not work maybe bcoz of higher vesion of ethers 
//i upgraded ethers bcoz test-deploy wasnt working 

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory(
    "SimpleStorage"
  )
  console.log("Deploying...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();
  //some diff in code from tutorial bcoz of newer version upgrades
  //mark that here no rpc url and pvt key was required
  console.log(`Deployed contrct to ${await simpleStorage.getAddress()}`);
  //the fake hardhat network gives rpc url and pvt key so we dont have to do it manually here
  // console.log(network.config)//we did this to check what are available in netwrok.config    it contains chainid which is unique so we will check that to see whther local blockchain or other network
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deploymentTransaction().wait(7);
    await verify(await simpleStorage.getAddress(), [])
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`current fav no is ${currentValue}`)

  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`new value is ${updatedValue}`);

}

//here we will verify and publish programatically that we did using etherscan ui
//when deploying to local blockchians we dont need to verify
async function verify(contractAddress, args) {
  console.log("verifying contract..");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguemnts: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("already verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



  //getting some error in verification about not able to veriofy bcoz didnt wait some bloxks n shit but the syntax here was fine
  //then donwgrading the verson of ethers in package.json and including custonchains : [] in hardhat.config.js helped
  //  https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/5735#discussioncomment-6271010