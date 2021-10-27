import { AppConfig } from "../@types/AppConfig";

const rows = 10;
const columns = 20;
const cellSize = Math.ceil(480 / Math.max(rows, columns));

export const GridConfig: AppConfig = {
  rows,
  columns,
  cellSize,
};
