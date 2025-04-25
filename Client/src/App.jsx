import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Mentor from "./Pages/Mentor";
import Message from "./Pages/Message";
import Task from "./Pages/Task";
import AddTask from "./Pages/AddTask";
import Profile from "./Pages/Profile";
import Layout from "./Layout/Layout";
import { GlobalContextProvider } from "./Context/GlobalContext";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
          path: "add-task",
          element: <AddTask />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return (
    <GlobalContextProvider>
      <RouterProvider router={router}></RouterProvider>;
    </GlobalContextProvider>
  );
};

export default App;
