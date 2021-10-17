import styled from "styled-components";
import React from "react";

export type CellProps = {
  x?: number;
  y?: number;
  alive?: boolean;
};

const StyledCell = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  border: 1px solid black;
  display: inline-block;
  margin: 0;
  background-color: ${({ alive }: CellProps) => (alive ? "lightseagreen" : "transparent")};

  &:hover {
    background-color: ${({ alive }: CellProps) => (alive ? "gold" : "yellow")};
  }
`;

const Cell: React.FC<CellProps> = ({ y, x, alive }) => {
  return (
    <StyledCell
      alive={alive}
      onClick={() => {
        console.log(x, "-", y, "toggled");
      }}
    ></StyledCell>
  );
};

export default Cell;
