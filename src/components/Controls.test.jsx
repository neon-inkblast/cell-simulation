import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CellGridContext } from "../context/CellGridContext";
import Controls from "./Controls";

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(<CellGridContext.Provider value={{ ...providerProps }}>{ui}</CellGridContext.Provider>, renderOptions);
};

describe("Controls component", () => {
  let renderResult;
  let providerProps;

  beforeEach(() => {
    providerProps = {
      state: {
        generation: 0,
        grid: [
          [0, 1],
          [1, 0],
        ],
      },
      dispatch: jest.fn(),
    };
    renderResult = customRender(<Controls />, { providerProps });
  });

  it("renders", () => {
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  it("dispatches a reset event on Reset button click", () => {
    // Click the reset button
    const resetButton = screen.getByText(/reset/i);
    userEvent.click(resetButton);
    // Verify dispatch to context state was called
    expect(providerProps.dispatch).toHaveBeenCalledTimes(1);
    expect(providerProps.dispatch).toHaveBeenCalledWith({ type: "reset" });
  });

  it("dispatches a next generation event on Next button click", () => {
    // Click the next button
    const nextButton = screen.getByText(/next/i);
    userEvent.click(nextButton);
    // Verify dispatch to context state was called
    expect(providerProps.dispatch).toHaveBeenCalledTimes(1);
    expect(providerProps.dispatch).toHaveBeenCalledWith({ type: "generate-next" });
  });
});
