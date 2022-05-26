import { Box, BoxProps, Center } from "@chakra-ui/react";

const themes = {
  dark: {
    color: "white",
    background: `gray.700`,
    borderColor: `gray.800`,
    borderTopColor: `gray.600`,
    borderBottomColor: `gray.900`,
  },
  light: {
    color: "black",
    background: `gray.50`,
    borderColor: `gray.200`,
    borderTopColor: `gray.50`,
    borderBottomColor: `gray.300`,
  },
  red: {
    color: "white",
    background: `red.600`,
    borderColor: `red.700`,
    borderTopColor: `red.500`,
    borderBottomColor: `red.800`,
  },
  blue: {
    color: "white",
    background: `cyan.600`,
    borderColor: `cyan.700`,
    borderTopColor: `cyan.500`,
    borderBottomColor: `cyan.800`,
  },
} as const;

interface Props extends Omit<BoxProps, "onClick" | "children"> {
  onClick: (key: string) => void;
  children: string;
}

function Kbd({ width = 16, onClick = () => {}, children, ...props }: Props) {
  return (
    <Box
      w={width}
      h={16}
      borderRadius={"md"}
      borderTopWidth={3}
      borderBottomWidth={18}
      borderLeftWidth={6}
      borderRightWidth={6}
      _active={{ transform: "translateY(5px)" }}
      fontFamily={"monospace"}
      fontSize={"md"}
      userSelect={"none"}
      data-testid={children}
      onClick={() => onClick(children)}
      {...themes["light"]}
      {...props}
    >
      <Center h={"full"}>{children}</Center>
    </Box>
  );
}

export default Kbd;
