import { HStack, VStack } from "@chakra-ui/react";
import Kbd from "./Kbd";

interface Props {
  onKeyDown?: (key: string) => void;
}

function Keyboard({ onKeyDown = () => {} }: Props) {
  return (
    <VStack>
      {keysLayout.map((keysRow, index) => (
        <HStack key={index}>
          {keysRow.map((key) => {
            let width: any = undefined;

            switch (key) {
              case "backspace":
              case "tab":
              case "shift":
                width = 44;
                break;

              case "enter":
              case "capslk":
                width = "149px";
                break;

              case "alt":
              case "ctrl":
                width = 24;
                break;
              case "command":
                width = 24;
                break;
              case "space":
                width = 96;
                break;
            }

            return (
              <Kbd width={width} testId={key} key={key} onClick={onKeyDown}>
                {key}
              </Kbd>
            );
          })}
        </HStack>
      ))}
    </VStack>
  );
}

const keysLayout = [
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
  ["capslk", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "'", "enter"],
  ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", ",", ".", "/"],
  ["ctrl", "alt", "command", "space", "command", "alt", "ctrl"],
];

export default Keyboard;
