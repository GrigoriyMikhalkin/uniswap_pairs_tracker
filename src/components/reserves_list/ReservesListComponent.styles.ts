import styled from "styled-components";


const Table = styled.table`
    border-spacing: 50px 10px;
`;

const TableRow = styled.td`
    color: palevioletred;
`;

const TableHeader = styled.th`
    color: rgb(255, 0, 122);
`;

const TableContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Styled = {
    Table,
    TableRow,
    TableHeader,
    TableContainer
}

export default Styled;