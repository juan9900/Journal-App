import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  setActiveNote,
  savingNewNote,
  setNotes,
  setSaving,
  updateNote,
  setErrorMessage,
  setImagesUrls,
  deleteNoteById,
} from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startCreateNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };

    try {
      const newDoc = await addDoc(
        collection(firebaseDB, `/${uid}/journal/notes`),
        newNote
      );
      newNote.id = newDoc.id;
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
    if (!uid) throw new Error("El usuario no existe");
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
      dispatch(updateNote(note));
    } catch (e) {
      dispatch(setErrorMessage("No se pudo guardar la nota."));
      console.error("Error updating document: ", e);
    }
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    dispatch(setImagesUrls(photosUrls));
  };
};

export const startDeleteNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { id } = getState().journal.active;
    try {
      console.log("deleting");
      const res = await deleteDoc(
        doc(firebaseDB, `/${uid}/journal/notes/${id}`)
      );
      dispatch(deleteNoteById(id));
    } catch (error) {
      console.log(error);
    }
  };
};
