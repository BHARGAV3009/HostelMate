import { useState, useEffect } from "react";
import { getAllPayments, createPayment, deletePayment, getStudents } from "../../api/api";
import { LuPlus, LuTrash2, LuX } from "react-icons/lu";
import "./AdminPages.css";

export default function ManagePayments() {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ userId: "", amount: "", month: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchData = () => {
    Promise.all([getAllPayments(), getStudents()])
      .then(([p, s]) => { setPayments(p); setStudents(s); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createPayment({ userId: form.userId, amount: Number(form.amount), month: form.month });
      setShowModal(false);
      setForm({ userId: "", amount: "", month: "" });
      setMessage({ type: "success", text: "Payment record created!" });
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this payment record?")) return;
    try {
      await deletePayment(id);
      setMessage({ type: "success", text: "Payment deleted" });
      fetchData();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const totalRevenue = payments.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0);

  if (loading) return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Manage Payments</h2>
        <p>Create fee records and track payments</p>
      </div>

      {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="admin-stat-grid" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
        <div className="admin-stat-card green">
          <div className="admin-stat-label">Collected</div>
          <div className="admin-stat-value">₹{totalRevenue.toLocaleString()}</div>
        </div>
        <div className="admin-stat-card yellow">
          <div className="admin-stat-label">Pending</div>
          <div className="admin-stat-value">₹{totalPending.toLocaleString()}</div>
        </div>
        <div className="admin-stat-card blue">
          <div className="admin-stat-label">Total Records</div>
          <div className="admin-stat-value">{payments.length}</div>
        </div>
      </div>

      <div className="data-table-container">
        <div className="table-header">
          <h3>All Payments</h3>
          <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
            <LuPlus size={16} /> Create Fee
          </button>
        </div>
        {payments.length === 0 ? (
          <div className="empty-state"><p>No payment records</p></div>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>Student</th><th>Month</th><th>Amount</th><th>Status</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  <td style={{fontWeight: 600}}>{students.find(s => s._id === p.userId)?.name || p.userId}</td>
                  <td>{p.month}</td>
                  <td style={{fontWeight: 700}}>₹{p.amount?.toLocaleString()}</td>
                  <td><span className={`badge ${p.status}`}>{p.status}</span></td>
                  <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>
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
              <h3 style={{margin:0}}>Create Fee Record</h3>
              <button className="btn btn-sm btn-secondary" onClick={() => setShowModal(false)}><LuX size={16}/></button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Select Student *</label>
                <select className="form-control" required value={form.userId} onChange={(e) => setForm({...form, userId: e.target.value})}>
                  <option value="">-- Select Student --</option>
                  {students.map((s) => (
                    <option key={s._id} value={s._id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Month *</label>
                <input className="form-control" required value={form.month} onChange={(e) => setForm({...form, month: e.target.value})} placeholder="e.g. June 2026" />
              </div>
              <div className="form-group">
                <label>Amount (₹) *</label>
                <input className="form-control" type="number" min="1" required value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} placeholder="e.g. 5000" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Creating..." : "Create Fee"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
