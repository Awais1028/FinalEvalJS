import { useState } from "react";
import TodoList from "../TodoList";
import TodoListHeader from "../TodoListHeader";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Navbar from "../Navbar";
import Pagination from "../DashboardPagination";
import AlertDialog from "../AlertDialog";
import { useTodoItems } from "./hooks/useTodoItems";

export default function Dashboard() {
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("All");

  const {
    isLoading,
    todoItems,
    pagesCount,
    handleAddNewItem,
    handleTodoStatusChange,
    handleTodoDeletion,
  } = useTodoItems(filterValue, currentPage, setAlert, setAlertType);

  //Reset Current Page to 1st Page
  const resetPage = () => {
    setCurrentPage(1);
  };

  //Update Current Page Value
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  //UseEffects
  if (isLoading) return <h3>isLoading.......</h3>;

  return (
    <>
      {alert !== "" ? (
        <AlertDialog
          type={alertType}
          message={alert}
          setAlert={setAlert}
          setAlertType={setAlertType}
        ></AlertDialog>
      ) : (
        ""
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
      <Pagination
        count={pagesCount}
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
}
