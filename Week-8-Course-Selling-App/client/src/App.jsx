import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signup from "./components/SignUp";
import { Toaster } from "@/components/ui/toaster";
import SignIn from "./components/SignIn";
import Home from "./components/Home";

export default function App() {
  const Router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ]);
  return (
    <div className="font-custom">
      <Toaster />
      <RouterProvider router={Router}></RouterProvider>
    </div>
  );
}
