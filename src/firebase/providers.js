import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    const { displayName, email, uid, photoURL } = result.user;
    return {
      ok: true,
      // User info
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

export const createUserWithEmail = async ({
  email,
  password,
  displayName = "",
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;
    await updateProfile(firebaseAuth.currentUser, { displayName });
    return {
      ok: true,
      email,
      password,
      uid,
      photoURL,
    };
  } catch (error) {
    console.log(error.message);
    console.log(error.code);
    const errorCode = error.code;
    let errorMessage = "";
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "El correo ya se encuentra registrado.";
        break;

      default:
        errorMessage = error.message;
        break;
    }
    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

export const loginUserWithEmail = async (email, password) => {
  try {
    const resp = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );

    const { displayName, uid, photoURL } = resp.user;

    return {
      ok: true,
      email,
      displayName,
      uid,
      photoURL,
    };
  } catch (error) {
    let errorMessage = "An unexpected error occurred. Please try again.";
    switch (error.code) {
      case "auth/wrong-password":
        errorMessage =
          "The password or email address you entered is incorrect. Please try again.";
        break;

      case "auth/user-not-found":
        errorMessage =
          "The password or email address you entered is incorrect. Please try again.";
        break;

      default:
        break;
    }
    return {
      ok: false,
      errorMessage: errorMessage,
    };
  }
};

export const signOutUser = async () => {
  console.log(firebaseAuth);
  return await firebaseAuth.signOut();
};
