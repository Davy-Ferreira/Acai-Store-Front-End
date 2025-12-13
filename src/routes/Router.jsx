import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/Auth/Login.jsx";
import RegisterPage from "../pages/Auth/Register.jsx";
import { HOME, REGISTER, LOGIN } from "./paths.js";

// Este componente centraliza a definição de todas as rotas da aplicação.
const router = createBrowserRouter([
  {
    path: HOME,
    element: <LoginPage />,
  },
  {
    path: REGISTER,
    element: <RegisterPage />,
  },
  {
    path: LOGIN,
    element: <LoginPage />,
  }
]);

// O componente Router é exportado para ser usado no main.jsx
export function AppRouter() {
  return <RouterProvider router={router} />;
}
