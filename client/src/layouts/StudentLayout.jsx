import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  BiHomeAlt2,
} from "react-icons/bi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { LuMessageSquare, LuBell, LuUser, LuLogOut, LuUtensilsCrossed, LuDoorOpen, LuCircleHelp } from "react-icons/lu";
import { Building2 } from "lucide-react";
import "./StudentLayout.css";

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { to: "/home", icon: BiHomeAlt2, label: "Dashboard" },
    { to: "/my-room", icon: LuDoorOpen, label: "My Room" },
    { to: "/notices", icon: LuBell, label: "Notices" },
    { to: "/fees", icon: MdAccountBalanceWallet, label: "Payments" },
    { to: "/complaints", icon: LuMessageSquare, label: "Complaints" },
    { to: "/food-menu", icon: LuUtensilsCrossed, label: "Food Menu" },
    { to: "/account", icon: LuUser, label: "My Profile" },
    { to: "/help", icon: LuCircleHelp, label: "Help & FAQ" },
  ];

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Building2 size={22} />
          </div>
          <span className="brand-text">HostelMate</span>
        </div>

        <nav className="sidebar-nav">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name || "Student"}</span>
              <span className="user-role">Student</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LuLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
