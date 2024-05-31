import React from "react";
import ReactDOM from "react-dom";
import "./confirmationModal.css";

const ConfirmationModal = ({ isOpen, onConfirm, onDecline }) => {
  if (!isOpen) return null;

  const modalClassName = isOpen
    ? "confirm-modal-overlay"
    : "confirm-modal-overlay close";
  const contentClassName = isOpen
    ? "confirm-modal-content"
    : "confirm-modal-content close";

  return ReactDOM.createPortal(
    <div className={modalClassName}>
      <div className={contentClassName}>
        <div className="confirm-modal-header">
          <span className="">Are you sure?</span>
          <p>Do you really want to delete this item?</p>
        </div>
        <div className="confirm-modal-footer">
          <button className="btn cancel-button" onClick={onDecline}>
            Cancel
          </button>
          <button className="btn confirm-button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ConfirmationModal;
