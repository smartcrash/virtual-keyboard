import {
  Box,
  ColorModeScript,
  Divider,
  HStack,
  keyframes,
  Text,
  useEventListener,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import ColorModeSwitch from "./components/color-mode-switch";
import Keyboard from "./components/keyboard";
import { keyCodes } from "./constants";
import { pause } from "./helpers";

const cursor = keyframes`
  from { border-color: black; }
  to { border-color: white; }
`;

function App() {
  const [text, setText] = useState("");

  // Prevent keypress default behavior
  useEventListener("keypress", (event) => event.preventDefault());

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

  /* Simulate typing with the virtual keyboard for demostration */
  const typer = async (text: string) => {
    // Do not run demostration on test enviroment
    if (process.env.NODE_ENV === "test") return;

    // Prevent running this function more than once at the same time
    if (isTyping.current) return;

    isTyping.current = true;

    const queue = text.split("");

    while (queue.length) {
      const key = queue.shift()!;
      const keyboardEventInit: KeyboardEventInit = {
        key,
        keyCode: keyCodes[key],
      };

      document.dispatchEvent(new KeyboardEvent("keydown", keyboardEventInit));
      await pause(75);
      document.dispatchEvent(new KeyboardEvent("keyup", keyboardEventInit));

      await pause(100);
    }
  };

  useEffect(() => {
    typer("hello world");
  }, []);

  return (
    <Box as="main" w={"100vw"} h={"100vh"}>
      <Box maxWidth={"1034px"} mx={"auto"}>
        <HStack justifyContent={"flex-end"} py={6}>
          <ColorModeSwitch />
        </HStack>

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

        <Divider bg={"transparent"} h={10} />

        <Keyboard onKeyDown={onKeyDown} />
      </Box>
    </Box>
  );
}

export default App;
