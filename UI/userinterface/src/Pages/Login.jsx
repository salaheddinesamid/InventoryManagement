import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {jwtDecode} from "jwt-decode";
import "./Login.css";
import logo from "./1996.jpg"; // Import the logo image

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading spinner

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && token !== "null") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false); // Make sure to handle logged out state
    }
  }, [setLoggedIn]);

  const handleLogin = async () => {
    setLoading(true); // Start loading spinner

    try {
      const response = await Axios.post(
        'http://localhost:9000/manager/authenticate',
        {
          email,
          password,
        }
      );
      const { accessToken, tokenType } = response.data;

      // Decode token to check expiration
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        throw new Error("Token has expired");
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("tokenType", tokenType);
      setLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Invalid credentials or server error");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo-container">
          <img src={logo} alt="Warehouse Logo" className="logo" />
        </div>
        <h2>My Warehouse</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-button" disabled={loading}>
            {loading ? (
              <svg className="spinner" viewBox="0 0 50 50">
                <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
