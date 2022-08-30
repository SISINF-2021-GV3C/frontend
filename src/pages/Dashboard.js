import React, { useState, useEffect } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Grid } from "@mantine/core";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import "../css/adminPage.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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
  const [totalAge, setTotalAge] = useState([]);
  const [numMen, setNumMen] = useState(0);
  const [numWomen, setNumWomen] = useState(0);
  const [rango16_20, setRango16_20] = useState(0);
  const [rango21_25, setRango21_25] = useState(0);
  const [rango26_30, setRango26_30] = useState(0);
  const [rango31_35, setRango31_35] = useState(0);
  const [rango36_40, setRango36_40] = useState(0);
  const [rango41_45, setRango41_45] = useState(0);
  const [rangoMas45, setRangoMas45] = useState(0);

  // Función para buscar usuarios en la BD y sus estadísticas.
  const fetchUsers = async () => {
    // Extraer todo el listado de usuarios.
    const { data } = await axios.get(usersURL);

    // Obtener el número de usuarios registrados.
    const num = data.length;
    // Obtener el número de hombres.
    const man = data.filter((elem) => elem.genero === "Hombre").length;
    // Obtener el número de mujeres.
    const woman = data.filter((elem) => elem.genero === "Mujer").length;

    // Iteración para calcular la suma total de las edades
    // (valor necesario para calcular la media de edad).
    var edadTotal = 0;
    for (let i = 0; i < data.length; i++) {
      const calcEdad = moment(data[i].anyo_nac, "DD-MM-YYYY")
        .fromNow(true)
        .split(" ")[0];
      edadTotal += parseInt(calcEdad);
    }

    // Obtener número de usuarios por rangos de edad.
    // Rango 16-20 años.
    const r16_20 = data.filter(
      (elem) =>
        parseInt(
          moment(elem.anyo_nac, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) >= 16 &&
        parseInt(
          moment(elem.anyo_nac, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) <= 20
    ).length;
    // Rango 16-20 años.
    const r21_25 = data.filter(
      (elem) =>
        parseInt(
          moment(elem.anyo_nac, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) >= 21 &&
        parseInt(
          moment(elem.anyo_nac, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) <= 25
    ).length;
    // Rango 16-20 años.
    const r26_30 = data.filter(
      (elem) =>
        parseInt(
          moment(elem.anyo_nac, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) >= 26 &&
        parseInt(
          moment(elem.anyo_nac, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) <= 30
    ).length;
    // Rango 16-20 años.
    const r31_35 = data.filter(
      (elem) =>
        parseInt(
          moment(elem.anyo_nac, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) >= 31 &&
        parseInt(
          moment(elem.anyo_nac, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) <= 35
    ).length;
    // Rango 16-20 años.
    const r36_40 = data.filter(
      (elem) =>
        parseInt(
          moment(elem.anyo_nac, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) >= 36 &&
        parseInt(
          moment(elem.anyo_nac, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) <= 40
    ).length;
    // Rango 16-20 años.
    const r41_45 = data.filter(
      (elem) =>
        parseInt(
          moment(elem.anyo_nac, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) >= 41 &&
        parseInt(
          moment(elem.anyo_nac, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) <= 45
    ).length;
    // Rango 16-20 años.
    const rMas45 = data.filter(
      (elem) =>
        parseInt(
          moment(elem.anyo_nac, "DD-MM-YYYY").fromNow(true).split(" ")[0]
        ) > 45
    ).length;

    // Establecer los valores en los estados una vez obtenidos.
    setNumUsers(num);
    setNumMen(man);
    setNumWomen(woman);
    setTotalAge(edadTotal);
    setRango16_20(r16_20);
    setRango21_25(r21_25);
    setRango26_30(r26_30);
    setRango31_35(r31_35);
    setRango36_40(r36_40);
    setRango41_45(r41_45);
    setRangoMas45(rMas45);
  };

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
        {index + 1}. {country.pais}
      </div>
    );
  });

  const displayFavCoins = favCoins.map((coin, index) => {
    return (
      <div key={coin.simbolo}>
        {index + 1}. {coin.simbolo.toUpperCase()}
      </div>
    );
  });

  return (
    <div className="admin-container">
      <h1 className="title-dashboard">Estadísticas</h1>
      <div>
        <div className="row g-3">
          <div className="col grid-box">
            Top 3 países más registrados <br />
            <div className="numberCircleTOP3">{displayCountries}</div>
          </div>

          <div className="col grid-box">
            Top 3 monedas más seguidas <br />
            <div className="numberCircleTOP3">{displayFavCoins}</div>
          </div>

          <div className="col grid-box">
            Número de usuarios registrados <br />
            <div className="numberCircle">{numUsers}</div>
          </div>
        </div>
        <div className="row g-3">
          <div className="col grid-box">
            Ratio hombres/mujeres (%)
            <br />
            <Pie
              data={{
                labels: ["Hombres", "Mujeres"],
                datasets: [
                  {
                    label: "Ratio hombres/mujeres",
                    data: [
                      ((numMen / numUsers) * 100).toFixed(1),
                      ((numWomen / numUsers) * 100).toFixed(1),
                    ],
                    backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
                    hoverOffset: 4,
                  },
                ],
              }}
            />
          </div>
          <div className="col grid-box">
            Media de edad (años)
            <br />
            <div className="numberCircleAvg">
              {Math.trunc(totalAge / numUsers)}
            </div>
          </div>
          <div className="col grid-box">
            Usuarios por rango de edad (%)
            <br />
            <Doughnut
              data={{
                labels: [
                  "16-20",
                  "21-25",
                  "26-30",
                  "31-35",
                  "36-40",
                  "41-45",
                  "+45",
                ],
                datasets: [
                  {
                    label: "Rangos de edad",
                    data: [
                      ((rango16_20 / numUsers) * 100).toFixed(1),
                      ((rango21_25 / numUsers) * 100).toFixed(1),
                      ((rango26_30 / numUsers) * 100).toFixed(1),
                      ((rango31_35 / numUsers) * 100).toFixed(1),
                      ((rango36_40 / numUsers) * 100).toFixed(1),
                      ((rango41_45 / numUsers) * 100).toFixed(1),
                      ((rangoMas45 / numUsers) * 100).toFixed(1),
                    ],
                    backgroundColor: [
                      "rgb(54, 162, 235)",
                      "rgb(255, 99, 132)",
                      "rgb(235, 213, 52)",
                      "rgb(72, 145, 44)",
                      "rgb(26, 82, 143)",
                      "rgb(76, 26, 156)",
                      "rgb(156, 56, 26)",
                    ],
                    hoverOffset: 4,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
      <p></p>
      <button onClick={() => navigate(-1)} className="btn btn-back-admin">
        <FaArrowCircleLeft />
      </button>
    </div>
  );
}

export default Dashboard;