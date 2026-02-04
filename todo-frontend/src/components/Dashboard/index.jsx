import { useState } from "react";
import TodoList from "../TodoList";
import TodoListHeader from "../TodoListHeader";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Navbar from "../Navbar";
import DashboardPagination from "../DashboardPagination";
import AlertDialog from "../AlertDialog";
import { useTodoItems } from "./hooks/useTodoItems";
import { useDashboardPagination } from "./hooks/useDashboardPagination";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export default function Dashboard() {
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("");
  const [filterValue, setFilterValue] = useState("All");

  const { currentPage, handlePageChange, resetPage } = useDashboardPagination();

  const {
    isLoading,
    todoItems,
    pagesCount,
    handleAddNewItem,
    handleTodoStatusChange,
    handleTodoDeletion,
  } = useTodoItems(filterValue, currentPage, setAlert, setAlertType);

  if (isLoading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );

  return (
    <>
      {alert && (
        <AlertDialog
          type={alertType}
          message={alert}
          setAlert={setAlert}
          setAlertType={setAlertType}
        ></AlertDialog>
      )}

      <Navbar
        handleAddNewItem={handleAddNewItem}
        setFilterValue={setFilterValue}
        resetPage={resetPage}
      ></Navbar>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TodoListHeader />
          </TableHead>
          <TableBody>
            <TodoList
              todoItems={todoItems}
              onDelete={handleTodoDeletion}
              onChange={handleTodoStatusChange}
            />
          </TableBody>
        </Table>
      </TableContainer>
      <DashboardPagination
        count={pagesCount}
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
}
