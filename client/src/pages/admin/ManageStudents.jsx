import { useState, useEffect } from "react";
import { getStudents, createStudent, deleteStudent } from "../../api/api";
import { LuPlus, LuTrash2, LuX } from "react-icons/lu";
import "./AdminPages.css";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", phoneNumber: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchStudents = () => {
    getStudents().then(setStudents).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createStudent(form);
      setShowModal(false);
      setForm({ name: "", email: "", password: "", phoneNumber: "" });
      setMessage({ type: "success", text: "Student added successfully!" });
      fetchStudents();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      await deleteStudent(id);
      setMessage({ type: "success", text: "Student deleted" });
      fetchStudents();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  if (loading) return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Manage Students</h2>
        <p>Add, view, and manage hostel students</p>
      </div>

      {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="data-table-container">
        <div className="table-header">
          <h3>All Students ({students.length})</h3>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            <LuPlus size={16} /> Add Student
          </button>
        </div>
        {students.length === 0 ? (
          <div className="empty-state"><p>No students registered yet</p></div>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td style={{fontWeight: 600}}>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phoneNumber || "N/A"}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s._id)}>
                      <LuTrash2 size={14} />
                    </button>
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
              <h3 style={{margin:0}}>Add New Student</h3>
              <button className="btn btn-sm btn-secondary" onClick={() => setShowModal(false)}><LuX size={16}/></button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Full Name *</label>
                <input className="form-control" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="e.g. Rahul Sharma" />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input className="form-control" type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="student@example.com" />
              </div>
              <div className="form-group">
                <label>Password *</label>
                <input className="form-control" type="password" required value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} placeholder="Min 6 characters" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input className="form-control" value={form.phoneNumber} onChange={(e) => setForm({...form, phoneNumber: e.target.value})} placeholder="9876543210" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Adding..." : "Add Student"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
