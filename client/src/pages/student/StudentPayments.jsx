import { useState, useEffect } from "react";
import { getMyPayments, payFee } from "../../api/api";
import "./StudentPages.css";

export default function StudentPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchPayments = () => {
    getMyPayments()
      .then(setPayments)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPayments(); }, []);

  const handlePay = async (id) => {
    setPaying(id);
    setMessage({ type: "", text: "" });
    try {
      await payFee(id);
      setMessage({ type: "success", text: "Payment marked as paid!" });
      fetchPayments();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setPaying(null);
    }
  };

  const totalPaid = payments.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0);

  if (loading) return <div className="page-container"><div className="spinner" style={{margin: '100px auto'}}></div></div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>My Payments</h2>
        <p>View your payment history and pay pending dues</p>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <div className="payment-summary">
        <div className="payment-summary-item">
          <h4>Total Paid</h4>
          <div className="amount paid">₹{totalPaid.toLocaleString()}</div>
        </div>
        <div className="payment-summary-item">
          <h4>Pending</h4>
          <div className="amount pending">₹{totalPending.toLocaleString()}</div>
        </div>
        <div className="payment-summary-item">
          <h4>Total Entries</h4>
          <div className="amount">{payments.length}</div>
        </div>
      </div>

      <div className="data-table-container">
        <div className="table-header">
          <h3>Payment History</h3>
        </div>
        {payments.length === 0 ? (
          <div className="empty-state">
            <p>No payment records found</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id}>
                  <td>{p.month}</td>
                  <td style={{fontWeight: 700}}>₹{p.amount?.toLocaleString()}</td>
                  <td><span className={`badge ${p.status}`}>{p.status}</span></td>
                  <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                  <td>
                    {p.status === "pending" ? (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handlePay(p._id)}
                        disabled={paying === p._id}
                      >
                        {paying === p._id ? "Processing..." : "Pay Now"}
                      </button>
                    ) : (
                      <span style={{color: "var(--success)", fontSize: "0.82rem", fontWeight: 600}}>✓ Paid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
