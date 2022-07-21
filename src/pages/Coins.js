import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom"
import Loading from "../components/Loader"

const coinListUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"


function Coins (props) {
    
    const [loading, setLoading] = useState(true);
    const [coin, setCoin] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [filter, setFilter] = useState('');
    
    var isPositive = [];
    const coinsPerPage = 20;
    const pagesVisited = pageNumber * coinsPerPage;

    useEffect(() => {
        const fetchCoins = async () => {
            const { data } = await axios.get(coinListUrl)
            setCoin(data);
          }; 
        fetchCoins();
        setTimeout(() => setLoading(false), 2000)
    }, []);

    const displayCoins = coin
        .filter((value) => { 
            if(filter === ""){
                return value;
            } else if (
                value.name.toLowerCase().includes(filter.toLocaleLowerCase()) ||
                value.symbol.toLowerCase().includes(filter.toLocaleLowerCase())
            ) {
                return value;
            }
        })
        .slice(pagesVisited, pagesVisited + coinsPerPage)
        .map((coin) => {
            const { id, 
                    symbol, 
                    name, 
                    image, 
                    current_price, 
                    market_cap, 
                    market_cap_rank, 
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

    const pageCount = Math.ceil(coin.length / coinsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    return (
        <>
        {loading === false ? (
            <div className="ui grid container">
                <div className="top-index">
                    <h1>Crypto Prices</h1>
                    <p></p>
                    <div>                  
                        <input
                        id="search" 
                        type="text" 
                        className="search-box" 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
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
                <br></br>
                <div className="pagination-grid">
                    <ReactPaginate
                    previousLabel={"<<<"}
                    nextLabel={">>>"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                    />
                </div>
            </div>
        ) : (
            <Loading />
        )}
        </>
    );
}

export default Coins