import React from "react";
import axios from "axios";
import "../css/versus.css";
import { useEffect, useState } from "react";
import { SingleCoin } from "../data/CoinGecko_API";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import CoinChart from "../components/Chart";
import VersusData from "../components/VersusData";
import AssetTitle from "../components/AssetTitle";
import Loading from "../components/Loader";

import "../css/asset.css";

function Versus() {
  const [coinL, setCoinL] = useState({});
  const [coinR, setCoinR] = useState([]);

  const [loading, setLoading] = useState(true);
  const firstCoin = localStorage.getItem("idFirstQuery");
  const secondCoin = localStorage.getItem("idSecondQuery");

  // Descargar datos a través de la API de CoinGecko
  useEffect(() => {
    const fetchFirstCoin = async () => {
      const { data } = await axios.get(SingleCoin(firstCoin));
      setCoinL(data);
    };
    const fetchSecondCoin = async () => {
      const { data } = await axios.get(SingleCoin(secondCoin));
      setCoinR(data);
    };
    fetchFirstCoin();
    fetchSecondCoin();
    setTimeout(() => setLoading(false), 1500);
  }, [firstCoin, secondCoin]);

  return (
    <>
      {loading === false ? (
        <div className="div-versus-container">
          <div className="left-coin-container">
            <div className="sidebar_left">
              <AssetTitle coin={coinL} />
              <div className="graph_container">
                <CoinChart coin={coinL} />
              </div>
              <div className="graph_container">
                <VersusData coin={coinL} />
              </div>
            </div>
          </div>
          <div className="right-coin-container">
            <div className="sidebar_right">
              <AssetTitle coin={coinR} />
              <div className="graph_container">
                <CoinChart coin={coinR} />
              </div>
              <div className="graph_container">
                <VersusData coin={coinR} />
              </div>
            </div>
          </div>
          <div className="return-container-vs">
            <Link className="btn btn-warn-back" to="/compare">
              <FaArrowCircleLeft />
            </Link>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Versus;
