import {
  createUserWithEmail,
  signInWithGoogle,
} from "../../firebase/providers";
import { checkingCredentials, logout } from "./";
import { login } from "./";

export const checkingAuthentication = (email, password) => {
  return async (dispatch, getState) => {
    console.log("dispatching credentials");
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch, getState) => {
    dispatch(checkingAuthentication());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));
    console.log(result);
    dispatch(login(result));
  };
};

export const startCreateUserWithEmail = ({ email, password, displayName }) => {
  return async (dispatch, getState) => {
    dispatch(checkingAuthentication());
    const {
      ok,
      uid,
      photoURL,
      errorMessage = "",
    } = await createUserWithEmail({ email, password, displayName });
    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, displayName, email, photoURL }));

    // if (!result.ok) return dispatch(logout(result.errorMessage));
    // console.log(result);
    // dispatch(login(result));
  };
};
