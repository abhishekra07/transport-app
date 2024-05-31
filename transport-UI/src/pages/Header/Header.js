import React from "react";
import "./header.css"; // Import your CSS file for styling
import { useTheme } from "../../context/ThemeContext";
import profileImg from "../../assets/profile.jpg";
import ThemeToggleButton from "../../components/Button/ThemeToggleButton";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="nav-container">
      <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
      <div className="user-profile">
        <img src={profileImg} alt="User Profile" />
      </div>
      <button className="logout-button">Logout</button>
    </div>
  );
}

export default Header;
