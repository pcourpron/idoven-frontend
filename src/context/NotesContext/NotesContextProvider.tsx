import { FC, ReactNode, useEffect, useState } from "react";
import { Note, NotesContext } from "./NotesContext";
import { useFileUploadsContext } from "../hooks/useFileUploadsContext";

export const NotesContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { currentFile } = useFileUploadsContext();
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (note: Note) => {
    setNotes([...notes, note]);
  };

  const removeNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const updateNote = (id: string, note: Note) => {
    setNotes(notes.map((n) => (n.id === id ? note : n)));
  };

  useEffect(() => {
    setNotes([]);
  }, [currentFile]);

  return (
    <NotesContext.Provider value={{ notes, addNote, removeNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
};
