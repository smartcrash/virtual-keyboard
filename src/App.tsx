import { HStack } from "@chakra-ui/react";
import Keyboard from "./components/keyboard";

function App() {
  return (
    <HStack justifyContent={"center"} alignItems={"center"} pt={20}>
      <Keyboard />
    </HStack>
  );
}

export default App;
