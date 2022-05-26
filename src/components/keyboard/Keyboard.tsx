import { HStack, useEventListener, VStack } from "@chakra-ui/react";
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
    case "shift":
    case "capslock":
    case "alt":
    case "ctrl":
    case "command":
      return "blue";

    case "space":
      return "dark";
    default:
      return "light";
  }
};

const keyWidth = (key: string) => {
  switch (key) {
    case "backspace":
    case "tab":
      return "176px";
    case "shift":
      return "186px";
    case "enter":
    case "capslock":
      return "153px";
    case "alt":
    case "ctrl":
      return "80px";
    case "command":
      return "112px";
    case "space":
      return "478px";
  }
};

function Keyboard({ onKeyDown = () => {} }: Props) {
  useEventListener("keydown", (event) => {
    console.log(event);

    // const element = document.querySelectorAll(`[data-testid=${key}]`)[0];
    // console.log(element?.click());
  });

  return (
    <VStack spacing={-1}>
      {keysLayout.map((keysRow, index) => (
        <HStack key={index} spacing={0.5}>
          {keysRow.map((key, keyIndex) => {
            const width = keyWidth(key);
            const variant = keyColor(key);

            return (
              <Kbd
                width={width}
                key={`${index}-${keyIndex}`}
                variant={variant}
                onClick={() => onKeyDown(key)}
                zIndex={index + 1}
                data-testid={key}
              >
                {key}
              </Kbd>
            );
          })}
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
  ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift"],
  ["ctrl", "alt", "command", "space", "command", "alt", "ctrl"],
];

export default Keyboard;
