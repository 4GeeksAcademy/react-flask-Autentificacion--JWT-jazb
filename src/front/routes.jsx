import { jsxDEV } from "react/jsx-dev-runtime";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./SignUp.jsx"
import Home from "./pages/Home.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>   
  }
]);
