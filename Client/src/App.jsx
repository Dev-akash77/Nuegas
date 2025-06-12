import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./Pages/Home";
import Mentor from "./Pages/Mentor";
import Message from "./Pages/Message";
import Task from "./Pages/Task";
import AddTask from "./Pages/AddTask";
import Profile from "./Pages/Profile";
import Layout from "./Layout/Layout";
import { GlobalContextProvider } from "./Context/GlobalContext";
import Auth from "./Pages/Auth";
import { Toaster } from "react-hot-toast";
import ProtectRutes from "./Security/ProtectRutes";
import TaskDetails from "./Pages/TaskDetails";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRutes>
          <Layout />
        </ProtectRutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "mentor",
          element: <Mentor />,
        },
        {
          path: "message",
          element: <Message />,
        },
        {
          path: "task",
          element: <Task />,
        },
        {
          path: "task/:id",
          element: <TaskDetails />,
        },
        {
          path: "add-task",
          element: <AddTask />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "auth",
      element: <Auth />,
    },
  ]);

  // ! query client from tanstack/react query
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <RouterProvider router={router}></RouterProvider>

        <Toaster />
      </GlobalContextProvider>
    </QueryClientProvider>
  );
};

export default App;
