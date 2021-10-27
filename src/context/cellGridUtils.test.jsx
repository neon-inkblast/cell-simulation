import { initialState, generateNext, toggleCell } from "./cellGridUtils";

const testPatterns = {
  filled: [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ],
  empty: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  hRectangle: {
    setup: [
      [0, 1, 1, 0, 0],
      [0, 0, 1, 0, 0],
    ],
    expected: [
      [0, 1, 1, 1, 0],
      [0, 0, 0, 1, 0],
    ],
  },
  vRectangle: {
    setup: [
      [0, 1],
      [1, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ],
    expected: [
      [0, 0],
      [1, 0],
      [1, 0],
      [0, 0],
      [0, 0],
    ],
  },
  example: [
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 1, 1, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1],
      [0, 0, 1, 1, 0],
    ],
    [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1],
      [0, 0, 1, 1, 1],
    ],
  ],
};

const convertPatternToState = (pattern, generation = 1) => {
  return {
    grid: pattern.map((row) => row.map((cell) => !!cell)),
    generation,
  };
};

describe("Cell simulation logic", () => {
  describe("Test util - convertPatternToState()", () => {
    it("converts a pattern using 0 and 1 to and array of bools with a default generation, matching the state type", () => {
      const result = convertPatternToState(testPatterns.example[0]);
      expect(result).toEqual({
        generation: 1,
        grid: [
          [false, false, false, false, false],
          [false, false, true, false, false],
          [false, false, false, true, false],
          [false, true, true, true, false],
          [false, false, false, false, false],
        ],
      });
    });
    it("converts a pattern using 0 and 1 to and array of bools with a specified generation, matching the state type", () => {
      const result = convertPatternToState(testPatterns.example[0], 47);
      expect(result).toEqual({
        generation: 47,
        grid: [
          [false, false, false, false, false],
          [false, false, true, false, false],
          [false, false, false, true, false],
          [false, true, true, true, false],
          [false, false, false, false, false],
        ],
      });
    });
  });
  describe("Toggle cell", () => {
    it("toggles a live cell to dead", () => {
      const start = convertPatternToState(testPatterns.filled);
      const expected = convertPatternToState([
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
      ]);
      const result = toggleCell(start, 2, 2);
      expect(result).toEqual(expected);
    });
    it("toggles a dead cell to alive", () => {
      const start = convertPatternToState(testPatterns.empty);
      const expected = convertPatternToState([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]);
      const result = toggleCell(start, 2, 2);
      expect(result).toEqual(expected);
    });
  });

  describe("Initial state", () => {
    it("initialises with an empty grid, at generation 0", () => {
      const expected = convertPatternToState(testPatterns.empty, 0);
      const result = initialState();
      expect(result).toEqual(expected);
    });
  });

  describe("Calculate next generation", () => {
    it("returns an empty board when given a filled grid (overpopulation)", () => {
      const start = convertPatternToState(testPatterns.filled, 0);
      const expected = convertPatternToState(testPatterns.empty, 1);
      const result = generateNext(start);
      expect(result).toEqual(expected);
    });

    it("returns an empty grid when given an empty grid (underpopulation)", () => {
      const start = convertPatternToState(testPatterns.empty, 0);
      const expected = convertPatternToState(testPatterns.empty, 1);
      const result = generateNext(start);
      expect(result).toEqual(expected);
    });

    it("correctly calculates next generation when number of rows is more than number of columns", () => {
      const start = convertPatternToState(testPatterns.vRectangle.setup);
      const expected = convertPatternToState(testPatterns.vRectangle.expected, 2);
      const result = generateNext(start);
      expect(result).toEqual(expected);
    });

    it("correctly calculates next generation when number of columns is more than number of rows", () => {
      const start = convertPatternToState(testPatterns.hRectangle.setup);
      const expected = convertPatternToState(testPatterns.hRectangle.expected, 2);
      const result = generateNext(start);
      expect(result).toEqual(expected);
    });

    for (let i = 0; i < testPatterns.example.length - 1; i++) {
      it(`produces next generation in accordance with given examples: ${i + 1} -> ${i + 2}`, () => {
        const start = convertPatternToState(testPatterns.example[i], i);
        const expected = convertPatternToState(testPatterns.example[i + 1], i + 1);
        const result = generateNext(start);
        expect(result).toEqual(expected);
      });
    }
  });
});
