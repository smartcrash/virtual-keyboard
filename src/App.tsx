import { Box, Divider, Text, keyframes } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Keyboard from "./components/keyboard";
import { keyCodes } from "./components/keyboard/Keyboard";

const cursor = keyframes`
  from { border-color: black; }
  to { border-color: white; }
`;

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  const [text, setText] = useState("");

  const onKeyDown = (key: string) => {
    if (key.includes("shift")) return;
    if (key.includes("control")) return;
    if (key.includes("alt")) return;
    if (key === "capslock") return;

    setText((value) => {
      switch (key) {
        case "backspace":
          return value.slice(0, -1);
        case "enter":
          return (value += "\n");
        case "tab":
          return (value += "\t");
        default:
          return (value += key);
      }
    });
  };

  const isTyping = useRef(false);

  const typer = async (text: string) => {
    if (isTyping.current) return;

    isTyping.current = true;

    const queue = text.split("");

    while (queue.length) {
      const key = queue.shift()!;
      const kbd = document.querySelector(`[data-keycode="${keyCodes[key]}"]`);

      (kbd as HTMLDivElement | null)?.click();
      (kbd as HTMLDivElement | null)?.focus();
      await pause(50);
      (kbd as HTMLDivElement | null)?.blur();

      await pause(150);
    }
  };

  useEffect(() => {
    typer("hello world");
  }, []);

  return (
    <Box maxWidth={"1034px"} mx={"auto"} pt={20}>
      <Text
        fontSize={"5xl"}
        fontFamily={"monospace"}
        fontWeight={"bold"}
        data-testid={"textinput"}
        // Simulate custom caret user right border and inline display
        display={"inline"}
        borderRightWidth={12}
        whiteSpace={"pre-wrap"}
        paddingRight={1}
        animation={`${cursor} infinite 800ms linear`}
      >
        {text}
      </Text>

      <Divider h={10} />

      <Keyboard onKeyDown={onKeyDown} />
    </Box>
  );
}

export default App;
