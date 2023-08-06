import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/auth";
import { CheckingAuth } from "../ui/components/checkingAuth";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";
import { useCheckAuth } from "../hooks/useCheckAuth";

export const AppRouter = () => {
  const status = useCheckAuth();
  if (status === "checking") {
    return <CheckingAuth />;
  }
  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
