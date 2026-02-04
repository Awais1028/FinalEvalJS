import { sortDataByDateDescending } from "../../../utils/helper";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const AddNewTodo = async (newItemDescription, previousTodoItems) => {
  if (newItemDescription === "") return;
  try {
    const response = await fetch(VITE_API_URL, {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json", // Indicate the content type
      },
      body: JSON.stringify({
        description: newItemDescription,
        completed: false,
        createdAt: new Date().toISOString(),
        deletedAt: "N/A",
        deleted: false,
      }), // Convert data to JSON string
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const promise = await response.json();
    const data = await promise;
    const newTodoItems = sortDataByDateDescending([...previousTodoItems, data]);
    return {
      newAlertType: "success",
      newAlert: "Todo has been added successfully!",
      newTodoItems: newTodoItems,
    };
  } catch (err) {
    console.error("There was an error!", err);
    return {
      newAlertType: "error",
      newAlert: err.message,
      newTodoItems: previousTodoItems,
    };
  }
};

export function hashCode(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    const code = string.charCodeAt(i);
    hash = (hash << 5) - hash + code; // hash * 31 + code
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash; // Can be positive or negative
}
