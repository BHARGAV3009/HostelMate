import React from 'react'
import './Update.css'

function Update() {
  return (
    <div className='update'>
        <h2 className="announcements-title">Announcements</h2>
        <div className="announcements-container">
            <div className="announcement-card">
                <p>Maintenance work will start at 9 AM tomorrow</p>
            </div>
            <div className="announcement-card">
                <p>Residents are requested to reduce noise levels</p>
            </div>
        </div>
    </div>
  )
}

export default Update