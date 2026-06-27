import React, { useState } from 'react';

const PaymentFilters = () => {
  const [status, setStatus] = useState('Paid');
  const [monthYear, setMonthYear] = useState('');

  const monthYearOptions = [
    { value: '', label: 'All' },
    { value: '2024-01', label: 'January 2024' },
    { value: '2024-02', label: 'February 2024' },
    { value: '2024-03', label: 'March 2024' },
  ];

  return (
    <div
      style={{
        width: '100%',               
        boxSizing: 'border-box',     
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <label
          htmlFor="status-select"
          style={{
            fontWeight: '600',
            fontSize: '14px',
            color: '#333',
            whiteSpace: 'nowrap', 
          }}
        >
          Status:
        </label>
        <div style={{ position: 'relative' }}>
          <select
            id="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              padding: '10px 36px 10px 16px',
              borderRadius: '8px',
              border: '1px solid #ced4da',
              backgroundColor: '#fff',
              fontSize: '14px',
              minWidth: '140px',
              appearance: 'none',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Refunded">Refunded</option>
          </select>
          
          {}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '12px',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6c757d' }}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {}
      <div style={{ position: 'relative' }}>
        <select
          id="month-year-select"
          value={monthYear}
          onChange={(e) => setMonthYear(e.target.value)}
          style={{
            padding: '10px 36px 10px 16px',
            borderRadius: '8px',
            border: '1px solid #ced4da',
            backgroundColor: '#fff',
            fontSize: '14px',
            minWidth: '160px',
            appearance: 'none',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}
        >
          <option value="" disabled selected hidden>
            Month/Year
          </option>
          {monthYearOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Arrow Icon */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '12px',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        >
          <svg xmlns="http:
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PaymentFilters;