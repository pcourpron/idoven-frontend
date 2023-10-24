import { createContext } from "react";

export type NotesContextType = {
  notes: Note[];
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, note: Note) => void;
};

export type Note = {
  id: string;
  timestamp: number;
  content: string;
};

export const NotesContext = createContext<NotesContextType | null>(null);
