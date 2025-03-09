import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import { ListPage } from "./pages/ListPage";
import { HomePage } from "./pages/HomePage";
import { MainAppBar } from "./components/MainAppBar";
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

const App = () => <RouterProvider router={mainRouter} />;

export default App;
