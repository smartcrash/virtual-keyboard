import App from "./App";
import { keyCodes } from "./components/keyboard/Keyboard";
import { render, fireEvent } from "./testUtils";

describe("<App/>", () => {
  it("renders correctly", () => {
    render(<App />);
  });

  it("should show text that you type using the virtual keyboard", async () => {
    const { getByTestId } = render(<App />);

    const container = getByTestId("textinput");

    expect(container.innerHTML).toEqual("");

    fireEvent.click(getByTestId(keyCodes["h"]));
    fireEvent.click(getByTestId(keyCodes["e"]));
    fireEvent.click(getByTestId(keyCodes["l"]));
    fireEvent.click(getByTestId(keyCodes["l"]));
    fireEvent.click(getByTestId(keyCodes["o"]));

    expect(container.innerHTML).toEqual("hello");
  });

  it("should not show displayable key like TABs or CTRL", async () => {
    const { getAllByTestId, getByTestId } = render(<App />);

    const container = getByTestId("textinput");

    expect(container.innerHTML).toEqual("");

    [
      "backspace",
      "tab",
      "enter",
      "shiftright",
      "shiftleft",
      "controlleft",
      "controlright",
      "altright",
      "altleft",
      "capslock",
    ].forEach((key) => fireEvent.click(getAllByTestId(keyCodes[key])[0]));

    expect(container.innerHTML.trim()).toEqual("");
  });

  it("should toggle caps using the capslock key", async () => {
    const { getByTestId, getAllByTestId } = render(<App />);

    const container = getByTestId("textinput");

    expect(container.innerHTML).toEqual("");

    ["a", "a", "a", "capslock", "a", "a", "a"].forEach((key) =>
      fireEvent.click(getAllByTestId(keyCodes[key])[0])
    );

    expect(container.innerHTML.trim()).toEqual("aaaAAA");
  });
});
