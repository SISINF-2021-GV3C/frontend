import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/App.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="App-header">
      <h1>Error 404: Página no encontrada</h1>
      <div className="button-return">
        <button onClick={() => navigate(-1)} className="btn btn-outline-light">
          Volver atrás
        </button>
      </div>
    </div>
  );
}

export default NotFound;
