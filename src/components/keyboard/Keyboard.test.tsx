import { vi } from "vitest";
import { render, fireEvent } from "../../testUtils";
import Keyboard from "./Keyboard";

const KEYS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",

  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",

  ",",
  ".",
  "/",

  "backspace",
  "shift",
  "capslk",
  "enter",
  "space",
];

describe("<Keyboard/>", () => {
  it("should show all keys", () => {
    const { getAllByTestId } = render(<Keyboard />);

    KEYS.forEach((key) => {
      const element = getAllByTestId(key)[0];

      expect(element).toBeDefined();
      expect(element.innerHTML).toMatch(new RegExp(`>${key}<`, "ig"));
    });
  });

  it("should trigget `onKeyDown` when a key is pressed", async () => {
    const onKeyDown = vi.fn();

    const { getByTestId } = render(<Keyboard onKeyDown={onKeyDown} />);

    fireEvent.click(getByTestId("a"));

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenLastCalledWith("a");
  });
});
