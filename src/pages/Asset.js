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
    const [description, setDescription] = useState("Leer descripción");

    // Descargar datos a través de la API de CoinGecko
    useEffect(() => {
        const fetchCoins = async () => {
            const { data } = await axios.get(SingleCoin(id))
            setCoin(data);
            console.log(data);
        }; 
        fetchCoins();
        setTimeout(() => setLoading(false), 750);
    }, [id]); 

    // Abrir la descripción
    const openDescription = () => {
        if (description === "Leer descripción") {
            setDescription("Cerrar descripción");
        } 
    }

    // Cerrar la descripción
    const closeDescription = () => {
        if (description === "Cerrar descripción") {
            setDescription("Leer descripción");
        } 
    }

    // Mostrar la cabecera de la moneda
    const displayTitle = () => {
        return (
            <div>
                <div className="row g-3">
                    <div className="col-sm col-sm_l">
                        <img src={coin.image.large} alt={coin.name} width="60px" />
                    </div>
                    <div className="col-sm crypto-name">
                        {coin.name}
                    </div>
                    <div className="col-sm col-sm_r crypto-symbol">
                        {(coin.symbol).toUpperCase()}
                    </div>
                </div>
            </div>
        )
    }

    // Monstrar el cuerpo de la moneda con su descripción y detalles
    const displayBody = () => {
        return (
            <div className="btn-read-more">
                <Collapsible onTriggerOpening={openDescription} onTriggerClosing={closeDescription} trigger={description}>
                    <p className="description-container">
                        {coin.description.en}
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