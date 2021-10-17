import { CellGridState } from "../@types/CellGridContext";
import { config } from "../config/config";

export const generateNext = (state: CellGridState): CellGridState => {
  return {
    ...state,
  };
};

export const toggleCell = (state: CellGridState, cellY: number, cellX: number): CellGridState => {
  return {
    ...state,
  };
};

export const initialState = (): CellGridState => {
  return {
    generation: 0,
    grid: Array(config.rows).fill(Array(config.columns).fill(false)),
  };
};

const cellGridUtils = { generateNext, toggleCell, initialState };

export default cellGridUtils;
