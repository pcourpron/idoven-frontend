import { v4 } from "uuid";
import { Box, Modal, Button, Input } from "../../../../components";
import { secondsToHMS } from "../../../../utils";
import { useState } from "react";
import { Note } from "../../../../context/NotesContext/NotesContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
} as const;

export const AddNoteModal = ({
  timestamp,
  onClose,
  onSubmit,
}: {
  timestamp: number;
  onClose(): void;
  onSubmit(note: Note): void;
}) => {
  const [message, setMessage] = useState<string>("");

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={style}>
        Add your note here for timestamp {secondsToHMS(timestamp)}:
        <Box>
          <Input
            data-testid="add-note-input"
            placeholder="Add your note here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && message) {
                onSubmit({
                  id: v4(),
                  timestamp,
                  content: message,
                });
                onClose();
              }
            }}
          />
        </Box>
        <Button
          disabled={message.length === 0}
          onClick={() => {
            onSubmit({
              id: v4(),
              timestamp,
              content: message,
            });
            onClose();
          }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};
