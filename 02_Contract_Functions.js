console.log(Web3)
const rpcURL = "https://ropsten.infura.io/v3/4d121ccc6c334599bcae2743738e14fb"

let web3 = new Web3(rpcURL);

let address = "0x86BF45e262811C000cff922679eaD8ebf1EC5908";

let abi = [
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

const contract = new web3.eth.Contract(abi, address)

/*console.log("Contract ",  contract);
console.log("Methods ",  contract.methods);
console.log("Get Age ",  contract.methods.getAge);
console.log("Do Some Work ",  contract.methods.doSomeWork);*/

contract.methods.getAge().call( function(err, result){
    console.log("Age =", result)
});

contract.methods.doSomeWork().call( function(err, result){
    console.log("Work =", result)
});

//Updated
