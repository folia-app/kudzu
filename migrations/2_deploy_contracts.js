var Metadata = artifacts.require('./Metadata.sol')
var Kudzu = artifacts.require('./Kudzu.sol')
let _ = '        '

module.exports = (deployer, helper, accounts) => {

  deployer.then(async () => {
    try {
      // Deploy Metadata.sol
      await deployer.deploy(Metadata)
      let metadata = await Metadata.deployed()
      console.log(_ + 'Metadata deployed at: ' + metadata.address)

       // Deploy Kudzu.sol
       await deployer.deploy(Kudzu, metadata.address)
       let kudzu = await Kudzu.deployed()
       console.log(_ + 'Kudzu deployed at: ' + kudzu.address)

    } catch (error) {
      console.log(error)
    }
  })
}
