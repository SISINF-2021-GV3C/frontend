import React from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import CoinList from "./pages/CoinList";
//import Asset from "./pages/Asset";
import Profile from "./pages/Profile";
import NotFound from "./components/NotFound";
import Loading from "./components/Loader";
//import Compare from "./pages/CompareCoins";
//import Versus from "./pages/Versus";
import "./css/App.css";

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cryptoaholic</title>
        <link rel="canonical" href="" />
      </Helmet>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
