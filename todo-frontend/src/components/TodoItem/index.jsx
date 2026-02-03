import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { formatRelativeToNow } from "../../utils/helper";
import DetailsModal from "../DetailsModal";

export default function TodoItem({
  id,
  description,
  createdAt,
  deletedAt,
  completed,
  handleCheckBoxChange,
  handleDeleteButton,
}) {
  return (
    <TableRow
      key={id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="center">
        <Button
          id={`${id}CheckBoxBtn`}
          variant={
            deletedAt === "N/A"
              ? completed
                ? "contained"
                : "outlined"
              : "contained"
          }
          color={completed ? "success" : "secondary"}
          onClick={() => handleCheckBoxChange(id)}
          disabled={deletedAt === "N/A" ? false : true}
        >
          {deletedAt === "N/A"
            ? completed
              ? "Completed"
              : "Push to Complete"
            : "Disabled"}
        </Button>
      </TableCell>

      <TableCell sx={{ width: "700px" }} component="th" scope="row">
        <DetailsModal
          completed={deletedAt === "N/A" ? completed : false}
          text={description}
        ></DetailsModal>
      </TableCell>
      <TableCell
        align="center"
        sx={{
          width: "100px",
        }}
      >
        {formatRelativeToNow(createdAt)}
      </TableCell>
      <TableCell align="center">
        {deletedAt === "N/A" ? "Not Yet" : formatRelativeToNow(deletedAt)}
      </TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          color="error"
          id={`${id}DelBtn`}
          onClick={() => handleDeleteButton(id)}
          disabled={deletedAt !== "N/A" ? true : false}
        >
          {deletedAt === "N/A" ? "DELETE" : "DELETED"}
        </Button>
      </TableCell>
    </TableRow>
  );
}
