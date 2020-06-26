var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/4d121ccc6c334599bcae2743738e14fb')

const account1 = "0x27484D261F02bf2910B022c5273Dcb52A552eEa7"; // acc 1 of my MetaMask wallet

const privateKey1 = "99BEDBC1527D51C3DB5BCEB467CE0259F11484683BAE84A7E115CD808CDCFEFC"; // Private key Acc 1

const privateKey1Buffer = Buffer.from(privateKey1, 'hex');

const contractAddress = "0x86BF45e262811C000cff922679eaD8ebf1EC5908"

const abi = [
	{
		"inputs": [],
		"name": "doSomeWork",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAge",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			}
		],
		"name": "setAge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const contract = new web3.eth.Contract(abi, contractAddress);

console.log("Buffer 1 = ",privateKey1Buffer);

web3.eth.getTransactionCount(account1, (err, txCount)=>{

    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(800000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        to: contractAddress,
        data: contract.methods.setAge(100).encodeABI()
      }

    const tx = new Tx.Transaction(txObject, { chain: 'ropsten' });
    tx.sign(privateKey1Buffer);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
    });

});

// Transaction Hash 0xae025f968328010801b7654b4e05764a7712ce23a54ad73ee975e17ebeed8f46
// Transaction Link on Ropsten Etherscan
// https://ropsten.etherscan.io/tx/0xae025f968328010801b7654b4e05764a7712ce23a54ad73ee975e17ebeed8f46

