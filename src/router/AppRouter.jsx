import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/auth";
import { CheckingAuth } from "../ui/components/checkingAuth";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, displayName, email, photoURL } = user;
      dispatch(login({ uid, displayName, email, photoURL }));
    });
  }, []);

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
    </Routes>
  );
};
