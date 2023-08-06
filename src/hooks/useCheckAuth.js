import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";
import { logout, login } from "../store/auth";
import { useNavigate } from "react-router-dom";

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) {
        navigate("/auth/login", { replace: true });
        dispatch(logout());
        return;
      }
      const { uid, displayName, email, photoURL } = user;
      dispatch(login({ uid, displayName, email, photoURL }));
    });
  }, []);

  return status;
};
