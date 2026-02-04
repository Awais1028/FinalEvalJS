import TodoItem from "../TodoItem";

export default function TodoList({ todoItems, onDelete, onChange }) {
  return todoItems.map((todoItem) => {
    return (
      <TodoItem
        key={todoItem._id}
        todoItem={todoItem}
        handleCheckBoxChange={onChange}
        handleDeleteButton={onDelete}
      ></TodoItem>
    );
  });
}

// id={todoItem._id}
// description={todoItem.description}
// createdAt={todoItem.createdAt}
// deletedAt={todoItem.deletedAt}
// completed={todoItem.completed}
