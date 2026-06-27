import { useState, useEffect } from "react";
import { getAdminStats } from "../../api/api";
import { LuUsers, LuDoorOpen, LuTrendingUp, LuTriangleAlert } from "react-icons/lu";
import "./AdminPages.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Admin Dashboard</h2>
        <p>Overview of your hostel operations</p>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat-card blue">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <div>
              <div className="admin-stat-label">Total Students</div>
              <div className="admin-stat-value">{stats?.totalStudents || 0}</div>
            </div>
            <div className="stat-icon blue"><LuUsers size={22} /></div>
          </div>
        </div>

        <div className="admin-stat-card green">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <div>
              <div className="admin-stat-label">Total Rooms</div>
              <div className="admin-stat-value">{stats?.totalRooms || 0}</div>
            </div>
            <div className="stat-icon green"><LuDoorOpen size={22} /></div>
          </div>
          <div style={{fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 6}}>
            {stats?.availableRooms || 0} available · {stats?.occupiedRooms || 0} full
          </div>
        </div>

        <div className="admin-stat-card orange">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <div>
              <div className="admin-stat-label">Revenue</div>
              <div className="admin-stat-value">₹{(stats?.totalRevenue || 0).toLocaleString()}</div>
            </div>
            <div className="stat-icon orange"><LuTrendingUp size={22} /></div>
          </div>
          <div style={{fontSize: '0.78rem', color: 'var(--warning)', marginTop: 6}}>
            ₹{(stats?.pendingAmount || 0).toLocaleString()} pending
          </div>
        </div>

        <div className="admin-stat-card yellow">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <div>
              <div className="admin-stat-label">Pending Complaints</div>
              <div className="admin-stat-value">{stats?.pendingComplaints || 0}</div>
            </div>
            <div className="stat-icon yellow"><LuTriangleAlert size={22} /></div>
          </div>
          <div style={{fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 6}}>
            {stats?.inProgressComplaints || 0} in progress · {stats?.resolvedComplaints || 0} resolved
          </div>
        </div>
      </div>

      <div className="activity-grid">
        <div className="activity-card">
          <div className="activity-card-header">Recent Complaints</div>
          {stats?.recentComplaints?.length === 0 ? (
            <div className="activity-item"><span className="detail">No complaints</span></div>
          ) : (
            stats?.recentComplaints?.map((c) => (
              <div key={c._id} className="activity-item">
                <div>
                  <span className="name">{c.userId?.name || "Unknown"}</span>
                  <div className="detail">{c.issue?.slice(0, 40)}...</div>
                </div>
                <span className={`badge ${c.status}`}>{c.status?.replace("_", " ")}</span>
              </div>
            ))
          )}
        </div>

        <div className="activity-card">
          <div className="activity-card-header">Recent Payments</div>
          {stats?.recentPayments?.length === 0 ? (
            <div className="activity-item"><span className="detail">No payments</span></div>
          ) : (
            stats?.recentPayments?.map((p) => (
              <div key={p._id} className="activity-item">
                <div>
                  <span className="name">{p.userId?.name || "Unknown"}</span>
                  <div className="detail">{p.month} — ₹{p.amount}</div>
                </div>
                <span className={`badge ${p.status}`}>{p.status}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
