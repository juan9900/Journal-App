import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
// [
//   // { index: true, path: "login", element: <LoginPage /> },
//   // { path: "register", element: <RegisterPage /> },

//   // { path: "*", element: <Navigate to={"/auth/login"} /> },
// ];
