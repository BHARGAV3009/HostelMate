import { useState, useEffect } from "react";
import { getAllComplaints, updateComplaintStatus, deleteComplaint } from "../../api/api";
import { LuTrash2 } from "react-icons/lu";
import "./AdminPages.css";

export default function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchComplaints = () => {
    getAllComplaints().then(setComplaints).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchComplaints(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateComplaintStatus(id, status);
      setMessage({ type: "success", text: `Status updated to ${status}` });
      fetchComplaints();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this complaint?")) return;
    try {
      await deleteComplaint(id);
      setMessage({ type: "success", text: "Complaint deleted" });
      fetchComplaints();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  if (loading) return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Manage Complaints</h2>
        <p>View and resolve student complaints</p>
      </div>

      {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="data-table-container">
        <div className="table-header">
          <h3>All Complaints ({complaints.length})</h3>
        </div>
        {complaints.length === 0 ? (
          <div className="empty-state"><p>No complaints filed</p></div>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>Student</th><th>Room</th><th>Issue</th><th>Status</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c._id}>
                  <td style={{fontWeight: 600}}>{c.userId?.name || "Unknown"}</td>
                  <td>{c.roomId?.roomNumber || "N/A"}</td>
                  <td style={{maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{c.issue}</td>
                  <td>
                    <select
                      className="form-control"
                      value={c.status}
                      onChange={(e) => handleStatusChange(c._id, e.target.value)}
                      style={{padding: '6px 10px', fontSize: '0.8rem', width: 'auto', minWidth: 130}}
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c._id)}>
                      <LuTrash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
