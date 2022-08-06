import React from "react";
import axios from "axios";
import "../css/versus.css";

function Versus() {
  return (
    <div className="div-versus-container">
      <div className="left-coin-container">
        <div className="sidebar_left">PRIMERA MONEDA</div>
      </div>
      <div className="right-coin-container">
        <div className="sidebar_right">SEGUNDA MONEDA</div>
      </div>
    </div>
  );
}

export default Versus;
