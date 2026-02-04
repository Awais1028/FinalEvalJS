import { useEffect, useState } from "react";
import { AddNewTodo } from "../utils/helper";
import { sortDataByDateDescending } from "../../../utils/helper";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export function useTodoItems(filterValue, currentPage, setAlert, setAlertType) {
  const [pagesCount, setPagesCount] = useState(0);
  const [todoItems, setTodoItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = async () => {
    const queryParams = {
      filterValue: filterValue,
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
          errorMessage = textError || response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Todo Items of Filter: ", filterValue, " are:", data);

      setTodoItems(sortDataByDateDescending(data.todoItems));
      setPagesCount(data.totalPages);
    } catch (err) {
      console.error("Caught error:", err.message);
      setAlert(err.message); // This updates your UI
      setAlertType("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filterValue, currentPage]);

  const handleAddNewItem = async (newItemDescription) => {
    const { newAlert, newAlertType, newTodoItems } = await AddNewTodo(
      newItemDescription,
      todoItems,
    );
    setAlert(newAlert);
    setAlertType(newAlertType);
    if (
      newAlertType !== "error" &&
      currentPage === 1 &&
      (filterValue === "All" || filterValue === "Active")
    ) {
      const updatedTodoItems = newTodoItems.slice(0, -1); //Adding new and keeping 10 items per page check
      setTodoItems(updatedTodoItems);
    }
  };

  const updateTodoStatusLocally = (newTodoItem) => {
    const newTodoItems = todoItems.map((todoItem) => {
      if (todoItem._id === newTodoItem._id) {
        return newTodoItem;
      }
      return todoItem;
    });

    setTodoItems(sortDataByDateDescending(newTodoItems));
  };

  const handleTodoStatusChange = async (targetId) => {
    const newTodoItem = todoItems.find((todoItem) => todoItem._id === targetId);
    newTodoItem.completed = !newTodoItem.completed;
    updateTodoStatusLocally(newTodoItem);
    try {
      const response = await fetch(VITE_API_URL, {
        method: "PUT", // Specify the method
        headers: {
          "Content-Type": "application/json", // Indicate the content type
        },
        body: JSON.stringify(newTodoItem), // Convert data to JSON string
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      //updateTodoStatusLocally(targetId);
      newTodoItem.completed = !newTodoItem.completed;
      updateTodoStatusLocally(newTodoItem);
      setAlert(err.message); // This updates your UI
      setAlertType("error");
    }
  };
  const handleTodoDeletion = async (targetId) => {
    const _id = targetId.split("DelBtn").join("");
    const deletedAt = new Date().toISOString();
    const targetTodo = todoItems.find((todoItem) => todoItem._id === _id);
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
      const newTodoItems = todoItems.map((todoItem) => {
        if (todoItem._id === _id) {
          const newTodoItem = { ...todoItem };
          newTodoItem.deletedAt = deletedAt;
          return newTodoItem;
        }
        return todoItem;
      });
      setTodoItems(sortDataByDateDescending(newTodoItems));
    } catch (err) {
      setAlert(err.message); // This updates your UI
      setAlertType("error");
    }
  };

  return {
    isLoading,
    todoItems,
    pagesCount,
    handleAddNewItem,
    handleTodoStatusChange,
    handleTodoDeletion,
    setAlert,
    setAlertType,
  };
}
