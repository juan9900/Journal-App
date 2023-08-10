import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaving: false,
  messageSaved: null,
  notes: [],
  //   activeNote: null,
  active: null,
  errorMessage: null,
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNewNote: (state, action) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
      state.errorMessage = null;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.errorMessage = null;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state, action) => {
      state.isSaving = true;
      state.messageSaved = null;
      state.errorMessage = null;
    },
    updateNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) {
          return payload;
        }
        return note;
      });

      state.messageSaved = `${payload.title}, actualizada con éxito!`;
      state.errorMessage = null;
    },
    setErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    },
    setImagesUrls: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    logoutJournal: (state, action) => {
      state.isSaving = false;
      state.messageSaved = null;
      state.notes = [];

      state.active = null;
    },
    deleteNoteById: (state, action) => {
      console.log(action.payload);
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.active = null;
    },
  },
});

export const {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setErrorMessage,
  setImagesUrls,
  logoutJournal,
  deleteNoteById,
} = journalSlice.actions;

export default journalSlice.reducer;
