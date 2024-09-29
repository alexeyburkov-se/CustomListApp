import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { ListPage } from "./pages/ListPage";

const App = () => {
  const mainRouter = createBrowserRouter([
    {
      path: "/list/:listId",
      element: <ListPage />,
    },
    {
      path: "/home",
      element: <ListPage />,
    },
    {
      path: "/",
      loader: () => redirect("/list/new"),
    },
  ]);
  return <RouterProvider router={mainRouter} />;
};

export default App;
