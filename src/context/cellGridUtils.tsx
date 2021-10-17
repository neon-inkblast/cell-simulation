import { CellGridState } from "../@types/CellGridContext";
/*
 * Utility functions to perform the state transforms for the CellGridProvider
 */
export const generateNext = (state: CellGridState): CellGridState => {
  const { grid: prevGrid, generation } = state;
  // calculate max rows and columns, for cell neighbour wrapping
  const lastRowIndex = prevGrid.length ? prevGrid.length - 1 : 0;
  const lastColIndex = prevGrid[0]?.length ? prevGrid[0].length - 1 : 0;

  // inner function to use when mapping current cells to next gen cells
  function getNextCellState(x: number, y: number, cell: boolean): boolean {
    // calculate surrounding rows and columns, taking wrapping into account
    const prevRow = y === 0 ? lastRowIndex : y - 1;
    const nextRow = y === lastColIndex ? 0 : y + 1;
    const prevCol = x === 0 ? lastRowIndex : x - 1;
    const nextCol = x === lastColIndex ? 0 : x + 1;

    // get an array of the neighbouring cells
    const neighbours = [
      prevGrid[prevRow][prevCol],
      prevGrid[prevRow][x],
      prevGrid[prevRow][nextCol],
      prevGrid[y][prevCol],
      prevGrid[y][nextCol],
      prevGrid[nextRow][prevCol],
      prevGrid[nextRow][x],
      prevGrid[nextRow][nextCol],
    ];

    // count the "live" neighbouring cells
    const liveNeighbours = neighbours.reduce((acc, current) => (acc += current ? 1 : 0), 0);
    // if live neighbours is 3, become or stay alive
    // otherwise, if 2 and alive, stay alive
    return liveNeighbours === 3 || (liveNeighbours === 2 && cell);
  }

  // map the new cell states from the old cells
  const grid = prevGrid.map((row, y) =>
    row.map((cell, x) => {
      return getNextCellState(x, y, cell);
    })
  );

  return {
    generation: generation + 1,
    grid,
  };
};

export const toggleCell = (state: CellGridState, cellY: number, cellX: number): CellGridState => {
  const prevGrid = state.grid;
  const grid = prevGrid.map((row, y) => {
    // if not the target row, skip any more checks and just recreate the same row
    if (y !== cellY) {
      return [...row];
    }
    // if in the target row, toggle when the x position matches
    return row.map((cell, x) => {
      if (cellX === x) {
        return !cell;
      }
      return cell;
    });
  });
  return {
    ...state,
    grid,
  };
};

export const initialState = (rows = 5, columns = 5): CellGridState => {
  return {
    generation: 0,
    grid: Array(rows).fill(Array(columns).fill(false)),
  };
};

const cellGridUtils = { generateNext, toggleCell, initialState };

export default cellGridUtils;
