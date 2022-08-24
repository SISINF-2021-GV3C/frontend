import React from "react";
import { Link } from "react-router-dom";
import "../css/adminPage.css";

function Management() {
  const handleUserMgmt = () => {
    window.location.href = "/management/user-management";
  };

  return (
    <div className="admin-container">
      <h1>Management</h1>
      <button className="btn btn-primary" onClick={handleUserMgmt}>
        Administrar Usuarios
      </button>
      <button className="btn btn-primary">Mostrar estadísticas</button>
    </div>
  );
}

export default Management;
