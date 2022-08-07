import React, { useState, useEffect } from "react";
import axios from "axios";
import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { CoinList } from "../data/CoinGecko_API";
import ReturnButton from "../components/BackButton";
import Swal from "sweetalert2";
import "../css/compare.css";

function CompareCoins() {
  const currency = "usd";
  const [coin, setCoin] = useState([]);
  const [queryFirst, setQueryFirst] = useState("");
  const [querySecond, setQuerySecond] = useState("");
  const [outlineFirst, setOutlineFirst] = useState(false);
  const [outlineSecond, setOutlineSecond] = useState(false);
  const [closeVisibilityFirst, setCloseVisibilityFirst] = useState(false);
  const [closeVisibilitySecond, setCloseVisibilitySecond] = useState(false);

  // Descargar datos a través de la API de CoinGecko
  useEffect(() => {
    const fetchCoins = async () => {
      const { data } = await axios.get(CoinList(currency));
      setCoin(data);
    };
    fetchCoins();
  }, []);

  // Función para gestionar la búsqueda de dos monedas
  const handleSearch = () => {
    if (queryFirst === "") {
      setOutlineFirst(true);
      if (querySecond === "") {
        setOutlineSecond(true);
        Swal.fire({
          title: "¡Error!",
          text: "Los campos no pueden estar vacíos.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "¡Error!",
          text: "El campo no puede estar vacío.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else if (querySecond === "") {
      setOutlineSecond(true);
      if (queryFirst === "") {
        setOutlineFirst(true);
        Swal.fire({
          title: "¡Error!",
          text: "Los campos no pueden estar vacíos.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          title: "¡Error!",
          text: "El campo no puede estar vacío.",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      coin.forEach((element) => {
        if (
          element.symbol.toLowerCase() === queryFirst.toLowerCase() ||
          element.id.toLowerCase() === queryFirst.toLowerCase()
        ) {
          setOutlineFirst(false);
          localStorage.setItem("idFirstQuery", element.id);
          console.log(element.id);
        } else if (
          element.symbol.toLowerCase() === querySecond.toLowerCase() ||
          element.id.toLowerCase() === querySecond.toLowerCase()
        ) {
          setOutlineSecond(false);
          localStorage.setItem("idSecondQuery", element.id);
          console.log(element.id);
        } else {
          /* no hacer nada al respecto */
        }
      });
      Swal.fire({
        title: "¡Éxito!",
        text: "La búsqueda se ha realizado correctamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.href = "/compare/versus";
      }, 1500);
    }
  };

  // Función para introducir la búsqueda en la barra 1
  const inputQuery1 = (e) => {
    setQueryFirst(e.target.value);
    setCloseVisibilityFirst(true);
    setOutlineFirst(false);
  };

  // Función para introducir la búsqueda en la barra 2
  const inputQuery2 = (e) => {
    setQuerySecond(e.target.value);
    setCloseVisibilitySecond(true);
    setOutlineSecond(false);
  };

  // Función para eliminar la búsqueda de la barra 1
  const clearInput1 = () => {
    setQueryFirst("");
    setCloseVisibilityFirst(false);
  };

  // Función para eliminar la búsqueda de la barra 2
  const clearInput2 = () => {
    setQuerySecond("");
    setCloseVisibilitySecond(false);
  };

  return (
    <div className="compare-container">
      <h1>Compara dos monedas aquí</h1>
      <h2 className="body-text">
        Introduce el símbolo de dos monedas para obtener información<br></br>
        detallada de ellas junto con un gráfico del historial de mercado.
      </h2>
      <br></br>
      <div className="inline">
        <input
          id="search-first"
          type="text"
          className={
            outlineFirst === true ? "search-box-top-error" : "search-box-top"
          }
          placeholder="Introduce el primer símbolo (p.ej BTC)"
          value={queryFirst}
          onChange={inputQuery1}
          autoComplete="off"
        />
        <i
          className={
            closeVisibilityFirst === false
              ? "close-btn-hidden"
              : "close-btn-visible"
          }
          onClick={clearInput1}
        >
          <Close />
        </i>
      </div>
      <h3>vs</h3>
      <div className="inline">
        <input
          id="search-second"
          type="text"
          className={
            outlineSecond === true
              ? "search-box-bottom-error"
              : "search-box-bottom"
          }
          placeholder="Introduce el segundo símbolo (p.ej ETH)"
          value={querySecond}
          onChange={inputQuery2}
          autoComplete="off"
        />
        <i
          className={
            closeVisibilitySecond === false
              ? "close-btn-hidden"
              : "close-btn-visible"
          }
          onClick={clearInput2}
        >
          <Close />
        </i>
      </div>
      <br></br>
      <Link onClick={() => handleSearch()} className="btn btn-compare-go" to="">
        COMPARAR
      </Link>
      <ReturnButton />
    </div>
  );
}

export default CompareCoins;
