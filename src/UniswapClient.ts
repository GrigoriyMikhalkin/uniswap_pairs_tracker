import Web3 from 'web3';

import {Erc20} from './contracts/ERC20';
import {UniswapV2Factory} from './contracts/UniswapV2Factory';
import {Sync, UniswapV2Pair} from './contracts/UniswapV2Pair';
import {Reserves} from "./types/types";

const UniswapV2FactoryABI = require('./abi/UniswapV2Factory.json');
const UniswapV2PairABI = require('./abi/UniswapV2Pair.json');
const ERC20ABI = require('./abi/ERC20.json');

const RPC_HOST = 'wss://mainnet.infura.io/ws/v3/6d6c70e65c77429482df5b64a4d0c943'
const REGISTRY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';

declare global {
    interface Window {
        ethereum: any;
    }
}

class UniswapClient {
    private client: Web3;
    private registryContract: UniswapV2Factory;

    constructor() {
        this.client = new Web3(RPC_HOST);

        this.registryContract = (new this.client.eth.Contract(
            UniswapV2FactoryABI, REGISTRY_ADDRESS) as any) as UniswapV2Factory;
    }

    async getTokenNames(token1: string, token2: string): Promise<string[]> {
        const token1Contract = (new this.client.eth.Contract(ERC20ABI, token1) as any) as Erc20;
        const token2Contract = (new this.client.eth.Contract(ERC20ABI, token2) as any) as Erc20;

        const name1 = await token1Contract.methods.name().call();
        const name2 = await token2Contract.methods.name().call();
        return [name1, name2];
    }

    async getPairContract(tokenA: string, tokenB: string): Promise<UniswapV2Pair> {
        const pairAddress = await this.registryContract.methods.getPair(tokenA, tokenB).call();
        return (new this.client.eth.Contract(
            UniswapV2PairABI, pairAddress) as any) as UniswapV2Pair;
    }

    async getPairReserves(pairContract: UniswapV2Pair): Promise<Reserves>  {
        const res = await pairContract.methods.getReserves().call();
        let timestamp = new Date(0);
        timestamp.setUTCSeconds(Number(res.blockTimestampLast));
        return {
            reserve1: res.reserve0,
            reserve2: res.reserve1,
            timestamp: timestamp
        };
    }

    subscribeToSyncEvent(pairContract: UniswapV2Pair, callback: (event: Sync) => void) {
        pairContract.events.Sync({})
            .on("data", callback);
        console.log("success");
    }

    async getBlockTimestamp(blockNumber: number): Promise<Date> {
        const block = await this.client.eth.getBlock(blockNumber);

        let blockTimestamp = new Date(0);
        blockTimestamp.setUTCSeconds(Number(block.timestamp));

        return blockTimestamp;
    }
}

export default UniswapClient;