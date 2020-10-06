const Web3 = require('web3');

const registryAddr = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

// Connect to the blockchain
const customProvider = {
    sendAsync: (payload, cb) => {
        console.log('called');
        console.log(payload);
        cb(undefined, 100);
    }
}

// const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(window.ethereum || customProvider);
if (window.ethereum) {
    await window.ethereum.enable();
}

const registryContract = new web3.eth.Contract(
    abi,
    registryAddr
);

web3.eth.getBlockNumber()
    .then(() => console.log('done'));
