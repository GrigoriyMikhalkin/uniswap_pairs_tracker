import React from 'react';
import SearchComponent from "./components/search/SearchComponent";
import styled from "styled-components";

const Header = styled.header`
    font-family: seymour;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    color: rgb(255, 0, 122);
`

function App() {
    return (
        <div className="App">
            <Header>Uniswap pair reserves tracker</Header>
            <SearchComponent/>
        </div>
    );
}

export default App;
