import TodoItem from "../TodoItem";

export default function TodoList({ todos, onDelete, onChange }) {
  return todos.map((todo) => {
    return (
      <TodoItem
        key={todo._id}
        id={todo._id}
        description={todo.description}
        createdAt={todo.createdAt}
        deletedAt={todo.deletedAt}
        completed={todo.completed}
        handleCheckBoxChange={onChange}
        handleDeleteButton={onDelete}
      ></TodoItem>
    );
  });
}
