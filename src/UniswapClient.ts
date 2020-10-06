import Web3 from 'web3';
import {UniswapV2Factory} from './contracts/UniswapV2Factory';
import {UniswapV2Pair} from './contracts/UniswapV2Pair';
import {Reserves} from "./types/types";

const UniswapV2FactoryABI = require('./abi/UniswapV2Factory.json');
const UniswapV2PairABI = require('./abi/UniswapV2Pair.json');

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

    async getPairReserves(tokenA: string, tokenB: string): Promise<Reserves>  {
        const pairAddress = await this.registryContract.methods.getPair(tokenA, tokenB).call();
        const pairContract = (new this.client.eth.Contract(
            UniswapV2PairABI, pairAddress) as any) as UniswapV2Pair;

        const res = await pairContract.methods.getReserves().call();
        let reserves = {
            reserveA: res.reserve0,
            reserveB: res.reserve1,
            timestamp: res.blockTimestampLast
        }
        return reserves;
    }
}

export default UniswapClient;