import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ColorModeProvider } from "./components/ui/color-mode";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import "@chakra-ui/react";
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode>
);
