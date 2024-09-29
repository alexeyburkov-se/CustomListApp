import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { ListPage } from "./pages/ListPage";
import { HomePage } from "./pages/HomePage";

const App = () => {
  const mainRouter = createBrowserRouter([
    {
      path: "/list/:listId",
      element: <ListPage />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/",
      loader: () => redirect("/list/new"),
    },
  ]);
  return <RouterProvider router={mainRouter} />;
};

export default App;
