import { describe, expect, it } from "vite-plus/test";
import { checkGuess } from "./game-helpers";

describe("checkGuess", () => {
  it("returns null for empty guess", () => {
    expect(checkGuess("", "APPLE")).toBeNull();
  });

  it("throws if lengths differ", () => {
    expect(() => checkGuess("CAT", "APPLE")).toThrow(
      "The guess and answer must be the same length.",
    );
  });

  it("marks all letters correct", () => {
    expect(checkGuess("APPLE", "APPLE")).toEqual([
      { letter: "A", status: "correct" },
      { letter: "P", status: "correct" },
      { letter: "P", status: "correct" },
      { letter: "L", status: "correct" },
      { letter: "E", status: "correct" },
    ]);
  });

  it("marks misplaced letters correctly", () => {
    expect(checkGuess("PLEAP", "APPLE")).toEqual([
      { letter: "P", status: "misplaced" },
      { letter: "L", status: "misplaced" },
      { letter: "E", status: "misplaced" },
      { letter: "A", status: "misplaced" },
      { letter: "P", status: "misplaced" },
    ]);
  });

  it("handles duplicate letters properly", () => {
    expect(checkGuess("ALLEY", "APPLE")).toEqual([
      { letter: "A", status: "correct" },
      { letter: "L", status: "misplaced" },
      { letter: "L", status: "incorrect" },
      { letter: "E", status: "misplaced" },
      { letter: "Y", status: "incorrect" },
    ]);
  });

  it("marks incorrect letters", () => {
    expect(checkGuess("ZZZZZ", "APPLE")).toEqual([
      { letter: "Z", status: "incorrect" },
      { letter: "Z", status: "incorrect" },
      { letter: "Z", status: "incorrect" },
      { letter: "Z", status: "incorrect" },
      { letter: "Z", status: "incorrect" },
    ]);
  });
});
