import React from "react";
import { Grid } from "@mantine/core";
import { FaAngleDoubleUp } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../css/adminPage.css";

function Dashboard() {
  const navigate = useNavigate();

  // Función para volver al principio de la página
  const scrollToTop = () => {
    const element = document.getElementById("top-index-users");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <div className="admin-container">
      <h1>Dashboard</h1>
      <Grid grow gutter="xl">
        <Grid.Col className="grid-box" span={4}>
          1
        </Grid.Col>
        <Grid.Col className="grid-box" span={4}>
          2
        </Grid.Col>
        <Grid.Col className="grid-box" span={4}>
          3
        </Grid.Col>
        <Grid.Col className="grid-box" span={4}>
          4
        </Grid.Col>
        <Grid.Col className="grid-box" span={4}>
          5
        </Grid.Col>
      </Grid>
      <p></p>
      <button type="button" className="btn btn-top-admin" onClick={scrollToTop}>
        <FaAngleDoubleUp />
      </button>
      <button onClick={() => navigate(-1)} className="btn btn-back-admin">
        <FaArrowCircleLeft />
      </button>
    </div>
  );
}

export default Dashboard;
