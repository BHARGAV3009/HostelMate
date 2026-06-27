import React from 'react'
import './HomePage.css'
import '../Data'
import Cards from '../Cards/Cards'
import { MdAccountCircle } from 'react-icons/md'
import { User } from 'lucide-react'

function HomePage({name}) {
  
  return (
    <div className="homePage-container">

      <div id="welcome-note">

        <div id="icon-wrap">
          <User size={24} color='#f97415'/>
        </div>

        <div id="welcome-text">

          <h2>Welcome back, {name}!</h2>
          <p>Here's your hostel overview</p>

        </div>
      </div>
      
      <div className="HomePage">
        
      </div>
    </div>
  )
}

export default HomePage
