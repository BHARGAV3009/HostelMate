import { useState, useEffect } from "react";
import { createStudentComplaint, getMyComplaints } from "../../api/api";
import { LuSend } from "react-icons/lu";
import "./StudentPages.css";

export default function StudentComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [issue, setIssue] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchComplaints = () => {
    getMyComplaints()
      .then(setComplaints)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchComplaints(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issue.trim()) return;
    setSubmitting(true);
    setMessage({ type: "", text: "" });
    try {
      await createStudentComplaint(issue.trim());
      setIssue("");
      setMessage({ type: "success", text: "Complaint submitted successfully!" });
      fetchComplaints();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Complaints</h2>
        <p>Raise a new complaint or track existing ones</p>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <div className="card complaint-form-card" style={{padding: 22}}>
        <h3 style={{marginBottom: 14, fontSize: '1rem'}}>Raise New Complaint</h3>
        <form onSubmit={handleSubmit}>
          <div className="complaint-input-row">
            <textarea
              className="form-control"
              placeholder="Describe your issue in detail..."
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              required
              disabled={submitting}
              style={{minHeight: 80}}
            />
            <button className="btn btn-primary" type="submit" disabled={submitting || !issue.trim()} style={{alignSelf: 'flex-end'}}>
              <LuSend size={16} />
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      <div className="data-table-container">
        <div className="table-header">
          <h3>My Complaints ({complaints.length})</h3>
        </div>
        {complaints.length === 0 ? (
          <div className="empty-state">
            <p>No complaints filed yet</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Issue</th>
                <th>Room</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c._id}>
                  <td>{c.issue}</td>
                  <td>{c.roomId?.roomNumber || "N/A"}</td>
                  <td><span className={`badge ${c.status}`}>{c.status?.replace("_", " ")}</span></td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
