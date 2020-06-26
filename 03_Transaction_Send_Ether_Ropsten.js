var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/4d121ccc6c334599bcae2743738e14fb')

const account1 = "0x27484D261F02bf2910B022c5273Dcb52A552eEa7"; // acc 1 of my MetaMask wallet
const account2 = "0xB7b836B540a2f650021d09B5d49d3D2f6cc57DE8"; // acc 2 of my MetaMask wallet

const privateKey1 = "99BEDBC1527D51C3DB5BCEB467CE0259F11484683BAE84A7E115CD808CDCFEFC"; // Private key Acc 1
const privateKey2 = "EB52710581D4F7B6FC7F55A207FABE38BCD7B19F10C7E7110018C0A019A1C50A"; // Private key Acc 2

const privateKey1Buffer = Buffer.from(privateKey1, 'hex');
const privateKey2Buffer = Buffer.from(privateKey2, 'hex');

console.log("Buffer 1 = ",privateKey1Buffer);
console.log("Buffer 2 = ",privateKey2Buffer);

web3.eth.getTransactionCount(account1, (err, txCount)=>{

    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       account2,
        value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    const tx = new Tx.Transaction(txObject, { chain: 'ropsten' });
    tx.sign(privateKey1Buffer);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    //console.log("tx = ",tx);
    //console.log("serializedTx = ",serializedTx);
    //console.log("raw = ",raw);

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
    });

});

// Transaction Hash 0xf245e8e7ceaab349e86cbc2662cad0e2f89afd5b3cb1865bd3702c5c5c3af894
// Transaction Link on Ropsten Etherscan
// https://ropsten.etherscan.io/tx/0xf245e8e7ceaab349e86cbc2662cad0e2f89afd5b3cb1865bd3702c5c5c3af894