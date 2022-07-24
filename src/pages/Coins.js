import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Loading from "../components/Loader"
import { FaAngleDoubleUp, FaPlus } from "react-icons/fa";

const coinListUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"

function Coins () {
    
    const coinsPerPage = 20;
    const [loading, setLoading] = useState(true);
    const [coin, setCoin] = useState([]);
    const [paginate, setPaginate] = useState(coinsPerPage);
    const [query, setQuery] = useState('');
    
    var isPositive = [];

    useEffect(() => {
        const fetchCoins = async () => {
            const { data } = await axios.get(coinListUrl)
            setCoin(data);
          }; 
        fetchCoins();
        setTimeout(() => setLoading(false), 1500)
    }, []);

    const loadMore = () => {
        setPaginate((prevValue) => prevValue + coinsPerPage);
    };

    const scrollToTop = () => {
        const element = document.getElementById("top-index");
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    };

    const displayCoins = coin
        .filter((value) => { 
            if(query === ""){
                return value;
            } else if (
                value.name.toLowerCase().includes(query.toLocaleLowerCase()) ||
                value.symbol.toLowerCase().includes(query.toLocaleLowerCase())
            ) {
                return value;
            }
        })
        .slice(0,paginate)
        .map((coin) => {
            const { id, 
                    symbol, 
                    name, 
                    image, 
                    current_price, 
                    market_cap,  
                    total_volume, 
                    price_change_percentage_24h,
                    circulating_supply 
            } = coin;
            // Comprobar porcentaje negativo o positivo para aplicar CSS
            if(coin.price_change_percentage_24h > 0){
                let valor = true
                isPositive.push(valor)
            }
            else{
                let valor = false
                isPositive.push(valor)
            }
            return (
                <div key={id}>
                    <Link className="link-deco" to={`/coins/${symbol}`}>
                    <table className="table table-striped table-dark table-bordered table-hover align-middle">
                        <tbody>
                            <tr>
                                    <th width="20%" scope="row">
                                        <img src={image} alt={name} width="30px"/>
                                        <br></br>
                                        <span width="30%">{name}</span>
                                        <br></br>
                                        <span className="symbol-crypto">{symbol.toUpperCase()}</span>
                                    </th>
                                    <td className="table-alignment" width="15%">${current_price.toLocaleString()}</td>
                                    <td className="table-alignment" width="20%">${Math.trunc(market_cap/1000000).toLocaleString()} M</td>
                                    <td className={`table-alignment ${isPositive.pop() ? 'text-success' : 'text-danger'}`} width="15%">{price_change_percentage_24h} %</td>
                                    <td className="table-alignment" width="15%">${Math.trunc(total_volume/1000000).toLocaleString()} M</td>
                                    <td className="table-alignment" width="15%">{Math.trunc(circulating_supply/1000000).toLocaleString()} M</td>
                            </tr> 
                        </tbody>
                    </table>
                    </Link>
                </div>
            )
        })


    return (
        <>
        {loading === false ? (
            <div className="ui grid container">
                <div id="top-index" className="top-index">
                    <h1>Crypto Prices</h1>
                    <p></p>
                    <div>                  
                        <input
                        id="search" 
                        type="text" 
                        className="search-box" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)}
                        autoComplete="off"
                        />
                    </div>
                </div>
                <br></br>
                <table className="table table-striped table-dark table-bordered align-middle">
                    <thead>
                        <tr>
                        <th width="20%" scope="col">Moneda</th>
                        <th className="table-alignment" width="15%" scope="col">Precio</th>
                        <th className="table-alignment" width="20%" scope="col">Capitalización</th>
                        <th className="table-alignment" width="15%" scope="col">Cambio 24h</th>
                        <th className="table-alignment" width="15%" scope="col">Volumen total</th>
                        <th className="table-alignment" width="15%" scope="col">Suministro</th>
                        </tr>
                    </thead>
                </table>
                {displayCoins}
                {paginate < coin?.length && (
                    <button type="button" 
                            className="btn btn-warn"
                            onClick={loadMore}
                    >
                        <FaPlus />
                    </button>
                )}
                <p></p>
                <button type="button" 
                        className="btn btn-warn-top"
                        onClick={scrollToTop}
                >
                    <FaAngleDoubleUp />
                </button>
            </div>
        ) : (
            <Loading />
        )}
        </>
    );
}

export default Coins