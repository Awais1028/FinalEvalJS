// TextBoxWithReadMore.jsx
import React, { useState } from "react";
import Modal from "./components/Modal";

export default function DetailsModal({
  text,
  truncateLength = 180,
  completed,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTruncated = text.length > truncateLength;
  const truncatedText = isTruncated
    ? `${text.substring(0, truncateLength)}...`
    : text;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      style={{
        padding: "10px",
        margin: "10px",
        paddingTop: "1px",
        paddingBottom: "1px",
        marginTop: "1px",
        marginBottom: "1px",
        whiteSpace: "pre-wrap",
        fontSize: "0.8rem",
      }}
    >
      {/* The main text display */}
      <p
        style={{
          textDecoration: completed ? "line-through" : "none",
          marginTop: "1px",
          marginBottom: "1px",
          height: "50px",
          alignContent: "center",
        }}
      >
        {truncatedText}

        {isTruncated && (
          <button
            onClick={openModal}
            style={{
              marginLeft: "5px",
              color: "blue",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              textDecoration: "underline",
            }}
          >
            Read more
          </button>
        )}
      </p>

      {/* The Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Full Content">
        <p>{text}</p>
      </Modal>
    </div>
  );
}
