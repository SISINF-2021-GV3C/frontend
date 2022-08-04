import React, { useState, useEffect } from "react";
import axios from "axios";
import { Compare } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../css/compare.css";

function CompareCoins() {
    const [queryFirst, setQueryFirst] = useState('');
    const [querySecond, setQuerySecond] = useState('');

    return (
        <div className="compare-container">
            <h1>Compara dos monedas aquí</h1>
                <h2 className="body-text">
                    Introduce el nombre de dos monedas para obtener información<br></br> 
                    detallada de ellas junto con un gráfico del historial de mercado.
                </h2>
            <br></br>
            <div>                  
                <input
                id="search-first" 
                type="text" 
                className="search-box-top"
                placeholder="Busca la primera moneda..."
                value={queryFirst} 
                onChange={(e) => setQueryFirst(e.target.value)}
                autoComplete="off"
                />
            </div>
            <h3>vs</h3>
            <div>                  
                <input
                id="search-second" 
                type="text" 
                className="search-box-bottom"
                placeholder="Busca la segunda moneda..."
                value={querySecond} 
                onChange={(e) => setQuerySecond(e.target.value)}
                autoComplete="off"
                />
            </div>
            <br></br>
                <Link className="btn btn-compare-go" to="/compared-coins">
                    COMPARAR
                </Link>
        </div>    
    )
}

export default CompareCoins;