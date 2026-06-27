import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiChevronDown } from "react-icons/fi";
import { CgGenderMale, CgGenderFemale } from "react-icons/cg";
import "./AccountDetails.css";

const AccountDetails = ({ name = "User", email = "N/A", number = "N/A" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Select Gender");

  const menuItems = [
    { label: "Male", icon: <CgGenderMale /> },
    { label: "Female", icon: <CgGenderFemale /> },
    
  ];

  const handleSelect = (label) => {
    setSelectedGender(label);
    setIsMenuOpen(false);
  };

  return (
    <div className="account-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Personal Information</h2>
        </div>

        <div className="profile-content">
          <div className="avatar-wrapper">
            <div className="avatar-placeholder">
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="status-indicator online"></div>
          </div>

          <div className="info-group">
            <div className="info-item">
              <FiUser className="icon" />
              <div>
                <label>Full Name</label>
                <h4>{name}</h4>
              </div>
            </div>

            <div className="info-item">
              <FiMail className="icon" />
              <div>
                <label>Email Address</label>
                <h4>{email}</h4>
              </div>
            </div>

            <div className="info-item">
              <FiPhone className="icon" />
              <div>
                <label>Phone Number</label>
                <h4>{number}</h4>
              </div>
            </div>

            {}
            <div className="info-item dropdown-item">
              <div
                className="gender-trigger"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="gender-label-group">
                  <label>Gender</label>
                  <h4>{selectedGender}</h4>
                </div>
                <FiChevronDown
                  className={`chevron ${isMenuOpen ? "rotated" : ""}`}
                />
              </div>

              {isMenuOpen && (
                <div className="gender-menu">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      className="menu-option"
                      onClick={() => handleSelect(item.label)}
                    >
                      {item.icon} <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
