"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
const genesisBlock = new Block(0, "1736f5be0544fbc442b4fa926b49c86f6c1809375ef5a60c6d9ff1", "68c44b4d961736f5be0544fbc442b4fa926b49c86f6c1809375ef5a60c6d9ff1", "one block", 1631094390);
let blockchain = [genesisBlock];
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimeStamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockVaild = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockVaild(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("forth block");
console.log(blockchain);
//# sourceMappingURL=index.js.map