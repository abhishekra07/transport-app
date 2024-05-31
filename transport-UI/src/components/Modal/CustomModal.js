import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@chakra-ui/icons";
import "./modal.css";

const CustomModal = ({ isOpen, onClose, selectedRow, ModalContent }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <CloseIcon
          className="close-button"
          onClick={onClose}
          width="0.9rem"
          height="0.9rem"
        />
        <ModalContent selectedRow={selectedRow} />
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default CustomModal;
