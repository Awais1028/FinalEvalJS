import { sortDataByDateDescending } from "../../utils/helper";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const AddNewTodo = async (newItemDescription, prevTodos) => {
  if (newItemDescription === "") return;
  console.log("Add Click is working!  ");
  try {
    console.log("trying to get");
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

    console.log("success1");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const promise = await response.json();
    const data = await promise;
    console.log("Data from Post Api Call:", data);
    const newTodos = sortDataByDateDescending([...prevTodos, data]);
    return { newError: "", newTodos: newTodos };
  } catch (err) {
    console.error("There was an error!", err);
    return { newError: err.message, newTodos: prevTodos };
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
