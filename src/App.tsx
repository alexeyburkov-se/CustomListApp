import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import { ListPage } from "./pages/ListPage";
import { HomePage } from "./pages/HomePage";

const mainRouter = createBrowserRouter([
  {
    path: "/",
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
