import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../data/CoinGecko_API";
import Loading from "../components/Loader";
import Collapsible from 'react-collapsible';
import "../css/asset.css"

function Asset () {
    
    // Constantes de manejo de datos
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const [loading, setLoading] = useState(true);
    const [descText, setDescText] = useState("Leer descripción");
    const [description, setDescription] = useState("");

    var isPositive = [];

    // Opciones de formato de número (USD)
    const options = { style: 'currency', currency: 'USD' };
    const numberFormat = new Intl.NumberFormat('en-US', options);
    const supplyFormat = new Intl.NumberFormat('en-US');

    // Descargar datos a través de la API de CoinGecko
    useEffect(() => {
        const fetchCoins = async () => {
            const { data } = await axios.get(SingleCoin(id))
            setCoin(data);
            setDescription(data.description.en);
        }; 
        fetchCoins();
        setTimeout(() => setLoading(false), 750);
    }, [id]); 

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

    // Mostrar la cabecera de la moneda
    const displayTitle = () => {
        return (
            <div className="crypto-title">
                <img className="crypto-image" src={coin.image.large} alt={coin.name} width="60px" />  
                | {coin.name} | 
                <span className="crypto-symbol">{(coin.symbol).toUpperCase()}</span>
            </div>
        )
    }

    // Mostrar la descripción de la moneda
    const displayDescription = () => {
        return (
            <div className="row">
            <div className="read-more-container">
                <Collapsible onTriggerOpening={openDescription} onTriggerClosing={closeDescription} trigger={descText}>
                    <p className="description-container">            
                        <div dangerouslySetInnerHTML={{ __html:description}}></div>
                    </p>
                </Collapsible>
            </div>
            </div>
        )
    }

    // Mostrar valores de mercado de la moneda
    const displayMarket = () => {
        return (
            <div>
                <div className="row align-items-start">
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
                        <span className="mktdata-prop">{numberFormat.format(coin.market_data.current_price.usd)}</span>
                    </div>
                </div>
                <div className="row align-items-start">
                    <div className="col-sm mktdata-container">
                        <label className="label">
                            Capitalización: 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{numberFormat.format(Math.trunc(coin.market_data.market_cap.usd)/1000000)} M</span>
                    </div>
                    <div className="col-sm mktdata-container">
                        <label className="label">
                            Volumen total: 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{numberFormat.format(Math.trunc(coin.market_data.total_volume.usd)/1000000)} M</span>
                    </div>
                </div>
                <div className="row align-items-start">
                    <div className="col-sm mktdata-container">
                        <label className="label">
                            Máximo 24h: 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{numberFormat.format(coin.market_data.high_24h.usd)}</span>
                    </div>
                    <div className="col-sm mktdata-container">
                        <label className="label">
                            Mínimo 24h: 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{numberFormat.format(coin.market_data.low_24h.usd)}</span>
                    </div>
                </div>
                <div className="row align-items-start">
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Cambio en el precio (24h): 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{numberFormat.format(coin.market_data.price_change_24h)}</span>
                    </div>
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Pte. cambio (24h):  
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{coin.market_data.price_change_percentage_24h} % </span>
                    </div>
                </div>
                <div className="row align-items-start">
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Pte. cambio (7d): 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{coin.market_data.price_change_percentage_7d} %</span>
                    </div>
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Pte. cambio (14d): 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{coin.market_data.price_change_percentage_14d} %</span>
                    </div>
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Pte. cambio (30d): 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{coin.market_data.price_change_percentage_30d} %</span>
                    </div>
                </div>
                <div className="row align-items-start">                   
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Pte. cambio (60d): 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{coin.market_data.price_change_percentage_60d} %</span>
                    </div>
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Pte. cambio (200d): 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{coin.market_data.price_change_percentage_200d} %</span>
                    </div>
                    <div className="col-sm mktdata-container-pte">
                        <label className="label">
                            Pte. cambio (1y): 
                        </label>
                        <br></br>
                        <span className="mktdata-prop">{coin.market_data.price_change_percentage_1y} %</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
        {loading === false ? (
            <div className="asset-container">
                <div className="sidebar">
                    <div className="title">
                        {displayTitle()}
                        {displayDescription()}
                        {displayMarket()}
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