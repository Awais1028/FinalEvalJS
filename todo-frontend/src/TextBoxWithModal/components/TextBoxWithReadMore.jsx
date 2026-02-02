// TextBoxWithReadMore.jsx
import React, { useState } from "react";
import Modal from "./Modal";

const TextBoxWithReadMore = ({ text, truncateLength = 180, completed }) => {
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
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        whiteSpace: "pre-wrap",
      }}
    >
      {/* The main text display */}
      <p style={{ textDecoration: completed ? "line-through" : "none" }}>
        {truncatedText}
        {console.log(
          `testing at the readmoretextbox ${completed} <=completed `,
        )}
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
};

export default TextBoxWithReadMore;
