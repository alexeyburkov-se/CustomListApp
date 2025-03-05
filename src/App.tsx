import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import { ListPage } from "./pages/ListPage";
import { HomePage } from "./pages/HomePage";
import { MainAppBar } from "./components/MainAppBar";
import { createTheme, ThemeProvider } from "@mui/material";
import "./i18n/config";

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainAppBar />,
    children: [
      {
        index: true,
        loader: async () => redirect("/home"),
      },
      {
        path: "list",
        element: <ListPage />,
        // todo improve loading with suspense
      },
      {
        path: "home",
        element: <HomePage />,
      },
    ],
  },
]);

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

const App = () => (
  <ThemeProvider theme={theme} noSsr defaultMode="system">
    <RouterProvider router={mainRouter} />
  </ThemeProvider>
);

export default App;
