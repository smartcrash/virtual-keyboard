import { Center, IconButton, Text, useColorMode } from "@chakra-ui/react";

function ColorModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = colorMode === "dark" ? "☀️" : "🌜";

  return (
    <IconButton
      icon={<Center>{icon}</Center>}
      onClick={toggleColorMode}
      size={"lg"}
      fontSize={"xl"}
      aria-label={"toggle-color-mode"}
    />
  );
}

export default ColorModeSwitch;
