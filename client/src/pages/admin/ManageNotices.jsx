import { useState, useEffect } from "react";
import { getAllNotices, createNotice, updateNotice, deleteNotice } from "../../api/api";
import { LuPlus, LuTrash2, LuPencil, LuX } from "react-icons/lu";
import "./AdminPages.css";

export default function ManageNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [form, setForm] = useState({ title: "", message: "", status: "pending" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const fetchNotices = () => {
    getAllNotices().then(setNotices).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchNotices(); }, []);

  const openCreate = () => {
    setEditingNotice(null);
    setForm({ title: "", message: "", status: "pending" });
    setShowModal(true);
  };

  const openEdit = (n) => {
    setEditingNotice(n);
    setForm({ title: n.title, message: n.message, status: n.status });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingNotice) {
        await updateNotice(editingNotice._id, form);
        setMsg({ type: "success", text: "Notice updated!" });
      } else {
        await createNotice(form);
        setMsg({ type: "success", text: "Notice created!" });
      }
      setShowModal(false);
      fetchNotices();
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this notice?")) return;
    try {
      await deleteNotice(id);
      setMsg({ type: "success", text: "Notice deleted" });
      fetchNotices();
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    }
  };

  if (loading) return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Manage Notices</h2>
        <p>Create and manage hostel announcements</p>
      </div>

      {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      <div className="data-table-container">
        <div className="table-header">
          <h3>All Notices ({notices.length})</h3>
          <button className="btn btn-primary btn-sm" onClick={openCreate}>
            <LuPlus size={16} /> New Notice
          </button>
        </div>
        {notices.length === 0 ? (
          <div className="empty-state"><p>No notices created yet</p></div>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>Title</th><th>Message</th><th>Status</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {notices.map((n) => (
                <tr key={n._id}>
                  <td style={{fontWeight: 600}}>{n.title}</td>
                  <td style={{maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{n.message}</td>
                  <td><span className={`badge ${n.status?.replace(" ", "_")}`}>{n.status}</span></td>
                  <td>{new Date(n.date).toLocaleDateString()}</td>
                  <td>
                    <div className="action-cell">
                      <button className="btn btn-sm btn-secondary" onClick={() => openEdit(n)}><LuPencil size={14} /></button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(n._id)}><LuTrash2 size={14} /></button>
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
              <h3 style={{margin:0}}>{editingNotice ? "Edit Notice" : "Create Notice"}</h3>
              <button className="btn btn-sm btn-secondary" onClick={() => setShowModal(false)}><LuX size={16}/></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input className="form-control" required value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="Notice title" />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea className="form-control" required value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} placeholder="Notice message..." />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select className="form-control" value={form.status} onChange={(e) => setForm({...form, status: e.target.value})}>
                  <option value="pending">Pending</option>
                  <option value="under progress">Under Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : editingNotice ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
