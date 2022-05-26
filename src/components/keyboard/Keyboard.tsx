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
            let w: number | undefined = undefined;

            switch (key) {
              case "backspace":
              case "enter":
              case "capslk":
                w = 40;
                break;
              case "space":
                w = 96;
                break;
            }

            return (
              <Kbd width={w} testId={key} key={key} onClick={onKeyDown}>
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
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace"],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["capslk", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "?"],
  ["space"],
];

export default Keyboard;
