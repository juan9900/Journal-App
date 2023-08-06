import { Navigate, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";

export const JournalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
// [
//   { index: true, path: "/", element: <HomePage /> },
//   { path: "/*", element: <Navigate to={"/"} /> },
// ];
