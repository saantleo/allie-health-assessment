import { Box } from "@mui/material";
import Home from "./home";

import { RouterProvider, createBrowserRouter } from "react-router-dom"
import EditUserPage from "./edit";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/user/:id",
      element: <EditUserPage />
    }
  ])

  return (
    <Box sx={{ maxWidth: 800, margin: "80px auto" }}>
      <RouterProvider router={router} />
    </Box>
  );
};

export default App;
