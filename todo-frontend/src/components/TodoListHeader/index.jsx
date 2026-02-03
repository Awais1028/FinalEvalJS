import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
const styleHead = {
  backgroundColor: "rgb(246, 247, 251)",
  color: "rgb(120, 121, 125)",
  fontWeight: "bold",
  fontSize: "1.25rem",
};

export default function TodoListHeader() {
  return (
    <TableRow>
      <TableCell sx={[styleHead, { width: "15%" }]} align="center">
        Check
      </TableCell>
      <TableCell sx={[styleHead, { width: "40%" }]} align="center">
        Title
      </TableCell>
      <TableCell sx={[styleHead, { width: "15%" }]} align="center">
        Added On
      </TableCell>
      <TableCell sx={[styleHead, { width: "15%" }]} align="center">
        Removed On
      </TableCell>
      <TableCell sx={[styleHead, { width: "15%" }]} align="center">
        Delete
      </TableCell>
    </TableRow>
  );
}
