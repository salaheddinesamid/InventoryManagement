import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./ProfileSettings.css"; // Create this CSS file for styling if needed

export function ProfileSettings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    // Fetch current profile settings
    Axios.get("http://localhost:9000/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setErrorMessage("Failed to load profile settings");
      });
  }, [token]);

  const handleSave = () => {
    Axios.put("http://localhost:9000/user/profile", { username, email }, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        setErrorMessage("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setErrorMessage("Failed to update profile");
      });
  };

  return (
    <div className="profile-settings-container">
      <h2>Profile Settings</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSave}>Save</button>
    </div>
  );
}
