import { useState, useEffect } from "react";
import { getAllAllocations, assignRoom, deallocateRoom, getStudents, getRooms } from "../../api/api";
import { LuPlus, LuX, LuDoorClosed } from "react-icons/lu";
import "./AdminPages.css";

export default function ManageAllocations() {
  const [allocations, setAllocations] = useState([]);
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ userId: "", roomId: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchData = () => {
    Promise.all([getAllAllocations(), getStudents(), getRooms()])
      .then(([a, s, r]) => { setAllocations(a); setStudents(s); setRooms(r); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await assignRoom(form.userId, form.roomId);
      setShowModal(false);
      setForm({ userId: "", roomId: "" });
      setMessage({ type: "success", text: "Room assigned successfully!" });
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleVacate = async (id) => {
    if (!confirm("Vacate this allocation?")) return;
    try {
      await deallocateRoom(id);
      setMessage({ type: "success", text: "Room vacated" });
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const availableRooms = rooms.filter(r => r.status === "available");

  if (loading) return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Room Allocations</h2>
        <p>Assign rooms to students and manage allocations</p>
      </div>

      {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="data-table-container">
        <div className="table-header">
          <h3>Allocations ({allocations.length})</h3>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            <LuPlus size={16} /> Assign Room
          </button>
        </div>
        {allocations.length === 0 ? (
          <div className="empty-state"><p>No allocations yet</p></div>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>Student</th><th>Room</th><th>Allocated On</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {allocations.map((a) => (
                <tr key={a._id}>
                  <td style={{fontWeight: 600}}>{a.userId?.name || "Unknown"}</td>
                  <td>{a.roomId?.roomNumber || "N/A"}</td>
                  <td>{new Date(a.allocatedDate).toLocaleDateString()}</td>
                  <td><span className={`badge ${a.status}`}>{a.status}</span></td>
                  <td>
                    {a.status === "Allocated" && (
                      <button className="btn btn-sm btn-danger" onClick={() => handleVacate(a._id)}>
                        <LuDoorClosed size={14} /> Vacate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
              <h3 style={{margin:0}}>Assign Room to Student</h3>
              <button className="btn btn-sm btn-secondary" onClick={() => setShowModal(false)}><LuX size={16}/></button>
            </div>
            <form onSubmit={handleAssign}>
              <div className="form-group">
                <label>Select Student *</label>
                <select className="form-control" required value={form.userId} onChange={(e) => setForm({...form, userId: e.target.value})}>
                  <option value="">-- Select Student --</option>
                  {students.map((s) => (
                    <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Select Room *</label>
                <select className="form-control" required value={form.roomId} onChange={(e) => setForm({...form, roomId: e.target.value})}>
                  <option value="">-- Select Room --</option>
                  {availableRooms.map((r) => (
                    <option key={r._id} value={r._id}>Room {r.roomNumber} ({r.totalBeds - r.occupied} beds free)</option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Assigning..." : "Assign Room"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
