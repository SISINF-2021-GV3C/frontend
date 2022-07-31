import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../data/CoinGecko_API";
import { currencyTable } from "../data/Currencies";
import CoinChart from "../components/Chart"
import Loading from "../components/Loader";
import Collapsible from 'react-collapsible';
import SelectButton from "../components/SelectButton";
import "../css/asset.css"

function Asset () {
    
    // Constantes de manejo de datos
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const [loading, setLoading] = useState(true);
    const [descText, setDescText] = useState("Leer descripción");
    const [description, setDescription] = useState("");
    const [market_data, setMarket_Data] = useState([]);
    const [fav, setFav] = useState("NO");
    const [favCN, setFavCN] = useState("bi-star");
    const [divisa, setDivisa] = useState("usd");
    const [symbol, setSymbol] = useState("$");
    var isPositive = [];

    // Opciones de formato de número (USD)
    const supplyFormat = new Intl.NumberFormat('en-US');

    // Descargar datos a través de la API de CoinGecko
    useEffect(() => {
        const fetchSingleCoin = async () => {
            const { data } = await axios.get(SingleCoin(id))
            setCoin(data);
            setMarket_Data(data.market_data);
            setDescription(data.description.en);
        }; 
        fetchSingleCoin();
        setTimeout(() => setLoading(false), 1000);
    }, [id]);         

    // Añadir moneda a favotitos
    const addCoin = () => {
        if (fav === "NO") {
            setFavCN("bi-star-fill");
            setFav("YES");
        } else if (fav === "YES") {
            setFavCN("bi-star");
            setFav("NO");
        } else { return fav; }
    }

    // Abrir la descripción
    const openDescription = () => {
        if (descText === "Leer descripción") {
            setDescText("Cerrar descripción");
        } 
    }

    // Cerrar la descripción
    const closeDescription = () => {
        if (descText === "Cerrar descripción") {
            setDescText("Leer descripción");
        } 
    }

    // Funciones para comprobar el porcentaje de cambio para aplicar CSS
    // Comprobar porcentaje de cambio en 24h
    const checkPte24h = () => {
        if (market_data.price_change_percentage_24h > 0) {
            isPositive[0] = true;
        } else {
            isPositive[0] = false;
        }
    }

    // Comprobar porcentaje de cambio en 7 días
    const checkPte7d = () => {
        if (market_data.price_change_percentage_7d > 0) {
            isPositive[1] = true;
        } else {
            isPositive[1] = false;
        }
    }

    // Comprobar porcentaje de cambio en 14 días
    const checkPte14d = () => {
        if (market_data.price_change_percentage_14d > 0) {
            isPositive[2] = true;
        } else {
            isPositive[2] = false;
        }
    }

    // Comprobar porcentaje de cambio en 30 días
    const checkPte30d = () => {
        if (market_data.price_change_percentage_30d > 0) {
            isPositive[3] = true;
        } else {
            isPositive[3] = false;
        }
    }

    // Comprobar porcentaje de cambio en 60 días
    const checkPte60d = () => {
        if (market_data.price_change_percentage_60d > 0) {
            isPositive[4] = true;
        } else {
            isPositive[4] = false;
        }
    }

    // Comprobar porcentaje de cambio en 200 días
    const checkPte200d = () => {
        if (market_data.price_change_percentage_200d > 0) {
            isPositive[5] = true;
        } else {
            isPositive[5] = false;
        }
    }

    // Comprobar porcentaje de cambio en 1 año
    const checkPte1y = () => {
        if (market_data.price_change_percentage_1y > 0) {
            isPositive[6] = true;
        } else {
            isPositive[6] = false;
        }
    }

    // Comprobar el cambio de precio en 1 día
    const checkChange24h = () => {
        if (market_data.price_change_24h > 0) {
            isPositive[7] = true;
        } else {
            isPositive[7] = false;
        }
    }

    // Mostrar la cabecera de la moneda
    const displayTitle = () => {
        return (
            <div className="title-container">
                <div className="crypto-title">
                    <img className="crypto-image" src={coin.image.large} alt={coin.name} width="50px" />  
                    | {coin.name} | 
                    <span className="crypto-symbol">{(coin.symbol).toUpperCase()}</span>
                    <i onMouseOver={addCoin} onMouseOut={addCoin} onClick={addCoin} className={`bi ${favCN} star-icon`}></i>
                </div>
            </div>
        )
    }

    // Mostrar la descripción de la moneda
    const displayDescription = () => {
        return (
            <div className="read-more-container">
                <Collapsible onTriggerOpening={openDescription} onTriggerClosing={closeDescription} trigger={descText}>
                    <div className="description-container">            
                        <div dangerouslySetInnerHTML={{ __html:description}}></div>
                    </div>
                </Collapsible>
            </div>
        )
    }

    // Función para cambiar al SI
    function convertToICS (labelValue) {
        return Math.abs(Number(labelValue)) >= 1.0e+9
            ? supplyFormat.format((Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2)) + " B"
            // Six Zeroes for Millions 
            : Math.abs(Number(labelValue)) >= 1.0e+6
            ? supplyFormat.format((Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2)) + " M"
            // Three Zeroes for Thousands
            : Math.abs(Number(labelValue)) >= 1.0e+3
            ? supplyFormat.format((Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2)) + " K"
            // Negative value
            : Number(labelValue) < 0
            ? (Number(labelValue))
            : Math.abs(Number(labelValue));
    }

    // Mostrar valores de mercado de la moneda
    const displayMarket = () => {
        checkPte24h();
        checkPte7d();
        checkPte14d();
        checkPte30d();
        checkPte60d();
        checkPte200d();
        checkPte1y();
        checkChange24h();
        return (
            <div>
                <div
                    style={{
                        display: "flex",
                        marginTop: 20,
                        justifyContent: "space-around",
                        width: "100%",
                    }}
                    >
                    {currencyTable.map((currency) => (
                        <SelectButton
                            key={currency.label}
                            onClick={() => {
                                setDivisa(currency.label);
                                setSymbol(currency.symbol);
                                localStorage.clear();
                                localStorage.setItem('currency',divisa);
                            }}
                            selected={currency.label === divisa}
                            >
                            {currency.label.toUpperCase()}
                        </SelectButton>
                    ))}
                </div>
                <div className="row g-3 align-items-start">
                    <div className="col-sm mktdata-container">
                        <label className="label">
                            Rango: 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{coin.market_cap_rank}</span>
                    </div>
                    <div className="col-sm mktdata-container">
                        <label className="label">
                            Precio: 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{symbol}{coin.market_data.current_price[divisa].toLocaleString('en-US')}</span>
                    </div>
                </div>
                <div className="row g-3 align-items-start">
                    <div className="col-sm mktdata-container">
                        <label className="label">
                            Capitalización: 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{symbol}{convertToICS(coin.market_data.market_cap[divisa])}</span>
                    </div>
                    <div className="col-sm mktdata-container">
                        <label className="label">
                            Volumen total: 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{symbol}{convertToICS(coin.market_data.total_volume[divisa])}</span>
                    </div>
                </div>
                <div className="row g-3 align-items-start">
                    <div className="col-sm mktdata-container">
                        <label className="label">
                            Suministro total: 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{convertToICS(coin.market_data.total_supply)}</span>
                    </div>
                    <div className="col-sm mktdata-container">
                        <label className="label">
                            Suministro en circulación: 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{convertToICS(coin.market_data.circulating_supply)}</span>
                    </div>
                </div>
                <div className="row g-3 align-items-start">
                    <div className="col-sm mktdata-container">
                        <label className="label">
                            Máximo 24h: 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{symbol}{coin.market_data.high_24h[divisa].toLocaleString('en-US')}</span>
                    </div>
                    <div className="col-sm mktdata-container">
                        <label className="label">
                            Mínimo 24h: 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{symbol}{coin.market_data.low_24h[divisa].toLocaleString('en-US')}</span>
                    </div>
                </div>
                <div className="row g-3 align-items-start">
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Cambio en el precio (24h): 
                        </label>
                        <br></br>
                        <span className={`${isPositive[7] ? 'pte-success' : 'pte-danger'}`}>{symbol}{convertToICS(coin.market_data.price_change_24h_in_currency[divisa]).toLocaleString('en-US')}</span>
                    </div>
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Pte. cambio (24h):  
                        </label>
                        <br></br>
                        <span className={`${isPositive[0] ? 'pte-success' : 'pte-danger'}`}>{coin.market_data.price_change_percentage_24h_in_currency[divisa].toFixed(2)} % </span>
                    </div>
                </div>
                <div className="row g-3 align-items-start">
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Pte. cambio (7d): 
                        </label>
                        <br></br>
                        <span className={`${isPositive[1] ? 'pte-success' : 'pte-danger'}`}>{coin.market_data.price_change_percentage_7d_in_currency[divisa].toFixed(2)} %</span>
                    </div>
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Pte. cambio (14d): 
                        </label>
                        <br></br>
                        <span className={`${isPositive[2] ? 'pte-success' : 'pte-danger'}`}>{coin.market_data.price_change_percentage_14d_in_currency[divisa].toFixed(2)} %</span>
                    </div>
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Pte. cambio (30d): 
                        </label>
                        <br></br>
                        <span className={`${isPositive[3] ? 'pte-success' : 'pte-danger'}`}>{coin.market_data.price_change_percentage_30d_in_currency[divisa].toFixed(2)} %</span>
                    </div>
                </div>
                <div className="row g-3 align-items-start">                   
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Pte. cambio (60d): 
                        </label>
                        <br></br>
                        <span className={`${isPositive[4] ? 'pte-success' : 'pte-danger'}`}>{coin.market_data.price_change_percentage_60d_in_currency[divisa].toFixed(2)} %</span>
                    </div>
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Pte. cambio (200d): 
                        </label>
                        <br></br>
                        <span className={`${isPositive[5] ? 'pte-success' : 'pte-danger'}`}>{coin.market_data.price_change_percentage_200d_in_currency[divisa].toFixed(2)} %</span>
                    </div>
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Pte. cambio (1y): 
                        </label>
                        <br></br>
                        <span className={`${isPositive[6] ? 'pte-success' : 'pte-danger'}`}>{coin.market_data.price_change_percentage_1y_in_currency[divisa].toFixed(2)} %</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
        {loading === false ? (
            <div className="div-asset-container">
                <div className="asset-container">
                    <div className="sidebar_l">
                        <div className="title">
                            {displayTitle()}
                            {displayDescription()}
                            {displayMarket()}
                        </div>
                    </div>
                </div>
                <div className="chart-container">
                    <div className="sidebar_r">
                        <CoinChart coin={(coin)} />
                    </div>
                </div>
            </div>
        ) : (
            <Loading />
        )}
        </>
    )
}

export default Asset;