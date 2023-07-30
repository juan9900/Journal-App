import { signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, logout } from "./";
import { login } from "./";

export const checkingAuthentication = (email, password) => {
  return async (dispatch, getState) => {
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
