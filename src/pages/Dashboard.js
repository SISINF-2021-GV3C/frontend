import React, { useState, useEffect } from "react";
import { Grid } from "@mantine/core";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/adminPage.css";

// URLs para manejo de datos en la BD
const statsURL =
  "http://ec2-18-206-137-85.compute-1.amazonaws.com/estadisticas/";
const usersURL = "http://ec2-18-206-137-85.compute-1.amazonaws.com/getUsers/";

function Dashboard() {
  const navigate = useNavigate();

  // Constante para almacenar las estadísticas
  const [countries, setCountries] = useState([]);
  const [favCoins, setFavCoins] = useState([]);
  const [numUsers, setNumUsers] = useState([]);
  const [numMen, setNumMen] = useState(0);
  const [numWomen, setNumWomen] = useState(0);

  // Función para buscar usuarios en la BD
  const fetchUsers = async () => {
    const { data } = await axios.get(usersURL);
    const num = data.length;
    const man = data.filter((elem) => elem.genero === "Hombre").length;
    const woman = data.filter((elem) => elem.genero === "Mujer").length;
    setNumUsers(num);
    setNumMen(man);
    setNumWomen(woman);
  };

  console.log(
    "Total de usuarios: " +
      numUsers +
      "\nHombres: " +
      numMen +
      "\nMujeres: " +
      numWomen
  );

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await axios.get(statsURL);
      setCountries(data.pais);
      setFavCoins(data.favCoin);
    };
    fetchStats();
    fetchUsers();
  }, []);

  const displayCountries = countries.map((country, index) => {
    return (
      <div key={country.pais}>
        <Grid gutter="xl">
          <Grid.Col span={10}>
            {index + 1}. {country.pais}
          </Grid.Col>
        </Grid>
      </div>
    );
  });

  const displayFavCoins = favCoins.map((coin, index) => {
    return (
      <div key={coin.simbolo}>
        <Grid gutter="xl">
          <Grid.Col span={10}>
            {index + 1}. {coin.simbolo.toUpperCase()}
          </Grid.Col>
        </Grid>
      </div>
    );
  });

  return (
    <div className="admin-container">
      <h1>Dashboard</h1>
      <div className="grid-box">
        Top 3 países registrados: {displayCountries}
      </div>
      <div className="grid-box">Top 3 monedas seguidas: {displayFavCoins}</div>
      <div className="grid-box">Usuarios registrados: {numUsers}</div>
      <div className="grid-box">
        Pte hombres/mujeres: {((numMen + numWomen) / numUsers) * 100} %
      </div>
      <p></p>
      <button onClick={() => navigate(-1)} className="btn btn-back-admin">
        <FaArrowCircleLeft />
      </button>
    </div>
  );
}

export default Dashboard;
