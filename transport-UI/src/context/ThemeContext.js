import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [sidebarTextColor, setSidebarTextColor] = useState("#333"); // Default color

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const changeSidebarTextColor = (color) => {
    setSidebarTextColor(color);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, sidebarTextColor, changeSidebarTextColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
