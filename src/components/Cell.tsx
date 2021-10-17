import styled from "styled-components";
import React from "react";
import { useCellGridContext } from "../context/CellGridContext";
import { config } from "../config/config";

export type CellProps = {
  x: number;
  y: number;
  alive: boolean;
};

const StyledCell = styled.div<Partial<CellProps>>`
  width: ${config.cellSize}px;
  height: ${config.cellSize}px;
  display: inline-block;
  border-radius: 10px;
  margin: 0;
  background-color: ${({ alive }) => (alive ? "lightseagreen" : "transparent")};

  &:hover {
    background-color: ${({ alive }) => (alive ? "gold" : "yellow")};
  }
`;

const Cell: React.FC<CellProps> = ({ y, x, alive }) => {
  const { dispatch } = useCellGridContext();
  return <StyledCell alive={alive} onClick={() => dispatch({ type: "toggle-cell", column: x, row: y })} />;
};

export default Cell;
