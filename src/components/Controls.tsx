import styled from "styled-components";
import React from "react";
import { useCellGridContext } from "../context/CellGridContext";

const Button = styled.button`
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background-color: lightgreen;
  border: 1px solid black;
`;
const ControlWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Controls: React.FC = () => {
  const { state, dispatch } = useCellGridContext();
  return (
    <ControlWrapper>
      <Button onClick={() => dispatch({ type: "reset" })}>Reset</Button>
      <Button onClick={() => dispatch({ type: "generate-next" })}>Next Gen</Button>
      <div>Generation {state.generation}</div>
    </ControlWrapper>
  );
};

export default Controls;
