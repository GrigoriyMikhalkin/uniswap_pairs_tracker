import React from 'react';
import {Reserves} from "../../types/types";
import styled from "styled-components";


const TableContainer= styled.div`
    display: flex;
    justify-content: center;
`;

type ReservesListComponentProps = {
    reserves: Reserves[]
}

type ReservesListComponentState = {}

class ReservesListComponent extends React.Component<ReservesListComponentProps, ReservesListComponentState>{

    render() {
        return <TableContainer>
            <table>
                <thead>
                    <th>TokenA reserve</th>
                    <th>TokenB reserve</th>
                </thead>
                <tbody>
                    {this.props.reserves.map(r =>
                        <tr>
                            <td>{r.reserveA}</td>
                            <td>{r.reserveB}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </TableContainer>;
    }
}

export default ReservesListComponent;