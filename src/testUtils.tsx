import { ChakraProvider } from "@chakra-ui/react";
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";

const AllTheProviders = ({ children }: { children: any }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
