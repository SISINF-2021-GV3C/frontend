import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Loading from "../components/Loader"
import { FaAngleDoubleUp, FaPlus } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";

const coinListUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"

function Coins () {
    
    const coinsPerPage = 20;
    const [loading, setLoading] = useState(true);
    const [coin, setCoin] = useState([]);
    const [paginate, setPaginate] = useState(coinsPerPage);
    const [query, setQuery] = useState('');
    var isPositive = [];

    // Constantes de dirección del orden en la tabla
    const [directionName, setDirectionName] = useState("ASC");
    const [directionPrice, setDirectionPrice] = useState("ASC");
    const [directionCap, setDirectionCap] = useState("ASC");
    const [directionChange, setDirectionChange] = useState("ASC");
    const [directionVol, setDirectionVol] = useState("ASC");
    const [directionSupply, setDirectionSupply] = useState("ASC");

    // Constantes de iconos del orden en la tabla
    const [iconName, setIconName] = useState(faSort);
    const [iconPrice, setIconPrice] = useState(faSort);
    const [iconCap, setIconCap] = useState(faSortDown);
    const [iconChange, setIconChange] = useState(faSort);
    const [iconVol, setIconVol] = useState(faSort);
    const [iconSupply, setIconSupply] = useState(faSort);

    // Opciones de formato de número
    const options = { style: 'currency', currency: 'USD' };
    const numberFormat = new Intl.NumberFormat('en-US', options);
    const supplyFormat = new Intl.NumberFormat('en-US');

    useEffect(() => {
        const fetchCoins = async () => {
            const { data } = await axios.get(coinListUrl)
            setCoin(data);
          }; 
        fetchCoins();
        setTimeout(() => setLoading(false), 1500)
    }, []);

    // Botón para cargar más monedas
    const loadMore = () => {
        setPaginate((prevValue) => prevValue + coinsPerPage);
    };

    // Botón para volver al principio de la página
    const scrollToTop = () => {
        const element = document.getElementById("top-index");
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    };

    // Ordenar por nombre
    const sortByName = () => {
        if (directionName === "ASC") {
            setCoin(coin.sort((a, b) => 
                a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
            ));
            setIconName(faSortUp);
            setDirectionName("DESC");
        } else if (directionName === "DESC") {
            setCoin(coin.sort((a, b) => 
                a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
            ));
            setIconName(faSortDown);
            setDirectionName("ASC");
        } else { return coin; }

        // Resetear los iconos y direcciones de las columnas restantes
        setDirectionPrice("ASC");
        setIconPrice(faSort);
        setDirectionCap("ASC");
        setIconCap(faSort);
        setDirectionChange("ASC");
        setIconChange(faSort);
        setDirectionVol("ASC");
        setIconVol(faSort);
        setDirectionSupply("ASC");
        setIconSupply(faSort);
    };

    // Ordenar por precio
    const sortByPrice = () => {
        if (directionPrice === "ASC") {
            setCoin(coin.sort((a, b) => {
                return a.current_price - b.current_price;
            }));
            setIconPrice(faSortUp);
            setDirectionPrice("DESC");
        } else if (directionPrice === "DESC") {
            setCoin(coin.sort((a, b) => {
                return b.current_price - a.current_price;
            }));
            setIconPrice(faSortDown);
            setDirectionPrice("ASC");
        } else { return coin; }

        // Resetear los iconos y direcciones de las columnas restantes
        setDirectionName("ASC");
        setIconName(faSort);
        setDirectionCap("ASC");
        setIconCap(faSort);
        setDirectionChange("ASC");
        setIconChange(faSort);
        setDirectionVol("ASC");
        setIconVol(faSort);
        setDirectionSupply("ASC");
        setIconSupply(faSort);
    }    

    // Ordenar por capitalización
    const sortByCap = () => {
        if (directionCap === "ASC") {
            setCoin(coin.sort((a, b) => {
                return a.market_cap - b.market_cap;
            }));
            setIconCap(faSortUp);
            setDirectionCap("DESC");
        } else if (directionCap === "DESC") {
            setCoin(coin.sort((a, b) => {
                return b.market_cap - a.market_cap;
            }));
            setIconCap(faSortDown);
            setDirectionCap("ASC");
        } else { return coin; }

        // Resetear los iconos y direcciones de las columnas restantes
        setDirectionName("ASC");
        setIconName(faSort);
        setDirectionPrice("ASC");
        setIconPrice(faSort);
        setDirectionChange("ASC");
        setIconChange(faSort);
        setDirectionVol("ASC");
        setIconVol(faSort);
        setDirectionSupply("ASC");
        setIconSupply(faSort);
    } 

    // Ordenar por cambio en 24h
    const sortByChange = () => {
        if (directionChange === "ASC") {
            setCoin(coin.sort((a, b) => {
                return a.price_change_percentage_24h - b.price_change_percentage_24h;
            }));
            setIconChange(faSortUp);
            setDirectionChange("DESC");
        } else if (directionChange === "DESC") {
            setCoin(coin.sort((a, b) => {
                return b.price_change_percentage_24h - a.price_change_percentage_24h;
            }));
            setIconChange(faSortDown);
            setDirectionChange("ASC");
        } else { return coin }

        // Resetear los iconos y direcciones de las columnas restantes
        setDirectionName("ASC");
        setIconName(faSort);
        setDirectionPrice("ASC");
        setIconPrice(faSort);
        setDirectionCap("ASC");
        setIconCap(faSort);
        setDirectionVol("ASC");
        setIconVol(faSort);
        setDirectionSupply("ASC");
        setIconSupply(faSort);
    } 

    // Ordenar por volumen total
    const sortByVolume = () => {
        if (directionVol === "ASC") {
            setCoin(coin.sort((a, b) => {
                return a.total_volume - b.total_volume;
            }));
            setIconVol(faSortUp);
            setDirectionVol("DESC");
        } else if (directionVol === "DESC") {
            setCoin(coin.sort((a, b) => {
                return b.total_volume - a.total_volume;
            }));
            setIconVol(faSortDown);
            setDirectionVol("ASC");
        } else { return coin }

        // Resetear los iconos y direcciones de las columnas restantes
        setDirectionName("ASC");
        setIconName(faSort);
        setDirectionPrice("ASC");
        setIconPrice(faSort);
        setDirectionCap("ASC");
        setIconCap(faSort);
        setDirectionChange("ASC");
        setIconChange(faSort);
        setDirectionSupply("ASC");
        setIconSupply(faSort);
    } 

    // Ordenar por suminstro
    const sortBySupply = () => {
        if (directionSupply === "ASC") {
            setCoin(coin.sort((a, b) => {
                return a.circulating_supply - b.circulating_supply;
            }));
            setIconSupply(faSortUp);
            setDirectionSupply("DESC");
        } else if (directionSupply === "DESC") {
            setCoin(coin.sort((a, b) => {
                return b.circulating_supply - a.circulating_supply;
            }));
            setIconSupply(faSortDown);
            setDirectionSupply("ASC");
        } else { return coin }

        // Resetear los iconos y direcciones de las columnas restantes
        setDirectionName("ASC");
        setIconName(faSort);
        setDirectionPrice("ASC");
        setIconPrice(faSort);
        setDirectionCap("ASC");
        setIconCap(faSort);
        setDirectionChange("ASC");
        setIconChange(faSort);
        setDirectionVol("ASC");
        setIconVol(faSort);
    } 

    // Mostrar cabecera
    const displayHeader = () => {
        return (
            <table className="table table-striped table-dark table-bordered align-middle">
                <thead>
                    <tr>
                    <th onClick={sortByName} width="20%" scope="col">Moneda
                        <FontAwesomeIcon className="sort" icon={iconName} />
                    </th>
                    <th onClick={sortByPrice} className="table-alignment" width="15%" scope="col">Precio
                        <FontAwesomeIcon className="sort" icon={iconPrice} />
                    </th>
                    <th onClick={sortByCap} className="table-alignment" width="20%" scope="col">Capitalización
                        <FontAwesomeIcon className="sort" icon={iconCap} />
                    </th>
                    <th onClick={sortByChange} className="table-alignment" width="15%" scope="col">Cambio 24h
                        <FontAwesomeIcon className="sort" icon={iconChange} />
                    </th>
                    <th onClick={sortByVolume} className="table-alignment" width="15%" scope="col">Volumen total
                        <FontAwesomeIcon className="sort" icon={iconVol} />
                    </th>
                    <th onClick={sortBySupply} className="table-alignment" width="15%" scope="col">Suministro
                        <FontAwesomeIcon className="sort" icon={iconSupply} />
                    </th>
                    </tr>
                </thead>
            </table>
        )
    }

    // Mostrar monedas
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
            if(price_change_percentage_24h > 0){
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
                                    <td className="table-alignment" width="15%">{numberFormat.format(current_price)}</td>
                                    <td className="table-alignment" width="20%">{numberFormat.format(Math.trunc(market_cap/1000000))} M</td>
                                    <td className={`table-alignment ${isPositive.pop() ? 'text-success' : 'text-danger'}`} width="15%">{price_change_percentage_24h} %</td>
                                    <td className="table-alignment" width="15%">{numberFormat.format(Math.trunc(total_volume/1000000))} M</td>
                                    <td className="table-alignment" width="15%">{supplyFormat.format(Math.trunc(circulating_supply)/1000000)} M</td>
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
                {displayHeader ()}
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