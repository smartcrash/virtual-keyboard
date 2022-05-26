import { Box, BoxProps, Center } from "@chakra-ui/react";
import { useState } from "react";
import useSound from "use-sound";
import keyPressSound from "./sounds/key-press.wav";

interface Props extends Omit<BoxProps, "onClick" | "children"> {
  variant?: keyof typeof themes;
  onClick: (key: string) => void;
  children: string;
}

function Kbd({
  width = `64px`,
  variant = "light",
  onClick = () => {},
  children,
  ...props
}: Props) {
  const [playbackRate, setPlaybackRate] = useState(0.85);
  const [play] = useSound(keyPressSound, {
    playbackRate,
    // `interrupt` ensures that if the sound starts again before it's
    // ended, it will truncate it. Otherwise, the sound can overlap.
    interrupt: true,
  });

  const handleClick = () => {
    setPlaybackRate(random(0.85, 1));
    play();
    onClick(children);
  };

  return (
    <Box
      width={width}
      height={`64px`}
      borderRadius={"md"}
      borderTopWidth={0}
      borderBottomWidth={20}
      borderLeftWidth={6}
      borderRightWidth={6}
      _active={{ transform: "translateY(5px)" }}
      fontFamily={"monospace"}
      fontSize={"md"}
      userSelect={"none"}
      data-testid={children}
      onClick={handleClick}
      {...themes[variant]}
      {...props}
    >
      <Center h={"full"}>{children}</Center>
    </Box>
  );
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;

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

export default Kbd;
