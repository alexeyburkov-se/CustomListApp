import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import { ListPage } from "./pages/ListPage";
import { HomePage } from "./pages/HomePage";
import { ListDataProvider } from "./misc/listDataContext";

const mainRouter = createBrowserRouter([
  {
    path: "/list",
    element: <ListPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/",
    loader: () => redirect("/home"),
  },
]);

// todo improve loading with suspense

const App = () => (
  <ListDataProvider>
    <RouterProvider router={mainRouter} />
  </ListDataProvider>
);

export default App;
