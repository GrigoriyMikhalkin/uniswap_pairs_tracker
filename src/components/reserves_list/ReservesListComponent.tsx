import React from 'react';
import {Reserves} from "../../types/types";
import styled from "styled-components";

const TableContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Table = styled.table`
    border-spacing: 50px 10px;
`;

const TableHeader = styled.th`
    color: rgb(255, 0, 122);
`;

const TableRow = styled.td`
    color: palevioletred;
`;

type ReservesListComponentProps = {
    reserves: Reserves[]
}

type ReservesListComponentState = {}

class ReservesListComponent extends React.Component<ReservesListComponentProps, ReservesListComponentState>{

    render() {
        return <TableContainer>
            <Table>
                <thead>
                    <TableHeader>TokenA reserve</TableHeader>
                    <TableHeader>TokenB reserve</TableHeader>
                    <TableHeader>Last TX timestamp</TableHeader>
                </thead>
                <tbody>
                    {this.props.reserves.map(r =>
                        <tr>
                            <TableRow>{r.reserveA}</TableRow>
                            <TableRow>{r.reserveB}</TableRow>
                            <TableRow>{r.timestamp.toISOString()}</TableRow>
                        </tr>
                    )}
                </tbody>
            </Table>
        </TableContainer>;
    }
}

export default ReservesListComponent;