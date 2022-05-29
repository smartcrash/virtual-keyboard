import { HStack, VStack } from "@chakra-ui/react";
import { useRef } from "react";
import { keyCodes } from "../../constants";
import Kbd from "./Kbd";

interface Props {
  onKeyDown?: (key: string) => void;
}

const keyColor = (key: string) => {
  switch (key) {
    case "~":
    case "enter":
      return "red";
    case "backspace":
    case "tab":
    case "shiftleft":
    case "shiftright":
    case "capslock":
    case "alt":
    case "altright":
    case "altleft":
    case "control":
    case "controlleft":
    case "controlright":
    case "command":
      return "blue";
    case " ":
      return "dark";
    default:
      return "light";
  }
};

const keyLabel = (key: string) => {
  if (key.includes("shift")) return "shift";
  if (key.includes("control")) return "ctrl";
  if (key.includes("alt")) return "alt";
  return key;
};

const keyWidth = (key: string) => {
  switch (key) {
    case "backspace":
    case "tab":
      return "176px";
    case "shiftleft":
    case "shiftright":
      return "186px";
    case "enter":
    case "capslock":
      return "153px";
    case "altright":
    case "altleft":
    case "controlleft":
    case "controlright":
      return "80px";
    case "command":
      return "112px";
    case " ":
      return "478px";
  }
};

function Keyboard({ onKeyDown = () => {} }: Props) {
  const capsLock = useRef(false);

  const onPress = (key: string) => {
    if (key === "capslock") capsLock.current = !capsLock.current;

    if (capsLock.current && key.length === 1) onKeyDown(key.toUpperCase());
    else onKeyDown(key);
  };

  return (
    <VStack spacing={-1}>
      {keysLayout.map((keysRow, index) => (
        <HStack key={index} spacing={0.5}>
          {keysRow.map((key, keyIndex) => (
            <Kbd
              code={key}
              keyCode={keyCodes[key]}
              variant={keyColor(key)}
              width={keyWidth(key)}
              key={`${index}-${keyIndex}`}
              onPress={onPress}
              zIndex={index}
              data-keycode={keyCodes[key]}
              data-testid={keyCodes[key]}
            >
              {keyLabel(key)}
            </Kbd>
          ))}
        </HStack>
      ))}
    </VStack>
  );
}

export const keysLayout = [
  [
    "~",
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
    "-",
    "+",
    "backspace",
  ],
  ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
  ["capslock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "'", "enter"],
  ["shiftleft", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shiftright"],
  [
    "controlleft",
    "altleft",
    "command",
    " ",
    "command",
    "altright",
    "controlright",
  ],
];

export default Keyboard;
