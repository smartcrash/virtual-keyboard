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
    case "control":
    case "command":
      return "blue";
    case " ":
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
    case "control":
      return "80px";
    case "command":
      return "112px";
    case " ":
      return "478px";
  }
};

const getKbd = (keyCode: number): HTMLDivElement | null =>
  document.querySelector(`[data-keycode="${keyCode}"]`);

function Keyboard({ onKeyDown = () => {} }: Props) {
  useEventListener("keydown", (event) => {
    event.preventDefault();

    const keyCode = keyCodes[event.key.toLowerCase()];
    const element = getKbd(keyCode);

    element?.click();
    element?.focus();
  });

  useEventListener("keyup", ({ key }) => {
    const keyCode = keyCodes[key.toLowerCase()];
    const element = getKbd(keyCode);

    element?.blur();
  });

  return (
    <VStack spacing={-1}>
      {keysLayout.map((keysRow, index) => (
        <HStack key={index} spacing={0.5}>
          {keysRow.map((key, keyIndex) => {
            return (
              <Kbd
                width={keyWidth(key)}
                key={`${index}-${keyIndex}`}
                variant={keyColor(key)}
                onClick={() => onKeyDown(key)}
                zIndex={index}
                data-testid={keyCodes[key]}
                data-keycode={keyCodes[key]}
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

export const keyCodes: Record<string | number, number> = {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  control: 17,
  alt: 18,
  capslock: 20,
  " ": 32,
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  "+": 107,
  "-": 109,
  ",": 188,
  ".": 190,
  ":": 59,
  "~": 192,
  "/": 191,
  "[": 219,
  "\\": 220,
  "]": 221,
  "'": 222,
};

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
  ["control", "alt", "command", " ", "command", "alt", "control"],
];

export default Keyboard;
