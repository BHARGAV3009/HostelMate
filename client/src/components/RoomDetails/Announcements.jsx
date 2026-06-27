import { Bell, BellDot, BellDotIcon } from 'lucide-react'
import React from 'react'
import './Announcements.css';

const Announcements = () => {
  return (
    <div className='announcements-container'>
      <h2>Notices & Announcements</h2>
      <p>Stay updated with hostel announcements</p>
      <div className="notices-container">
        <Bell size={90}/>
        <p>No notices available</p>
      </div>
    </div>
  )
}

export default Announcements