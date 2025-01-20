import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import { ListPage } from "./pages/ListPage";
import { HomePage } from "./pages/HomePage";
import { ListDataProvider } from "./misc/listDataContext";

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

const App = () => (
  <ListDataProvider>
    <RouterProvider router={mainRouter} />
  </ListDataProvider>
);

export default App;
