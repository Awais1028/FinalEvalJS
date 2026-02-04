import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { formatRelativeToNow } from "../../utils/helper";
import DetailsModal from "../DetailsModal";

export default function TodoItem({
  todoItem,
  handleCheckBoxChange,
  handleDeleteButton,
}) {
  return (
    <TableRow
      key={todoItem._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell sx={{ width: "700px" }} component="th" scope="row">
        <DetailsModal
          completed={todoItem.deletedAt === "N/A" ? todoItem.completed : false}
          text={todoItem.description}
        ></DetailsModal>
      </TableCell>
      <TableCell
        align="center"
        sx={{
          width: "100px",
        }}
      >
        {formatRelativeToNow(todoItem.createdAt)}
      </TableCell>
      <TableCell align="center">
        {todoItem.deletedAt === "N/A"
          ? "Not Yet"
          : formatRelativeToNow(todoItem.deletedAt)}
      </TableCell>
      <TableCell align="center">
        <Button
          id={`${todoItem._id}CheckBoxBtn`}
          variant={
            todoItem.deletedAt === "N/A"
              ? todoItem.completed
                ? "contained"
                : "outlined"
              : "contained"
          }
          color={todoItem.completed ? "success" : "secondary"}
          onClick={() => handleCheckBoxChange(todoItem._id)}
          disabled={todoItem.deletedAt === "N/A" ? false : true}
        >
          {todoItem.deletedAt === "N/A"
            ? todoItem.completed
              ? "Completed"
              : "Push to Complete"
            : "Disabled"}
        </Button>
      </TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          color="error"
          id={`${todoItem._id}DelBtn`}
          onClick={() => handleDeleteButton(todoItem._id)}
          disabled={todoItem.deletedAt !== "N/A" ? true : false}
        >
          {todoItem.deletedAt === "N/A" ? "DELETE" : "DELETED"}
        </Button>
      </TableCell>
    </TableRow>
  );
}
