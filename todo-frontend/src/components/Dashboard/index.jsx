import { useEffect, useState } from "react";
import TodoList from "../TodoList";
import TodoListHeader from "../TodoListHeader";
import { sortDataByDateDescending } from "../../utils/helper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { AddNewTodo } from "./utils/helper";
import Navbar from "../Navbar";
import Pagination from "../Pagination";
import AlertDialog from "../AlertDialog";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const [filterVal, setFilterVal] = useState("All");
  const [todos, setTodos] = useState([]); // fix naming
  const [loading, setLoading] = useState(true);

  const handleAddNewItem = async (newItemDescription) => {
    const { newAlert, newAlertType, newTodos } = await AddNewTodo(
      newItemDescription,
      todos,
    );
    setAlert(newAlert);
    setAlertType(newAlertType);
    if (
      newAlertType !== "error" &&
      currentPage === 1 &&
      (filterVal === "All" || filterVal === "Active")
    ) {
      const updatedTodos = newTodos.slice(0, -1); //Adding new and keeping 10 items per page check
      setTodos(updatedTodos);
    }
  };

  //Fetching Data
  useEffect(() => {
    const fetchData = async () => {
      const queryParams = {
        filterVal: filterVal,
        sort_by: "createdAt",
        limit: 10,
        page: currentPage,
      };
      const url = new URL(VITE_API_URL);
      url.search = new URLSearchParams(queryParams).toString();

      try {
        const response = await fetch(url);

        if (!response.ok) {
          let errorMessage = `Error: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (parseError) {
            const textError = await response.text();
            console.log(textError);
            errorMessage = textError || response.statusText || errorMessage;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("pages Count:", data.totalPages);
        setTodos(sortDataByDateDescending(data.todos));
        setPagesCount(data.totalPages);
      } catch (err) {
        console.error("Caught error:", err.message);
        setAlert(err.message); // This updates your UI
        setAlertType("error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filterVal, currentPage]);

  const changeTodoStatusLocally = (newTodo) => {
    const newTodos = todos.map((todo) => {
      if (newTodo._id === todo._id) {
        return newTodo;
      }
      return todo;
    });

    setTodos(sortDataByDateDescending(newTodos));
  };

  //Check Box (Completed, Uncompleted Status Change)
  const handleCheckBoxChange = async (targetId) => {
    const newTodo = todos.find((todo) => todo._id === targetId);
    console.log("new todo completed before", newTodo.completed);
    newTodo.completed = !newTodo.completed;
    console.log("new todo completed now", newTodo.completed);
    console.log("*************Handle Check is Called*************");
    changeTodoStatusLocally(newTodo);
    console.log(
      "Does todo Status Change",
      todos.filter((todo) => todo._id === targetId),
    );
    try {
      const response = await fetch(VITE_API_URL, {
        method: "PUT", // Specify the method
        headers: {
          "Content-Type": "application/json", // Indicate the content type
        },
        body: JSON.stringify(newTodo), // Convert data to JSON string
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      //changeTodoStatusLocally(targetId);
      newTodo.completed = !newTodo.completed;
      changeTodoStatusLocally(newTodo);
      setAlert(err.message); // This updates your UI
      setAlertType("error");
      console.error("There was an error!", err);
    }
    console.log("******end****Handle Check is Exiting*************");
  };

  //Delete a Todo Button Effect
  const handleDeleteButton = async (targetId) => {
    const _id = targetId.split("DelBtn").join("");
    const deletedAt = new Date().toISOString();
    const targetTodo = todos.find((todo) => todo._id === _id);
    if (targetTodo.deletedAt !== "N/A") return;
    try {
      const response = await fetch(VITE_API_URL, {
        method: "PATCH", // Specify the method
        headers: {
          "Content-Type": "application/json", // Indicate the content type
        },
        body: JSON.stringify({ _id: _id, deletedAt: deletedAt }), // Convert data to JSON string
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newTodos = todos.map((todo) => {
        if (todo._id === _id) {
          const newTodo = { ...todo };
          newTodo.deletedAt = deletedAt;
          return newTodo;
        }
        return todo;
      });
      console.log("newTodos after deletion are:", newTodos);
      setTodos(sortDataByDateDescending(newTodos));
    } catch (err) {
      setAlert(err.message); // This updates your UI
      setAlertType("error");
      console.error("There was an error!", err);
    }
  };

  //Reset Current Page to 1st Page
  const resetPage = () => {
    setCurrentPage(1);
  };

  //Update Current Page Value
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  //UseEffects
  if (loading) return <h3>Loading.......</h3>;

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
        setFilterVal={setFilterVal}
        resetPage={resetPage}
      ></Navbar>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TodoListHeader />
          </TableHead>
          <TableBody>
            {console.log(todos)}
            <TodoList
              todos={todos}
              onDelete={handleDeleteButton}
              onChange={handleCheckBoxChange}
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
