import styled from "styled-components";

const Input = styled.input`
    padding-left: 0.5em;
    margin-left: 0.5em;
    padding-top: 0.5em;
    margin-top: 0.5em;
    color: palevioletred;
    background: papayawhip;
    border: none;
    border-radius: 3px;
    height: 23px;
    width: 200px;
`;

const InputLabel = styled.span`
    margin-left: 1em;
    margin-top: 1em;
    margin-bottom: 1em;
    color: rgb(255, 0, 122);
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1em;
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

const ButtonContainer= styled.div`
    display: flex;
    justify-content: center;
`;

const Styled = {
    Input,
    InputLabel,
    InputContainer,

    Button,
    ButtonContainer
}

export default Styled;