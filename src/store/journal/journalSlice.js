import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  //   activeNote: null,
  active: null,
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
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = "";
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state, action) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote: (state, { payload }) => {
      console.log(payload);
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) {
          return payload;
        }
        return note;
      });

      state.messageSaved = `${payload.title}, actualizada con éxito!`;
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
} = journalSlice.actions;

export default journalSlice.reducer;
