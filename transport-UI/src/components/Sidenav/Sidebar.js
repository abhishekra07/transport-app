import React, { useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import "./sidebar.css"; // Import CSS file for styling
import { useTheme } from "../../context/ThemeContext";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Sidebar = () => {
  // State to track which submenu is open
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(true);

  const [openSubMenu1, setOpenSubMenu1] = useState(false); // Separate state for submenu 1
  const [openSubMenu2, setOpenSubMenu2] = useState(false); // Separate state for submenu 2

  const [sidebarWidth, setSidebarWidth] = useState(260);

  const { theme } = useTheme();

  const sidebarClassName = isOpenSideMenu ? "sidebar" : "sidebar hide-sidebar";

  // Function to toggle submenu
  const toggleSubMenu1 = (menuIndex) => {
    setOpenSubMenu1(openSubMenu1 === menuIndex ? null : menuIndex);
  };

  const toggleSubMenu2 = (menuIndex) => {
    setOpenSubMenu2(openSubMenu2 === menuIndex ? null : menuIndex);
  };

  const toggleSideMenu = () => {
    if (sidebarWidth === 0) setSidebarWidth(260);
    else setSidebarWidth(0);
    setIsOpenSideMenu(!isOpenSideMenu);
  };

  return (
    <div className="sidebar-container">
      <div
        className={sidebarClassName}
        data-theme={theme}
        style={{ width: `${sidebarWidth}px` }}
      >
        <div className="logo-section">
          <span className="logo">LogiTrack</span>
          <img src={Logo} alt="" />
        </div>
        <div className="menu">
          <NavLink exact to="/" activeClassName="active">
            <div className="menu-item">Home</div>
          </NavLink>
          <div className="menu-item" onClick={() => toggleSubMenu1(1)}>
            Reports/रिपोर्ट
            {openSubMenu1 === 1 ? (
              <span className="arrow">▲</span>
            ) : (
              <span className="arrow">▼</span>
            )}
          </div>
          {openSubMenu1 === 1 && (
            <div className="submenu">
              <div className="submenu-item">Current Stock</div>
              <div className="submenu-item">Challan</div>
              <div className="submenu-item">Salary</div>
              <div className="submenu-item">Truck Expense</div>
              <div className="submenu-item">Truck Earning</div>
              <div className="submenu-item">Bills</div>
            </div>
          )}
          <NavLink exact to="/arrival-form" activeClassName="active">
            <div className="menu-item">Arrival/पहुचना</div>
          </NavLink>
          <NavLink exact to="/dispatch-form" activeClassName="active">
            <div className="menu-item">Dispatch Form</div>
          </NavLink>

          <div className="menu-item" onClick={() => toggleSubMenu2(1)}>
            Admin
            {openSubMenu2 === 1 ? (
              <span className="arrow">▲</span>
            ) : (
              <span className="arrow">▼</span>
            )}
          </div>
          {openSubMenu2 === 1 && (
            <div className="submenu">
              <NavLink exact to="/employee" activeClassName="active">
                <div className="submenu-item">Employee</div>
              </NavLink>
              <NavLink exact to="/fleet" activeClassName="active">
                <div className="submenu-item">Fleet</div>
              </NavLink>
              <NavLink exact to="/product" activeClassName="active">
                <div className="submenu-item">Product</div>
              </NavLink>
              <NavLink exact to="/party" activeClassName="active">
                <div className="submenu-item">Party</div>
              </NavLink>
            </div>
          )}

          <div className="menu-item">TRUCK EXPENSES</div>
          <div className="menu-item">HR(Salaries And wages)</div>
          <div className="menu-item">Payments</div>
        </div>
      </div>
      <div className="hamburger" style={{ marginLeft: `${sidebarWidth}px` }}>
        <HamburgerIcon
          style={{ width: "3rem", height: "3rem" }}
          onClick={toggleSideMenu}
        />
      </div>
    </div>
  );
};

export default Sidebar;
