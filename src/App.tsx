import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import Keyboard from "./components/keyboard";

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

  return (
    <Box maxWidth={"1034px"} mx={"auto"} pt={20}>
      <Text
        fontSize={"5xl"}
        fontFamily={"monospace"}
        fontWeight={"bold"}
        data-testid={"textinput"}
        whiteSpace={"pre-wrap"}
        mb={10}
      >
        {text}
      </Text>
      <Keyboard onKeyDown={onKeyDown} />
    </Box>
  );
}

export default App;
