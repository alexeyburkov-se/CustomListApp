import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { ListPage, ListPlaceholderPage } from "./pages/ListPage";
import { HomePage } from "./pages/HomePage";
import { Suspense } from "react";

const App = () => {
  const mainRouter = createBrowserRouter([
    {
      path: "/list",
      element: (
        <Suspense fallback={<ListPlaceholderPage />}>
          <ListPage />
        </Suspense>
      ),
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
  return <RouterProvider router={mainRouter} />;
};

export default App;
