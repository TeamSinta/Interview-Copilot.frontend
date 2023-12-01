import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  comment: string;
  timestamp: string;
  timeDelta: string;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
  },
});

export const { addNote } = notesSlice.actions;

export default notesSlice.reducer;
