import "./TodoList.jsx";
export default function () {
  return (
    <div className="flex-container">
      <h3
        className="flex-item-larger"
        style={{
          textAlign: "center",
          background: "grey",
          borderRadius: "2rem",
          margin: "10px",
        }}
      >
        All
      </h3>
      <h3
        className="flex-item-larger"
        style={{
          textAlign: "center",
          background: "grey",
          borderRadius: "2rem",
          margin: "10px",
        }}
      >
        Active
      </h3>
      <h3
        className="flex-item-larger"
        style={{
          textAlign: "center",
          background: "grey",
          borderRadius: "2rem",
          margin: "10px",
        }}
      >
        Deleted
      </h3>
    </div>
  );
}
