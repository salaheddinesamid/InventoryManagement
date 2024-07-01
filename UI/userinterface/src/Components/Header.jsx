import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css"; // Import CSS file for styles
import { faGear, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const HeaderButton = ({ icon, color, onClick, tooltip }) => (
  <button className={`header-button btn btn-${color}`} onClick={onClick} title={tooltip}>
    <FontAwesomeIcon icon={icon} />
  </button>
);

export function Header({ onViewChange }) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    // Add your settings functionality here
  };

  const handleMessagesClick = () => {
    console.log("Messages clicked");
    // Add your messages functionality here
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleProfileSettingsClick = () => {
    navigate("/profile-settings"); // Navigate to the ProfileSettings component
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenType');
    navigate('/'); // or wherever your login route is defined
  };
  

  return (
    <div className="header-container">
      <div className="header-title">
        <h4>My Warehouse</h4>
      </div>
      <div className="header-links">
        <button className="header-link btn btn-light" onClick={() => {onViewChange(1)}} title="Dashboard">
          Dashboard
        </button>
        <button className="header-link btn btn-light" onClick={() => onViewChange(2)} title="Sales">
          Sales
        </button>
        <button className="header-link btn btn-light" onClick={() => onViewChange(3)} title="Orders">
          Orders
        </button>
        <button className="header-link btn btn-light" onClick={() => onViewChange(4)} title="Documents">
          Documents
        </button>
      </div>
      <div className="header-buttons">
        <HeaderButton icon={faGear} color="primary" onClick={handleSettingsClick} tooltip="Settings" />
        <HeaderButton icon={faEnvelope} color="warning" onClick={handleMessagesClick} tooltip="Messages" />
        <div className="profile-dropdown-container">
          <HeaderButton icon={faUser} color="dark" onClick={handleProfileClick} tooltip="Profile" />
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <button className="dropdown-item" onClick={handleProfileSettingsClick}>Profile Settings</button>
              <button className="dropdown-item" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
