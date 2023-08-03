import {
  createUserWithEmail,
  loginUserWithEmail,
  signInWithGoogle,
} from "../../firebase/providers";
import { checkingCredentials, logout } from "./";
import { login } from "./";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    console.log("dispatching credentials");
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingAuthentication());
    const result = await signInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));
    console.log(result);
    dispatch(login(result));
  };
};

export const startCreateUserWithEmail = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingAuthentication());
    const { ok, uid, photoURL, errorMessage } = await createUserWithEmail({
      email,
      password,
      displayName,
    });
    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, displayName, email, photoURL }));

    return {
      ok: true,
    };
  };
};

export const startLoginWithEmailAndPassword = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingAuthentication());
    const { ok, displayName, uid, photoURL, errorMessage } =
      await loginUserWithEmail(email, password);

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, photoURL, email }));
    return {
      ok: true,
    };
  };
};
