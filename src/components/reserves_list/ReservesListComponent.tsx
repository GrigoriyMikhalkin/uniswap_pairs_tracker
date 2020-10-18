import React from 'react';
import {Reserves} from "../../types/types";
import Styled from "./ReservesListComponent.styles";


type ReservesListComponentProps = {
    token1Name: string
    token2Name: string
    reserves: Reserves[]
}

type ReservesListComponentState = {}

class ReservesListComponent extends React.Component<ReservesListComponentProps, ReservesListComponentState>{

    render() {
        return <Styled.TableContainer>
            { this.props.token1Name !== '' ?
                    <Styled.Table>
                        <thead>
                            <Styled.TableHeader>{this.props.token1Name} reserves</Styled.TableHeader>
                            <Styled.TableHeader>{this.props.token2Name} reserves</Styled.TableHeader>
                            <Styled.TableHeader>Last TX timestamp</Styled.TableHeader>
                        </thead>
                        <tbody>
                            {this.props.reserves.map(r =>
                                <tr>
                                    <Styled.TableRow>{r.reserve1}</Styled.TableRow>
                                    <Styled.TableRow>{r.reserve2}</Styled.TableRow>
                                    <Styled.TableRow>{r.timestamp.toISOString()}</Styled.TableRow>
                                </tr>
                            )}
                        </tbody>
                    </Styled.Table>
                :  <div></div>
            }
        </Styled.TableContainer>;
    }
}

export default ReservesListComponent;