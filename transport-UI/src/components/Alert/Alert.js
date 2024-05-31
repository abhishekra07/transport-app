import React, { useState, useEffect } from "react";
import "./alert.css"; // Import CSS for styling

const Alert = ({ type, message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  const handleAnimationEnd = () => {
    if (!visible) onClose();
  };

  if (!visible) return null;

  let className;
  switch (type) {
    case "success":
      className = "alert-success";
      break;
    case "failure":
      className = "alert-failure";
      break;
    default:
      className = "alert-info";
  }

  return (
    <div
      className={`alert ${className} ${!visible ? "hidden" : ""}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div style={{ position: "relative" }}>
        <span>{message}</span>
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
