import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getProfile, updateProfile } from "../../api/api";
import { LuUser, LuMail, LuPhone, LuShield, LuSave } from "react-icons/lu";
import "./StudentPages.css";

export default function StudentProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phoneNumber: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfile(data);
        setForm({ name: data.name, phoneNumber: data.phoneNumber || "" });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: "", text: "" });
    try {
      const updated = await updateProfile(form);
      setProfile(updated);
      setEditing(false);
      setMessage({ type: "success", text: "Profile updated!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;

  const displayProfile = profile || user;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>My Profile</h2>
        <p>View and manage your personal information</p>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <div className="profile-grid">
        <div className="card profile-avatar-card">
          <div className="profile-avatar-large">
            {displayProfile?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <h3>{displayProfile?.name}</h3>
          <span className="role-label">{displayProfile?.role}</span>
        </div>

        <div className="card profile-info-card">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
            <h3>Personal Information</h3>
            {!editing ? (
              <button className="btn btn-sm btn-secondary" onClick={() => setEditing(true)}>Edit</button>
            ) : (
              <div className="btn-group">
                <button className="btn btn-sm btn-secondary" onClick={() => { setEditing(false); setForm({ name: profile.name, phoneNumber: profile.phoneNumber || "" }); }}>Cancel</button>
                <button className="btn btn-sm btn-primary" onClick={handleSave} disabled={saving}>
                  <LuSave size={14} />
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>

          <div className="profile-field">
            <div className="profile-field-icon"><LuUser size={18} /></div>
            <div className="profile-field-info">
              <label>Full Name</label>
              {editing ? (
                <input className="form-control" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} style={{marginTop: 4}} />
              ) : (
                <p>{displayProfile?.name}</p>
              )}
            </div>
          </div>

          <div className="profile-field">
            <div className="profile-field-icon"><LuMail size={18} /></div>
            <div className="profile-field-info">
              <label>Email</label>
              <p>{displayProfile?.email}</p>
            </div>
          </div>

          <div className="profile-field">
            <div className="profile-field-icon"><LuPhone size={18} /></div>
            <div className="profile-field-info">
              <label>Phone Number</label>
              {editing ? (
                <input className="form-control" value={form.phoneNumber} onChange={(e) => setForm({...form, phoneNumber: e.target.value})} style={{marginTop: 4}} />
              ) : (
                <p>{displayProfile?.phoneNumber || "Not set"}</p>
              )}
            </div>
          </div>

          <div className="profile-field">
            <div className="profile-field-icon" style={{background: 'var(--success-bg)', color: 'var(--success)'}}><LuShield size={18} /></div>
            <div className="profile-field-info">
              <label>Role</label>
              <p style={{textTransform: 'capitalize'}}>{displayProfile?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
