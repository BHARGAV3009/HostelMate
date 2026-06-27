import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMyRoom, getMyComplaints, getMyPayments, getStudentNotices } from "../../api/api";
import { LuDoorOpen, LuMessageSquare, LuCreditCard, LuBell, LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "./StudentPages.css";

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      getMyRoom(),
      getMyComplaints(),
      getMyPayments(),
      getStudentNotices(),
    ]).then(([r, c, p, n]) => {
      if (r.status === "fulfilled") setRoom(r.value);
      if (c.status === "fulfilled") setComplaints(c.value);
      if (p.status === "fulfilled") setPayments(p.value);
      if (n.status === "fulfilled") setNotices(n.value);
      setLoading(false);
    });
  }, []);

  const pendingPayments = payments.filter(p => p.status === "pending");
  const pendingComplaints = complaints.filter(c => c.status === "pending");
  const recentNotices = notices.slice(0, 3);

  if (loading) {
    return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Welcome back, {user?.name || "Student"} 👋</h2>
        <p>Here's your hostel overview</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card" onClick={() => navigate("/my-room")} style={{cursor: "pointer"}}>
          <div className="stat-icon blue">
            <LuDoorOpen size={24} />
          </div>
          <div className="stat-info">
            <h4>My Room</h4>
            <div className="stat-value">{room?.roomNumber || "N/A"}</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate("/fees")} style={{cursor: "pointer"}}>
          <div className="stat-icon orange">
            <LuCreditCard size={24} />
          </div>
          <div className="stat-info">
            <h4>Pending Fees</h4>
            <div className="stat-value">{pendingPayments.length}</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate("/complaints")} style={{cursor: "pointer"}}>
          <div className="stat-icon yellow">
            <LuMessageSquare size={24} />
          </div>
          <div className="stat-info">
            <h4>Open Complaints</h4>
            <div className="stat-value">{pendingComplaints.length}</div>
          </div>
        </div>

        <div className="stat-card" onClick={() => navigate("/notices")} style={{cursor: "pointer"}}>
          <div className="stat-icon green">
            <LuBell size={24} />
          </div>
          <div className="stat-info">
            <h4>Notices</h4>
            <div className="stat-value">{notices.length}</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {}
        <div className="card dash-card">
          <div className="dash-card-header">
            <h3>Recent Notices</h3>
            <button className="btn btn-sm btn-secondary" onClick={() => navigate("/notices")}>
              View All <LuArrowRight size={14} />
            </button>
          </div>
          {recentNotices.length === 0 ? (
            <p className="text-muted">No notices yet</p>
          ) : (
            <div className="dash-list">
              {recentNotices.map((n) => (
                <div key={n._id} className="dash-list-item">
                  <div>
                    <strong>{n.title}</strong>
                    <p>{n.message?.slice(0, 80)}...</p>
                  </div>
                  <span className={`badge ${n.status?.replace(" ", "_")}`}>{n.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {}
        <div className="card dash-card">
          <div className="dash-card-header">
            <h3>My Complaints</h3>
            <button className="btn btn-sm btn-secondary" onClick={() => navigate("/complaints")}>
              View All <LuArrowRight size={14} />
            </button>
          </div>
          {complaints.length === 0 ? (
            <p className="text-muted">No complaints filed</p>
          ) : (
            <div className="dash-list">
              {complaints.slice(0, 3).map((c) => (
                <div key={c._id} className="dash-list-item">
                  <div>
                    <strong>{c.issue?.slice(0, 50)}</strong>
                    <p>Room: {c.roomId?.roomNumber || "N/A"}</p>
                  </div>
                  <span className={`badge ${c.status}`}>{c.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
