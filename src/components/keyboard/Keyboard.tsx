import { HStack, VStack } from "@chakra-ui/react";
import Kbd from "./Kbd";

interface Props {
  onKeyDown?: (key: string) => void;
}

function Keyboard({ onKeyDown = () => {} }: Props) {
  return (
    <VStack spacing={-1}>
      {keysLayout.map((keysRow, index) => (
        <HStack key={index} spacing={0.5}>
          {keysRow.map((key, keyIndex) => {
            let width: string | undefined = undefined;

            switch (key) {
              case "backspace":
              case "tab":
              case "shift":
                width = "176px";
                break;

              case "enter":
              case "capslk":
                width = "153px";
                break;

              case "alt":
              case "ctrl":
                width = "80px";
                break;
              case "command":
                width = "112px";
                break;
              case "space":
                width = "478px";
                break;
            }

            return (
              <Kbd
                width={width}
                key={`${index}-${keyIndex}`}
                onClick={onKeyDown}
                zIndex={index + 1}
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
