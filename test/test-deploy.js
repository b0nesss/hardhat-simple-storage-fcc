// we can basically test using javascript and its framework for testing or use another solidity file only
//however it is preferred to use js

const {expect , assert } = require("chai");
const {ethers} = require("hardhat");

//describe is a keyword
describe("SimpleStorage" , ()=> {
  let simpleStorage,SimpleStorageFactory
   beforeEach( async ()=> {
       SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
       simpleStorage = await SimpleStorageFactory.deploy()
       
   })
   it("Should start with a fav no. of 2", async  ()=>{
      const currentValue = await simpleStorage.retrieve()
      const expectedValue = "2"
      assert.equal(currentValue.toString(), expectedValue)
   })
})


//it() is where will be writing our code
//beforeEach tells what to do before each test
//out of so many it fns if we want to run only one then we have to write cmd
// yarn hardhat test --grep "any_keyword unique to some fn wihtout double quotes"
//or use it.only(    )
//assert and expect work the same here


//solidity coverage is a tool which goes thru all lines of our .sol file
// and reports which are tested here and which are not