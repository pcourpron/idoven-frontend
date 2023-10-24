import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "../../components";
import { useNotesContext } from "../../context";

export const Notes = () => {
  const { notes } = useNotesContext();

  if (notes.length === 0)
    return <Typography> Come back when you've added some notes!</Typography>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Time</TableCell>
          <TableCell>Note</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {notes.map(({ timestamp, content, id }) => (
          <TableRow key={id}>
            <TableCell>{timestamp}</TableCell>
            <TableCell>{content}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
