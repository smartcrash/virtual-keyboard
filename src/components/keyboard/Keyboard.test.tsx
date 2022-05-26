import { vi } from "vitest";
import { render, fireEvent, within } from "../../testUtils";
import Keyboard, { keyCodes } from "./Keyboard";

describe("<Keyboard/>", () => {
  it("should show all keys", () => {
    const { getAllByTestId } = render(<Keyboard />);

    Object.entries(keyCodes).forEach(([key, keyCode]) => {
      const element = getAllByTestId(keyCode)[0];

      expect(element).toBeDefined();
      expect(within(element).getByText(key, { trim: false })).toBeDefined();
    });
  });

  it("should trigget `onKeyDown` when a key is pressed", async () => {
    const onKeyDown = vi.fn();

    const { getByTestId } = render(<Keyboard onKeyDown={onKeyDown} />);

    fireEvent.click(getByTestId(keyCodes["a"]));

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenLastCalledWith("a");
  });
});
