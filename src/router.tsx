import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import BookDetails from "./pages/BookDetails";
import HomePage from "./pages/HomePage";
import WishList from "./pages/WishList";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "wishlist",
        element: <WishList />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);
