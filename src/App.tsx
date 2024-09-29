import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { ListPage } from "./pages/ListPage";

const App = () => {
  const mainRouter = createBrowserRouter([
    {
      path: "/list/item/:listId",
      element: <ListPage />,
    },
    {
      path: "/list/new",
      element: <ListPage />,
    },
    {
      path: "/",
      loader: () => {
        throw redirect("/list/new");
      },
    },
  ]);
  return <RouterProvider router={mainRouter} />;
};

export default App;
