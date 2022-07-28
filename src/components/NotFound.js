import React from 'react';
import { Link } from "react-router-dom";
import "../css/App.css"

const NotFound = () => {
    return (
        <div className='App-header'>
            <h1>Error 404: Página no encontrada</h1>
            <div className="button-return">
                <Link to="/" className="btn btn-outline-light">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

export default NotFound;