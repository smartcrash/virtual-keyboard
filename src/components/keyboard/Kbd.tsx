import { Box, Center } from "@chakra-ui/react";

function Kbd({
  width = 14,
  onClick = () => {},
  testId,
  children,
}: {
  width?: any;
  onClick: (key: string) => void;
  testId?: string;
  children: string;
}) {
  return (
    <Box
      w={width}
      h={14}
      flexShrink={0}
      flexGrow={1}
      textAlign={"center"}
      borderColor={"gray"}
      borderRadius={"lg"}
      borderWidth={1}
      userSelect={"none"}
      data-testid={testId}
      onClick={() => onClick(children)}
    >
      <Center h={"full"}>{children}</Center>
    </Box>
  );
}

export default Kbd;
