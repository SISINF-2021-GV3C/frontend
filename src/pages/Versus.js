import React from "react";
import axios from "axios";
import "../css/versus.css";
import CoinChart from "../components/Chart";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SingleCoin } from "../data/CoinGecko_API";
import { HistoricalChart } from "../data/CoinGecko_API";
import Loading from "../components/Loader";

function Versus() {
  const { id } = useParams();
  const firstCoin = localStorage.getItem("symFirstQuery");
  const secondCoin = localStorage.getItem("symSecondQuery");
  const [coinL, setCoinL] = useState();
  const [coinR, setCoinR] = useState();

  const [market_data, setMarket_Data] = useState([]);
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(true);
  const currency = "usd";

  // Descargar datos a través de la API de CoinGecko
  useEffect(() => {
    const fetchFirstCoin = async () => {
      const { data } = await axios.get(SingleCoin(firstCoin));
      setCoinL(data);
      //setMarket_Data(data.market_data);
    };
    fetchFirstCoin();
    const fetchSecondCoin = async () => {
      const { data } = await axios.get(SingleCoin(secondCoin));
      setCoinR(data);
      //setMarket_Data(data.market_data);
    };
    fetchSecondCoin();
    console.log(coinL);
    console.log(coinR);
    setTimeout(() => setLoading(false), 1500);
  }, [id]);

  return (
    <>
      {loading === false ? (
        <div className="div-versus-container">
          <div className="left-coin-container">
            <div className="sidebar_left">
              <CoinChart coin={coinL} />
            </div>
          </div>
          <div className="right-coin-container">
            <div className="sidebar_right">
              <CoinChart coin={coinR} />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Versus;
