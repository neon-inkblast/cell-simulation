import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CellGridContext } from "../context/CellGridContext";
import Cell from "./Cell";

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(<CellGridContext.Provider value={{ ...providerProps }}>{ui}</CellGridContext.Provider>, renderOptions);
};

describe("Cell component", () => {
  const testX = 1;
  const testY = 2;
  let renderResult;
  let providerProps;

  beforeEach(() => {
    providerProps = {
      state: [
        [0, 1],
        [1, 0],
      ],
      dispatch: jest.fn(),
    };
    renderResult = customRender(<Cell x={testX} y={testY} alive={true} />, { providerProps });
  });

  it("renders", () => {
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("dispatches a toggle cell event on click, with x/y props for context state", () => {
    // Click the cell
    userEvent.click(renderResult.container.firstChild);
    // Verify dispatch to context state was called
    expect(providerProps.dispatch).toHaveBeenCalledTimes(1);
    expect(providerProps.dispatch).toHaveBeenCalledWith({ type: "toggle-cell", column: testX, row: testY });
  });
});
