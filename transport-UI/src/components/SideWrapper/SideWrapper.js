import React, { useState } from "react";
import { SettingsIcon } from "@chakra-ui/icons";
import "./sidewrapper.css";
import { useTheme } from "../../context/ThemeContext";

function SideWrapper() {
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === "light";

  const [isOpenWrapper, setIsOpenWrapper] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    toggleTheme();
  };

  const sidenavColors = ["#2075e5", "#2dce89", "#11cdef", "#f5365c", "#f56036"];

  const toggleWrapper = () => {
    setIsOpenWrapper(!isOpenWrapper);
  };
  return (
    <>
      <div
        className={
          isOpenWrapper
            ? "side-wrapper-container open"
            : "side-wrapper-container"
        }
      >
        <button id="closeBtn" onClick={toggleWrapper}>
          &times;
        </button>
        <div className="wrapper-header">
          <span className="wrapper-header-h3 font">Abhishek dashboard</span>
          <span className="wrapper-header-p font">
            See our dashboard options.
          </span>
        </div>
        <hr />
        <div className="wrapper-sidenav-color">
          <span className="wrapper-sidenav-color-h6 font">Sidenav Colors</span>
          <div className="sidenav-color-btns">
            {sidenavColors.map((color) => {
              return <button style={{ backgroundColor: color }}></button>;
            })}
          </div>
        </div>
        <hr />
        <div className="wrapper-sidenav-type">
          <span className="wrapper-sidenav-color-h6 font">Sidenav Type</span>
          <span className="wrapper-sidenav-type-p">
            Choose between 2 different sidenav types.
          </span>
          <div className="sidenav-wrapper-btn">
            <button
              className={isLight ? "btn active" : "btn"}
              onClick={handleClick}
            >
              White
            </button>
            <button
              className={!isLight ? "btn active" : "btn"}
              onClick={handleClick}
            >
              Black
            </button>
          </div>
        </div>
      </div>
      <div className="setting-icon-container">
        <span className="setting-icon" onClick={toggleWrapper}>
          <SettingsIcon style={{ width: "2.5rem", height: "2.5rem" }} />
        </span>
      </div>
    </>
  );
}

export default SideWrapper;
