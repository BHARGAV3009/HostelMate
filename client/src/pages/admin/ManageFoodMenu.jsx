import { useState, useEffect } from "react";
import { getFoodMenu, setFoodMenu, deleteFoodMenu } from "../../api/api";
import { LuPlus, LuTrash2, LuX } from "react-icons/lu";
import "./AdminPages.css";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ManageFoodMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ day: "", breakfast: "", lunch: "", dinner: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMsg] = useState({ type: "", text: "" });

  const fetchMenu = () => {
    getFoodMenu()
      .then((data) => {
        const sorted = data.sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day));
        setMenu(sorted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchMenu(); }, []);

  const openEdit = (item) => {
    setForm({ day: item.day, breakfast: item.breakfast, lunch: item.lunch, dinner: item.dinner });
    setShowModal(true);
  };

  const openCreate = () => {
    setForm({ day: "", breakfast: "", lunch: "", dinner: "" });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setFoodMenu(form);
      setShowModal(false);
      setMsg({ type: "success", text: `Menu for ${form.day} saved!` });
      fetchMenu();
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this menu entry?")) return;
    try {
      await deleteFoodMenu(id);
      setMsg({ type: "success", text: "Menu entry deleted" });
      fetchMenu();
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    }
  };

  const existingDays = menu.map(m => m.day);
  const availableDays = DAYS.filter(d => !existingDays.includes(d));

  if (loading) return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Manage Food Menu</h2>
        <p>Set the weekly mess schedule for students</p>
      </div>

      {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <div className="data-table-container">
        <div className="table-header">
          <h3>Weekly Menu ({menu.length}/7 days)</h3>
          <button className="btn btn-primary btn-sm" onClick={openCreate}>
            <LuPlus size={16} /> Add Day
          </button>
        </div>
        {menu.length === 0 ? (
          <div className="empty-state"><p>No menu set yet. Add meal entries for each day.</p></div>
        ) : (
          <table className="data-table">
            <thead>
              <tr><th>Day</th><th>Breakfast</th><th>Lunch</th><th>Dinner</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {menu.map((m) => (
                <tr key={m._id}>
                  <td style={{fontWeight: 700}}>{m.day}</td>
                  <td>{m.breakfast || "—"}</td>
                  <td>{m.lunch || "—"}</td>
                  <td>{m.dinner || "—"}</td>
                  <td>
                    <div className="action-cell">
                      <button className="btn btn-sm btn-secondary" onClick={() => openEdit(m)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(m._id)}><LuTrash2 size={14} /></button>
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
              <h3 style={{margin:0}}>{form.day && existingDays.includes(form.day) ? `Edit ${form.day}` : "Add Menu"}</h3>
              <button className="btn btn-sm btn-secondary" onClick={() => setShowModal(false)}><LuX size={16}/></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Day *</label>
                <select className="form-control" required value={form.day} onChange={(e) => setForm({...form, day: e.target.value})}>
                  <option value="">-- Select Day --</option>
                  {form.day && existingDays.includes(form.day) && (
                    <option value={form.day}>{form.day}</option>
                  )}
                  {availableDays.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Breakfast</label>
                <input className="form-control" value={form.breakfast} onChange={(e) => setForm({...form, breakfast: e.target.value})} placeholder="e.g. Idli, Dosa, Coffee" />
              </div>
              <div className="form-group">
                <label>Lunch</label>
                <input className="form-control" value={form.lunch} onChange={(e) => setForm({...form, lunch: e.target.value})} placeholder="e.g. Rice, Dal, Sabzi" />
              </div>
              <div className="form-group">
                <label>Dinner</label>
                <input className="form-control" value={form.dinner} onChange={(e) => setForm({...form, dinner: e.target.value})} placeholder="e.g. Roti, Paneer, Salad" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Save Menu"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
