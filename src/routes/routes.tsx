import React from "react";
import MainSuspense from "@/components/main-suspense";

const HomePage = React.lazy(() =>
  import("../pages/all-books").then((module) => ({ default: module.AllBooks }))
);
const EditBook = React.lazy(() =>
  import("../pages/books-view-page").then((module) => ({
    default: module.default,
  }))
);
export const bookAppRoutes = [
  {
    path: "/",
    element: <MainSuspense ChildComponent={HomePage} />,
  },
  {
    path: "/books/:id",
    element: <MainSuspense ChildComponent={EditBook} />,
  },
];
