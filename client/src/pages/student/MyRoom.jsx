import { useState, useEffect } from "react";
import { getMyRoom } from "../../api/api";
import { LuDoorOpen, LuBed, LuUsers, LuCheck } from "react-icons/lu";
import "./StudentPages.css";

export default function MyRoom() {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyRoom()
      .then(setRoom)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>My Room</h2>
        <p>View your room allocation details</p>
      </div>

      {error ? (
        <div className="card">
          <div className="empty-state">
            <LuDoorOpen size={64} />
            <p>No room has been allocated to you yet. Please contact the hostel admin.</p>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="room-card">
            <div className="room-detail">
              <div className="room-detail-icon">
                <LuDoorOpen size={22} />
              </div>
              <div className="room-detail-info">
                <h4>Room Number</h4>
                <p>{room?.roomNumber}</p>
              </div>
            </div>
            <div className="room-detail">
              <div className="room-detail-icon" style={{background: "var(--info-bg)", color: "var(--info)"}}>
                <LuBed size={22} />
              </div>
              <div className="room-detail-info">
                <h4>Total Beds</h4>
                <p>{room?.totalBeds}</p>
              </div>
            </div>
            <div className="room-detail">
              <div className="room-detail-icon" style={{background: "var(--warning-bg)", color: "var(--warning)"}}>
                <LuUsers size={22} />
              </div>
              <div className="room-detail-info">
                <h4>Occupied</h4>
                <p>{room?.occupied} / {room?.totalBeds}</p>
              </div>
            </div>
            <div className="room-detail">
              <div className="room-detail-icon" style={{background: "var(--success-bg)", color: "var(--success)"}}>
                <LuCheck size={22} />
              </div>
              <div className="room-detail-info">
                <h4>Available Beds</h4>
                <p>{room?.totalBeds - room?.occupied}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
