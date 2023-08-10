import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";
import { logout, login } from "../store/auth";
import { startLoadingUserNotes } from "../store/journal/thunks";
import { logoutJournal } from "../store/journal";

export const useCheckAuth = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) {
        dispatch(logout());
        dispatch(logoutJournal());
        return;
      }
      const { uid, displayName, email, photoURL } = user;
      dispatch(login({ uid, displayName, email, photoURL }));
      dispatch(startLoadingUserNotes());
    });
  }, []);

  return status;
};
