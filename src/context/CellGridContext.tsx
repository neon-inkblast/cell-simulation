import React, { useReducer } from "react";
import { CellGridAction, CellGridContextType, CellGridState } from "../@types/CellGridContext";
import { GridConfig } from "../config/gridConfig";
import { generateNext, initialState, toggleCell } from "./cellGridUtils";

export const CellGridContext = React.createContext<CellGridContextType | undefined>(undefined);

// reducer for the state in this context
function gridReducer(state: CellGridState, action: CellGridAction): CellGridState {
  switch (action.type) {
    case "reset": {
      return initialState(GridConfig.rows, GridConfig.columns);
    }
    case "toggle-cell": {
      return toggleCell(state, action.row as number, action.column as number);
    }
    case "generate-next": {
      return generateNext(state);
    }
    default:
      throw Error(`Action type "${action.type}" not defined.  No state change`);
  }
}

// reducer wrapped provider component
export function CellGridProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gridReducer, initialState(GridConfig.rows, GridConfig.columns));
  const value = { state, dispatch };
  return <CellGridContext.Provider value={value}> {children} </CellGridContext.Provider>;
}

// hook around useContext to show an error if used outside provider
export function useCellGridContext(): CellGridContextType {
  const context = React.useContext(CellGridContext);
  if (context === undefined) {
    throw new Error("useGrid must be used within a GridProvider");
  }
  return context;
}

export default { CellGridContext, CellGridProvider, useCellGridContext };
