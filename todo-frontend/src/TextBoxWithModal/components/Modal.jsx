// Modal.jsx
import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          maxWidth: "500px",
          width: "100%",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          &times;
        </button>
        {title && <h2>{title}</h2>}
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
