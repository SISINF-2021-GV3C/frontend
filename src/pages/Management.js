import React from "react";
import { Link } from "react-router-dom";
import "../css/adminPage.css";

function Management() {
  return (
    <div className="admin-container">
      <h1>Management</h1>
      <Link to={`/management/user-management`} className="btn btn-primary">
        Administrar Usuarios
      </Link>
      <p />
      <Link to={`/management/dashboard`} className="btn btn-primary">
        Mostrar estadísticas
      </Link>
    </div>
  );
}

export default Management;
