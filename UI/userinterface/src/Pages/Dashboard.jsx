import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Header } from "../Components/Header"; // Ensure the import path is correct
import { Main } from "../Components/Main";
import { Sales } from "./Sales";
import { OrderTracking } from "./OrderTracking";
import { Documents } from "./Documents";
import "./Dashboard.css"; // Import CSS file for styles

export function Dashboard() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [targetView, setTargetView] = useState(() => parseInt(localStorage.getItem("currentView"), 10) || 1);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect to login if token doesn't exist
    }
  }, [token, navigate]);

  useEffect(() => {
    localStorage.setItem("currentView", targetView);
  }, [targetView]);

  const listOfLinks = [
    { id: 1, name: "Dashboard", color: "#4A90E2", view: <Main /> },
    { id: 2, name: "Sales", color: "#50E3C2", view: <Sales /> },
    { id: 3, name: "Tracking Orders", color: "#7B92A5", view: <OrderTracking /> },
    { id: 4, name: "Documents", color: "#D0021B", view: <Documents /> }
  ];

  return (
    <div className="dashboard">
      <Header onViewChange={setTargetView} />
      <div className="content">
        {listOfLinks.map((component) =>
          targetView === component.id ? <div key={component.id}>{component.view}</div> : null
        )}
      </div>
    </div>
  );
}
