import styled from "styled-components";
import { GridConfig } from "../config/gridConfig";
import { useCellGridContext } from "../context/CellGridContext";
import Cell from "./Cell";

const CellGrid = styled.div`
  border: 1px solid black;
  width: fit-content;
  margin: 0 auto;
`;

const CellGridRow = styled.div`
  height: ${GridConfig.cellSize}px;
`;

const Grid: React.FC = () => {
  const { grid } = useCellGridContext().state;

  return (
    <CellGrid>
      {grid.map((row, y) => (
        <CellGridRow key={y}>
          {row.map((cell, x) => (
            <Cell key={`${x}|${y}`} x={x} y={y} alive={!!cell} />
          ))}
        </CellGridRow>
      ))}
    </CellGrid>
  );
};

export default Grid;
