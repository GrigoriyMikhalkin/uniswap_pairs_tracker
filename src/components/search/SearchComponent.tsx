import React from 'react';
import ReservesListComponent from "../reserves_list/ReservesListComponent";
import UniswapClient from "../../UniswapClient";
import {Reserves} from "../../types/types";
import styled from 'styled-components';

const Input = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    color: palevioletred;
    background: papayawhip;
    border: none;
    border-radius: 3px;
`;

const Button = styled.button`
  color: white;
  border: 2px solid black;
  background: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1em;
`;

const ButtonContainer= styled.div`
    display: flex;
    justify-content: center;
`;

const InputLabel = styled.span`
    margin-left: 1em;
    margin-top: 1em;
    margin-bottom: 1em;
    color: rgb(255, 0, 122);
`;

type SearchComponentProps = {}

type SearchComponentState = {
    tokenA: string;
    tokenB: string;
    reservesHistory: Reserves[];
}

class SearchComponent extends React.Component<SearchComponentProps, SearchComponentState>{
    private uniswapClient: UniswapClient;
    private intervalID: number | undefined;

    constructor(props: SearchComponentProps) {
        super(props);
        this.state = {
            tokenA: '',
            tokenB: '',
            reservesHistory: []
        };

        this.uniswapClient = new UniswapClient();
        this.searchPairs = this.searchPairs.bind(this);
    }

    render() {
        return <div>
            <InputContainer>
                <InputLabel>tokenA:</InputLabel>
                <Input placeholder="Enter token name here..." onChange={e =>this.setState({tokenA: e.target.value})} type="text"/>
                <InputLabel>tokenB:</InputLabel>
                <Input placeholder="Enter token name here..." onChange={e =>this.setState({tokenB: e.target.value})} type="text"/>
            </InputContainer>
            <ButtonContainer>
                <Button onClick={this.searchPairs}>Track</Button>
            </ButtonContainer>
            <ReservesListComponent reserves={this.state.reservesHistory}/>
        </div>;
    }

    searchPairs(e: any) {
        const ctx = this;
        this.uniswapClient.getPairReserves(
            this.state.tokenA,
            this.state.tokenB
        ).then(reserves => {
            if (ctx.intervalID) {
                clearInterval(ctx.intervalID);
            }

            if (ctx.state.reservesHistory.length === 0 ||
                (ctx.state.reservesHistory[ctx.state.reservesHistory.length - 1].timestamp !== reserves.timestamp)) {
                console.log("pushed");
                ctx.state.reservesHistory.push(reserves);
                ctx.setState({
                    reservesHistory: ctx.state.reservesHistory
                });
            }

            ctx.intervalID = setInterval(() => ctx.searchPairs(e), 5000);
        })
    }
}

//'0x6b175474e89094c44da98b954eedeac495271d0f'
//'0x0d8775f648430679a709e98d2b0cb6250d2887ef'

export default SearchComponent;