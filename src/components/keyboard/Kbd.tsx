import {
  Box,
  BoxProps,
  Center,
  useDisclosure,
  useEventListener,
} from "@chakra-ui/react";
import { MouseEventHandler, useState } from "react";
import useSound from "use-sound";
import keyPressSound from "./sounds/key-press.wav";

interface Props extends BoxProps {
  code: string;
  keyCode: number;
  onPress: (key: string) => void;
  variant?: keyof typeof themes;
}

function Kbd({
  width = `64px`,
  variant = "light",
  onPress = () => {},
  code,
  keyCode,
  children,
  ...props
}: Props) {
  const {
    isOpen: isPressed,
    onOpen: onKeyDown,
    onClose: onKeyUp,
  } = useDisclosure();
  const [playbackRate, setPlaybackRate] = useState(0.85);
  const [play] = useSound(keyPressSound, {
    playbackRate,
    volume: 0.25,
    // `interrupt` ensures that if the sound starts again before it's
    // ended, it will truncate it. Otherwise, the sound can overlap.
    interrupt: true,
  });

  const checkKey = (event: KeyboardEvent): boolean =>
    (code === event.code.toLowerCase() || code === event.key.toLowerCase()) &&
    keyCode === event.keyCode;

  const playSound = () => {
    setPlaybackRate(random(0.85, 1));
    play();
  };

  useEventListener("keydown", (event) => {
    if (checkKey(event)) {
      playSound();
      onKeyDown();

      // Uppercase if shift is pressed and this key is a letter
      onPress(event.shiftKey && code.length === 1 ? code.toUpperCase() : code);
    }
  });

  useEventListener("keyup", (event) => {
    if (checkKey(event)) onKeyUp();
  });

  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    playSound();
    onPress(code);
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
      transform={isPressed ? "translateY(5px)" : undefined}
      _active={{ transform: "translateY(5px)", outline: "none" }}
      _focus={{ outline: "none" }}
      fontSize={"md"}
      userSelect={"none"}
      tabIndex={1}
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
