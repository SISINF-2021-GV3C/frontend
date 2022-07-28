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

    // Monstrar el cuerpo de la moneda con su descripción y detalles
    const displayBody = () => {
        return (
            <div className="btn-read-more">
                <Collapsible onTriggerOpening={openDescription} onTriggerClosing={closeDescription} trigger={descText}>
                    <p className="description-container">            
                        <div dangerouslySetInnerHTML={{ __html:description}}></div>
                    </p>
                </Collapsible>
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
                        {displayBody()}
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