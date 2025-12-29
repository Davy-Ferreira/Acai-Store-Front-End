import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { AppRouter } from "./routes/Router.jsx";
import ToastHost from "./components/ui/toast/ToastHost";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastHost />
    <AppRouter />
  </StrictMode>
);
