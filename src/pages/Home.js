import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/home.css";

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="title">¡Bienvenido/a a Cryptoaholic!</h1>
            <p></p>
            <h1 className="header">
                Sé el primero/a en enterarte de las <p></p>
                noticias de criptomonedas
                <strong className="strong-text"> cada día</strong>.
            </h1>
            <p className="mid-line"></p>
            <h2 className="header-two">
                Cryptoaholic es una app sencilla y minimalista, <p></p>
                diseñada para facilitarte todo tipo de información <p></p>
                de forma 
                    <strong className="word-clara"> clara </strong>, 
                    <strong className="word-concisa"> concisa </strong>y 
                    <strong className="word-bonita"> bonita </strong>.
            </h2>
            <p></p>
            <Link to="/coins">
                <button type="button" 
                        className="btn btn-explore"
                >
                    Comenzar a explorar <FaArrowRight />  
                </button>
            </Link>
        </div>
    )
}

export default Home;