import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { formatRelativeToNow } from "../../utils/helper";
import DetailsModal from "../DetailsModal";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

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
      <TableCell sx={{ width: "700px", padding: 0 }} component="th" scope="row">
        <DetailsModal
          completed={todoItem.deletedAt === "N/A" ? todoItem.completed : false}
          text={todoItem.description}
        ></DetailsModal>
      </TableCell>
      <TableCell
        align="center"
        sx={{
          padding: 0,
          width: "100px",
          fontSize: "0.8rem",
          color: "green",
        }}
      >
        {formatRelativeToNow(todoItem.createdAt)}
      </TableCell>
      <TableCell
        align="center"
        sx={{
          padding: 0,
          fontSize: "0.8rem",
          color: "red",
        }}
      >
        {todoItem.deletedAt === "N/A"
          ? "Not Yet"
          : formatRelativeToNow(todoItem.deletedAt)}
      </TableCell>
      <TableCell
        align="center"
        sx={{
          padding: 0,
          height: 70,
        }}
      >
        {todoItem.deletedAt === "N/A" ? (
          <Button
            id={`${todoItem._id}CompletionBtn`}
            variant={todoItem.completed ? "contained" : "outlined"}
            sx={{
              padding: "4px",
              width: "120px",
              fontSize: "x-small",
              marginTop: "5px",
              marginBottom: "1px",
            }}
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
        ) : (
          ""
        )}
        <Button
          variant="contained"
          color="error"
          id={`${todoItem._id}DelBtn`}
          onClick={() => handleDeleteButton(todoItem._id)}
          sx={{
            padding: "4px",
            fontSize: "40",
            marginBottom: "5px",
            marginTop: "1px",
            width: "120px",
          }}
          disabled={todoItem.deletedAt !== "N/A" ? true : false}
        >
          <DeleteIcon
            sx={{
              margin: 0,
              p: 0,
              fontSize: 16,
            }}
          ></DeleteIcon>
        </Button>
      </TableCell>
    </TableRow>
  );
}
