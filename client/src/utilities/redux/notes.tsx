import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NoteState = {
  id?: number;
  note?: string;
  date?: Date;
};

type UpdateNoteState = {
  note: string | undefined;
  id: string | undefined;
};

const initialState: NoteState[] = [];

export const noteSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setNoteInRedux: (state, action: PayloadAction<NoteState>) => {
      const { id, note, date } = action.payload;
      if (!state.every((note) => note.id !== id)) return state;
      state.push({ id, note, date });
      return state;
    },
    updateNoteInRedux: (state, action: PayloadAction<UpdateNoteState>) => {
      const { id, note } = action.payload;
      
      const index = state.findIndex((note) => note.id == id);
      const stateNote = state[index];
      stateNote.note = note;
      return;
    },
  },
});

export const { setNoteInRedux , updateNoteInRedux } = noteSlice.actions;
