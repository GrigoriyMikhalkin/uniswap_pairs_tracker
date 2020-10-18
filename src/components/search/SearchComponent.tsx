import React from 'react';
import ReservesListComponent from "../reserves_list/ReservesListComponent";
import UniswapClient from "../../UniswapClient";
import {Reserves} from "../../types/types";
import Styled from "./SearchComponent.styles";
import {Sync, UniswapV2Pair} from "../../contracts/UniswapV2Pair";


type SearchComponentProps = {}

type SearchComponentState = {
    token1Addr: string;
    token2Addr: string;
    token1Name: string;
    token2Name: string;
    pairContract: UniswapV2Pair | null;
    reservesHistory: Reserves[];
}

class SearchComponent extends React.Component<SearchComponentProps, SearchComponentState>{
    private uniswapClient: UniswapClient;

    constructor(props: SearchComponentProps) {
        super(props);
        this.state = {
            token1Addr: '',
            token2Addr: '',
            token1Name: '',
            token2Name: '',
            pairContract: null,
            reservesHistory: []
        };

        this.uniswapClient = new UniswapClient();
        this.setPair = this.setPair.bind(this);
    }

    render() {
        return <div>
            <Styled.InputContainer>
                <Styled.InputLabel>token1:</Styled.InputLabel>
                <Styled.Input placeholder="Enter token name here..." onChange={e =>this.setState({token1Addr: e.target.value})}/>
                <Styled.InputLabel>token2:</Styled.InputLabel>
                <Styled.Input placeholder="Enter token name here..." onChange={e =>this.setState({token2Addr: e.target.value})}/>
            </Styled.InputContainer>
            <Styled.ButtonContainer>
                <Styled.Button onClick={this.setPair}>Track</Styled.Button>
            </Styled.ButtonContainer>
            <ReservesListComponent token1Name={this.state.token1Name} token2Name={this.state.token2Name} reserves={this.state.reservesHistory}/>
        </div>;
    }

    setPair(e: any) {
        const ctx = this;

        this.uniswapClient.getTokenNames(
            this.state.token1Addr,
            this.state.token2Addr
        ).then(names => {
            ctx.setState({
                token1Name: names[0],
                token2Name: names[1]
            });
        })

        this.uniswapClient.getPairContract(this.state.token1Addr, this.state.token2Addr)
            .then(pairContract => {
                ctx.setState({pairContract: pairContract});
                this.updatePair();
            });
    }

    updatePair() {
        if (this.state.pairContract === null) {
            return
        }

        const ctx = this;
        this.uniswapClient.getPairReserves(
            this.state.pairContract,
        ).then(reserves => {
            if (ctx.state.pairContract === null) {
                return;
            }

            ctx.updateReservesHistory.bind(ctx)(reserves);
            ctx.uniswapClient.subscribeToSyncEvent(
                ctx.state.pairContract,
                async (event: Sync) => {
                    const timestamp = await ctx.uniswapClient.getBlockTimestamp(event.blockNumber);

                    ctx.updateReservesHistory.bind(ctx)({
                        reserve1: event.returnValues.reserve0,
                        reserve2: event.returnValues.reserve1,
                        timestamp: timestamp
                    });
                    console.log(event.returnValues.reserve0);
                });
        })
    }

    updateReservesHistory(reserves: Reserves) {
        this.state.reservesHistory.push(reserves);
        this.setState({
            reservesHistory: this.state.reservesHistory
        });
    }
}

export default SearchComponent;