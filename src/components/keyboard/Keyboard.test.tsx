import { vi } from "vitest";
import { render, fireEvent, within } from "../../testUtils";
import Keyboard, { keysLayout } from "./Keyboard";

describe("<Keyboard/>", () => {
  it("should show all keys", () => {
    const { getAllByTestId } = render(<Keyboard />);

    keysLayout.flat().forEach((key) => {
      const element = getAllByTestId(key)[0];

      expect(element).toBeDefined();
      expect(within(element).getByText(key)).toBeDefined();
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
