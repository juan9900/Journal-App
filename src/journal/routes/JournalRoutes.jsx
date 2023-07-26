import { Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";

export const JournalRoutes = [
  { index: true, path: "/", element: <HomePage /> },
  { path: "/*", element: <Navigate to={"/"} /> },
];
