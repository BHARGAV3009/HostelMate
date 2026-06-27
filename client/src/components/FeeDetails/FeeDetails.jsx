import React from 'react';
import './FeeDetails.css';
import '../../styles/global.css';
import TransactionDetails from '../TransactionDetails/TransactionDetails';
import { BiTimeFive, BiCalendarEvent, BiWallet } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";

function FeeDetails({ name }) {
  
  const status = "Pending"; 

  return (
    <div className="fee-details-container">
      {}
      <div className="top-component">
        <div className="header-text">
          <h2>My Payments</h2>
          <p>View your payment history and upcoming dues</p>
        </div>
      </div>

      {}
      <div className="summary-card">
        
        {}
        <div className="payment-info">
          <div className="info-header">
            <BiWallet className="icon-orange" />
            <span>Next Payment Due</span>
          </div>
          <h1>$6,000</h1>
          <div className="due-date">
            <BiCalendarEvent />
            <p>Due by <strong>05 Nov, 2025</strong></p>
          </div>
        </div>

        {}
        <div className="divider"></div>

        {}
        <div className="status-section">
          <h3>Payment Status</h3>
          <div className={`status-badge ${status.toLowerCase()}`}>
            <span className="dot"><FaCircle size={8}/></span>
            {status}
          </div>
          <p className="status-note">
            <BiTimeFive /> {status === 'Pending' ? 'Awaiting payment' : 'Payment received'}
          </p>
        </div>

      </div>

      {}
      <div className="previous-payment">
        <div className="section-title">
            <h3>Transaction History</h3>
        </div>
        <TransactionDetails />
      </div>
      
    </div>
  )
}

export default FeeDetails;