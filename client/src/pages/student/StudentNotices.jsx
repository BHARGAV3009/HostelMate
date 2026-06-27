import { useState, useEffect } from "react";
import { getStudentNotices } from "../../api/api";
import { LuBell } from "react-icons/lu";
import "./StudentPages.css";

export default function StudentNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentNotices()
      .then(setNotices)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Notices & Announcements</h2>
        <p>Stay updated with hostel announcements</p>
      </div>

      {notices.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <LuBell size={64} />
            <p>No notices available at the moment</p>
          </div>
        </div>
      ) : (
        <div className="notices-grid">
          {notices.map((n) => (
            <div key={n._id} className="notice-card">
              <div className="notice-card-header">
                <h4>{n.title}</h4>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                  <span className={`badge ${n.status?.replace(" ", "_")}`}>{n.status}</span>
                  <span className="notice-date">{new Date(n.date).toLocaleDateString()}</span>
                </div>
              </div>
              <p>{n.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
