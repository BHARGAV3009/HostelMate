import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  BiHomeAlt2,
} from "react-icons/bi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { LuMessageSquare, LuBell, LuUsers, LuLogOut, LuUtensilsCrossed, LuDoorOpen, LuCreditCard, LuLayoutDashboard } from "react-icons/lu";
import { Building2 } from "lucide-react";
import "./StudentLayout.css";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { to: "/admin", icon: LuLayoutDashboard, label: "Dashboard" },
    { to: "/admin/students", icon: LuUsers, label: "Students" },
    { to: "/admin/rooms", icon: LuDoorOpen, label: "Rooms" },
    { to: "/admin/allocations", icon: BiHomeAlt2, label: "Allocations" },
    { to: "/admin/complaints", icon: LuMessageSquare, label: "Complaints" },
    { to: "/admin/payments", icon: LuCreditCard, label: "Payments" },
    { to: "/admin/notices", icon: LuBell, label: "Notices" },
    { to: "/admin/food-menu", icon: LuUtensilsCrossed, label: "Food Menu" },
  ];

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Building2 size={22} />
          </div>
          <span className="brand-text">HostelMate</span>
          <span style={{fontSize: '0.6rem', background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: 12, fontWeight: 700, marginLeft: 4}}>ADMIN</span>
        </div>

        <nav className="sidebar-nav">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin"}
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
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name || "Admin"}</span>
              <span className="user-role">Administrator</span>
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
