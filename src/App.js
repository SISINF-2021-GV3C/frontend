import React from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CoinList from "./pages/CoinList";
import Asset from "./pages/Asset";
import Profile from "./pages/Profile";
import AdminProfile from "./pages/AdminProfile";
import NotFound from "./components/NotFound";
import Loading from "./components/Loader";
import Compare from "./pages/CompareCoins";
import Versus from "./pages/Versus";
import Management from "./pages/Management";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/UserManagement";
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
        <Route path="/coins" element={<CoinList />} />
        <Route path="/coins/:id" element={<Asset />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/compare/versus" element={<Versus />} />
        <Route path="/management" element={<Management />} />
        <Route
          path="/management/user-management"
          element={<UserManagement />}
        />
        <Route path="/management/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
