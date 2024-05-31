import React from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

function ThemeToggleButton({ theme, toggleTheme }) {
  const isLight = theme === "light";

  return (
    <div className="theme-icon">
      {isLight ? (
        <MoonIcon
          style={{ cursor: "pointer", width: "2rem", height: "2rem" }}
          onClick={toggleTheme}
        />
      ) : (
        <SunIcon
          style={{ cursor: "pointer", width: "2rem", height: "2rem" }}
          onClick={toggleTheme}
        />
      )}
    </div>
  );
}

export default ThemeToggleButton;
