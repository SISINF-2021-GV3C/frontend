import axios from "axios";
import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../data/CoinGecko_API";
import { Line } from "react-chartjs-2";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { chartDays } from "../data/ChartDays";
import { FaArrowCircleLeft } from "react-icons/fa";
import SelectButton from "./SelectButton";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
    
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const CoinChart = ({coin}) => {
    // Constantes para manejar los datos extraídos
    const [historicData, setHistoricData] = useState([]);
    const [days, setDays] = useState(1);
    const [loading, setLoading] = useState(false);
    const currency = "usd";

    // Extraer datos del gráfico a través de la API de CoinGecko
    useEffect(() => {
        const fetchHistoricData = async () => {
            const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
            setHistoricData(data.prices);
        }; 
        fetchHistoricData();
        setTimeout(() => setLoading(false), 1000);
    }, [coin.id, days]);

    // Botón para volver al menú de las monedas
    const getBack = () => {
        window.location.href = "/coins"
    }

    // Tema oscuro
    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
    });

    return (
        <>
        {loading === false ? (
            <ThemeProvider theme={darkTheme}>
                <div className="chart-container">
                    <span className="chart-title">GRÁFICO DEL HISTORIAL DE MERCADO</span>
                    <div className="chart-wrapper">
                        <Line
                            data={{
                                labels: historicData.map((coin) => {
                                    let date = new Date(coin[0]);
                                    let time =
                                    date.getHours() > 12
                                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                        : `${date.getHours()}:${date.getMinutes()} AM`;
                                    return days === 1 ? time : date.toLocaleDateString();
                                }),
                                datasets: [
                                {
                                    data: historicData.map((coin) => coin[1].toFixed(3)),
                                    label: `Precio ( Pasados ${days} Días ) en ${currency.toLocaleUpperCase()}`,
                                    borderColor: "#0B7DBF",
                                },
                                ],
                            }}
                            options={{
                                elements: {
                                point: {
                                    radius: 1,
                                },
                                },
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                            >
                            {chartDays.map((day) => (
                                <SelectButton
                                    key={day.value}
                                    onClick={() => {
                                        setDays(day.value);
                                        setLoading(false);
                                    }}
                                    selected={day.value === days}
                                    >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </div>
                    </div>
                    <button type="button" 
                        className="btn btn-warn-back"
                        onClick={getBack}
                    >
                        <FaArrowCircleLeft />
                    </button>
                </div>
            </ThemeProvider>
        ) : (
            <CircularProgress
                color="inherit"
                size={100}
                thickness={3}
            />
        )}
        </>
    );
}

export default CoinChart;