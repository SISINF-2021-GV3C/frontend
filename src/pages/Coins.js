import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import Loading from "../components/Loader"

const coinListUrl = "https://api.coingecko.com/api/v3/coins/list"


function Coins (props) {
    
    const [loading, setLoading] = useState(true)
    const [coin, setCoin] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    
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
        .slice(pagesVisited, pagesVisited + coinsPerPage)
        .map((coin) => {
            const { id, name, symbol } = coin; 
            return (
                <div key={id}>
                    <table className="table table-striped table-dark table-bordered table-hover align-middle">
                        <tbody>
                            <tr>
                                <th width="33%" scope="row">{id}</th>
                                <td width="33%">{name}</td>
                                <td width="33%">{symbol}</td>
                            </tr> 
                        </tbody>
                    </table>
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
                <h1>Crypto Prices</h1>
                <p></p>
                <table className="table table-striped table-dark table-bordered table-hover">
                    <thead>
                        <tr>
                        <th width="33%" scope="col">#</th>
                        <th width="33%" scope="col">Divisa</th>
                        <th width="33%" scope="col">Símbolo</th>
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