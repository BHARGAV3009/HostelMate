import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import { MdAccountBalanceWallet } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { LuUsers } from "react-icons/lu";
import { LuMessageSquare } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";

import "./SideBar.css";
import { useState } from "react";
import { Building2 } from "lucide-react";

function SideBar() {
  const [isLoggedin, setLoggedin] = useState(true);
  const navigate = useNavigate();
  return (
    <div className="sideBar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">
          <Building2 />
          HOSTEL MANAGEMENT
        </h1>
      </div>
      <nav className="menu">
        <NavLink
          className={({ isActive }) =>
            isActive ? "menuItem active" : "menuItem"
          }
          to="/home"
        >
          <BiHomeAlt2 className="menu-icon" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "menuItem active" : "menuItem"
          }
          to="/notices"
        >
          <LuUsers className="menu-icon" />
          <span>Notices</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "menuItem active" : "menuItem"
          }
          to="/fees"
        >
          <MdAccountBalanceWallet className="menu-icon" />
          <span>Payments</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "menuItem active" : "menuItem"
          }
          to="/raiseComplaint"
        >
          <LuMessageSquare className="menu-icon" />
          <span>Raise Complaint</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "menuItem active" : "menuItem"
          }
          to="/account"
        >
          <VscAccount className="menu-icon" />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "menuItem active" : "menuItem"
          }
          to="/help"
        >
          <LuSettings className="menu-icon" />
          <span>Help</span>
        </NavLink>
      </nav>

      {isLoggedin ? (
        <button
          id="logout-button"
          onClick={() => navigate("/login") && setLoggedin(false)}
        >
          Logout
        </button>
      ) : (
        <button
          id="login-button"
          onClick={() => navigate("/home") && setLoggedin(true)}
        >
          Login
        </button>
      )}
    </div>
  );
}

export default SideBar;
