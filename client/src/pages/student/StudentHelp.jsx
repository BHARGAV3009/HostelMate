import { LuCircleHelp, LuMail, LuPhone } from "react-icons/lu";
import "./StudentPages.css";

export default function StudentHelp() {
  const faqs = [
    {
      question: "How do I pay my hostel fee?",
      answer: "Navigate to the Payments section from the sidebar. You will see a list of your pending fees. Click the 'Pay Now' button next to a pending fee to complete your transaction securely."
    },
    {
      question: "How can I raise a maintenance complaint?",
      answer: "Go to the Complaints section, enter the details of the issue you are facing (e.g., plumbing, electrical), and click Submit. You can track the status of your complaint on the same page."
    },
    {
      question: "When is the food menu updated?",
      answer: "The food menu is updated weekly by the hostel administration. You can view the current day's menu along with the full week schedule in the Food Menu section."
    },
    {
      question: "How do I request a room change?",
      answer: "Room changes are handled by the admin manually. Please raise a general complaint or reach out to the warden directly with your current room number and the reason for your request."
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Help & Support</h2>
        <p>Frequently asked questions and contact information</p>
      </div>

      <div className="help-grid">
        <div className="help-main">
          <div className="card">
            <h3 className="card-title">Frequently Asked Questions</h3>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h4>{faq.question}</h4>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="help-sidebar">
          <div className="card contact-card">
            <h3 className="card-title">Contact Administration</h3>
            <p>If you can't find the answer to your question, feel free to reach out to the hostel admin directly.</p>
            
            <div className="contact-info">
              <div className="contact-item">
                <LuMail size={18} />
                <span>admin@hostelmate.com</span>
              </div>
              <div className="contact-item">
                <LuPhone size={18} />
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <LuCircleHelp size={18} />
                <span>Office Hours: 9 AM - 5 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
