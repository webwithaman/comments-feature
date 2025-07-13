import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Comments from "./pages/Comments.jsx";
import { routeLoader } from "./utils/routeGuard.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    loader: () => {
      return routeLoader({
        onLoggedIn: {
          message: "Welcome to the Dashboard",
          redirectTo: "/dashboard",
        },
        noLoggedIn: {
          message: "Please Login",
          redirectTo: null,
        },
      });
    },
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: () => {
      return routeLoader({
        onLoggedIn: {
          message: "",
          redirectTo: null,
        },
        noLoggedIn: {
          message: "Please Login",
          redirectTo: "/login",
        },
      });
    },
  },
  {
    path: "/comments",
    element: <Comments />,
    loader: () => {
      return routeLoader({
        onLoggedIn: {
          message: "",
          redirectTo: null,
        },
        noLoggedIn: {
          message: "Please Login",
          redirectTo: "/login",
        },
      });
    },
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      return routeLoader({
        onLoggedIn: {
          message: "You are Already Logged In",
          redirectTo: "/dashboard",
        },
        noLoggedIn: {
          message: "",
          redirectTo: null,
        },
      });
    },
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
