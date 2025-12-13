import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/Auth/Login.jsx";
import RegisterPage from "../pages/Auth/Register.jsx";
import { HOME, REGISTER, LOGIN } from "./paths.js";

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
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
