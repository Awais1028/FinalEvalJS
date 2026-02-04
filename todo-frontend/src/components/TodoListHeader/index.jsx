import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const styleHead = {
  backgroundColor: "rgb(246, 247, 251)",
  color: "rgb(120, 121, 125)",
  fontWeight: "bold",
  fontSize: "1rem",
};

export default function TodoListHeader() {
  return (
    <TableRow>
      <TableCell sx={[styleHead]} align="left">
        Title
      </TableCell>
      <TableCell sx={[styleHead, { width: "10%" }]} align="center">
        Added On
      </TableCell>
      <TableCell sx={[styleHead, { width: "10%" }]} align="center">
        Removed On
      </TableCell>
      <TableCell sx={[styleHead, { width: "10%" }]} align="center">
        Actions
      </TableCell>{" "}
    </TableRow>
  );
}
