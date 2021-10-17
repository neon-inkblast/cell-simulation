import styled from "styled-components";
import Cell from "./Cell";

const CellGrid = styled.div`
  border: 1px solid black;
  width: fit-content;
  margin: 0 auto;
`;

const CellGridRow = styled.div`
  height: 50px;
`;

const Grid: React.FC = () => {
  const grid = [
    [0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [1, 0, 1, 1, 0],
    [1, 1, 0, 1, 0],
  ];
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
