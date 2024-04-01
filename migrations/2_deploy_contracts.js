var Metadata = artifacts.require("./Metadata.sol");
var Kudzu = artifacts.require("./Kudzu.sol");
let _ = "        ";
let billy = "0xFa398d672936Dcf428116F687244034961545D91";
module.exports = (deployer, helper, accounts) => {
  deployer.then(async () => {
    try {
      // Deploy Metadata.sol
      // await deployer.deploy(Metadata);
      // let metadata = await Metadata.deployed();
      // console.log(_ + "Metadata deployed at: " + metadata.address);
      // await new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve();
      //   }, 1000);
      // });
      // Deploy Kudzu.sol
      await deployer.deploy(
        Kudzu,
        "0xa66044b5c42ca2bd7e542af3f62fea5c094c44ec",
        billy
      );
      let kudzu = await Kudzu.deployed();
      console.log(_ + "Kudzu deployed at: " + kudzu.address);
    } catch (error) {
      console.log(error);
    }
  });
};
