import { useState, useEffect } from "react";
import { getRooms, createRoom, updateRoom, deleteRoom } from "../../api/api";
import { LuPlus, LuTrash2, LuPencil, LuX } from "react-icons/lu";
import "./AdminPages.css";

export default function ManageRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [form, setForm] = useState({ roomNumber: "", totalBeds: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchRooms = () => {
    getRooms().then(setRooms).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchRooms(); }, []);

  const openCreate = () => {
    setEditingRoom(null);
    setForm({ roomNumber: "", totalBeds: "" });
    setShowModal(true);
  };

  const openEdit = (room) => {
    setEditingRoom(room);
    setForm({ roomNumber: room.roomNumber, totalBeds: room.totalBeds });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingRoom) {
        await updateRoom(editingRoom._id, { roomNumber: form.roomNumber, totalBeds: Number(form.totalBeds) });
        setMessage({ type: "success", text: "Room updated!" });
      } else {
        await createRoom({ roomNumber: form.roomNumber, totalBeds: Number(form.totalBeds) });
        setMessage({ type: "success", text: "Room created!" });
      }
      setShowModal(false);
      fetchRooms();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this room?")) return;
    try {
      await deleteRoom(id);
      setMessage({ type: "success", text: "Room deleted" });
      fetchRooms();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  if (loading) return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Manage Rooms</h2>
        <p>Add, edit, and manage hostel rooms</p>
      </div>

      {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="data-table-container">
        <div className="table-header">
          <h3>All Rooms ({rooms.length})</h3>
          <button className="btn btn-primary btn-sm" onClick={openCreate}>
            <LuPlus size={16} /> Add Room
          </button>
        </div>
        {rooms.length === 0 ? (
          <div className="empty-state"><p>No rooms created yet</p></div>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>Room No.</th><th>Total Beds</th><th>Occupied</th><th>Available</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {rooms.map((r) => (
                <tr key={r._id}>
                  <td style={{fontWeight: 700}}>{r.roomNumber}</td>
                  <td>{r.totalBeds}</td>
                  <td>{r.occupied}</td>
                  <td>{r.totalBeds - r.occupied}</td>
                  <td><span className={`badge ${r.status}`}>{r.status}</span></td>
                  <td>
                    <div className="action-cell">
                      <button className="btn btn-sm btn-secondary" onClick={() => openEdit(r)}><LuPencil size={14} /></button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r._id)}><LuTrash2 size={14} /></button>
                    </div>
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
              <h3 style={{margin:0}}>{editingRoom ? "Edit Room" : "Add New Room"}</h3>
              <button className="btn btn-sm btn-secondary" onClick={() => setShowModal(false)}><LuX size={16}/></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Room Number *</label>
                <input className="form-control" required value={form.roomNumber} onChange={(e) => setForm({...form, roomNumber: e.target.value})} placeholder="e.g. A-101" />
              </div>
              <div className="form-group">
                <label>Total Beds *</label>
                <input className="form-control" type="number" min="1" required value={form.totalBeds} onChange={(e) => setForm({...form, totalBeds: e.target.value})} placeholder="e.g. 4" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : editingRoom ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
