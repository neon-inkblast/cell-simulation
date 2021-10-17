import { Dispatch } from "react";

export type CellGridState = {
  grid: boolean[][];
  generation: number;
};

export type CellGridAction = {
  type: "reset" | "toggle-cell" | "generate-next";
  row?: number;
  column?: number;
};

export type CellGridContextType = {
  state: CellGridState;
  dispatch: Dispatch<CellGridAction>;
};
