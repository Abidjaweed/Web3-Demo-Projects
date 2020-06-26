

console.log(Web3);

const rpcURL = "https://ropsten.infura.io/v3/4d121ccc6c334599bcae2743738e14fb"

let web3 = new Web3(rpcURL);

let address = "0x27484D261F02bf2910B022c5273Dcb52A552eEa7";

web3.eth.getBalance(address,(err, wei)=>{
    console.log("wei " , wei);
    let balance = web3.utils.fromWei(wei, 'ether')
    console.log("Balance" ,balance);
});