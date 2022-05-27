import { vi } from "vitest";
import { fireEvent, render } from "../../testUtils";
import Keyboard, { keyCodes } from "./Keyboard";

describe("<Keyboard/>", () => {
  it("should show all keys", () => {
    const { getAllByTestId } = render(<Keyboard />);

    Object.entries(keyCodes).forEach(([key, keyCode]) => {
      const element = getAllByTestId(keyCode)[0];

      expect(element).toBeDefined();
    });
  });

  it("should be in sync with real keyboard, when a key is pressed `onKeyDown` should be triggeredd", async () => {
    const onKeyDown = vi.fn();

    const { container } = render(<Keyboard onKeyDown={onKeyDown} />);

    fireEvent.keyDown(container, {
      key: "A",
      code: "KeyA",
      keyCode: 65,
    });

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledWith("a");
  });

  it("should trigget `onKeyDown` when a key is pressed", async () => {
    const onKeyDown = vi.fn();

    const { getByTestId } = render(<Keyboard onKeyDown={onKeyDown} />);

    fireEvent.click(getByTestId(keyCodes["a"]));

    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenLastCalledWith("a");
  });
});
