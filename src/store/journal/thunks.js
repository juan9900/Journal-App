import { useSelector } from "react-redux";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  setActiveNote,
  savingNewNote,
  setNotes,
  setSaving,
  updateNote,
} from "./journalSlice";
import { loadNotes } from "../../helpers";

export const startCreateNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;
    console.log("start new note");
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    try {
      const newDoc = await addDoc(
        collection(firebaseDB, `/${uid}/journal/notes`),
        newNote
      );
      newNote.id = newDoc.id;
      console.log("document created");
    } catch (error) {
      console.log(error);
    }

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingUserNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Exception("El usuario no existe");
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startUpdateNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    try {
      dispatch(setSaving());
      const docRef = doc(firebaseDB, `/${uid}/journal/notes/${note.id}`);
      await updateDoc(docRef, noteToFirestore);
      console.log("Document written with ID: ", docRef.id);
      dispatch(updateNote(note));
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
};
