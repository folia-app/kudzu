var Metadata = artifacts.require('./Metadata.sol')
var Kudzu = artifacts.require('./Kudzu.sol')
var BigNumber = require('bignumber.js')
let gasPrice = 1000000000 // 1GWEI

let _ = '        '

contract('Kudzu', async function(accounts) {
  let kudzu, metadata

  before(done => {
    ;(async () => {
      try {
        var totalGas = new BigNumber(0)

        // Deploy Metadata.sol
        metadata = await Metadata.new()
        var tx = await web3.eth.getTransactionReceipt(metadata.transactionHash)
        totalGas = totalGas.plus(tx.gasUsed)
        console.log(_ + tx.gasUsed + ' - Deploy metadata')
        metadata = await Metadata.deployed()


        // Deploy Kudzu.sol
        kudzu = await Kudzu.new(metadata.address)
        var tx = await web3.eth.getTransactionReceipt(kudzu.transactionHash)
        totalGas = totalGas.plus(tx.gasUsed)
        console.log(_ + tx.gasUsed + ' - Deploy kudzu')
        kudzu = await Kudzu.deployed()

        console.log(_ + '-----------------------')
        console.log(_ + totalGas.toFormat(0) + ' - Total Gas')
        done()
      } catch (error) {
        console.error(error)
        done(false)
      }
    })()
  })

  describe('Kudzu.sol', function() {
    it('should pass', async function() {


      for (var i = 0; i < 8; i++) {
        var tokenId = await kudzu.tokenByIndex(i)
        console.log({tokenId: tokenId.toString(10), tokenId16: tokenId.toString(16)})
  
        var parts = await kudzu.getPiecesOfTokenID(tokenId)
        console.log({
          parts0: parts[0].toString(10),
          parts016: parts[0].toString(16),
          parts1: parts[1].toString(10),
          parts2: parts[2].toString(10),
        })
  
        await kudzu.transferFrom(accounts[i], accounts[i + 1], tokenId)
  
      }


      assert(
        true === false,
        'this is true'
      )
    })

  })
})

function getBlockNumber() {
  return new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((error, result) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}

function increaseBlocks(blocks) {
  return new Promise((resolve, reject) => {
    increaseBlock().then(() => {
      blocks -= 1
      if (blocks == 0) {
        resolve()
      } else {
        increaseBlocks(blocks).then(resolve)
      }
    })
  })
}

function increaseBlock() {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync(
      {
        jsonrpc: '2.0',
        method: 'evm_mine',
        id: 12345
      },
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

function decodeEventString(hexVal) {
  return hexVal
    .match(/.{1,2}/g)
    .map(a =>
      a
        .toLowerCase()
        .split('')
        .reduce(
          (result, ch) => result * 16 + '0123456789abcdefgh'.indexOf(ch),
          0
        )
    )
    .map(a => String.fromCharCode(a))
    .join('')
}
