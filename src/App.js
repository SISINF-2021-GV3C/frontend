import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from "./pages/Login";
import Register from "./pages/Register";
import CoinList from "./pages/CoinList";
import Asset from "./pages/Asset";
import Profile from "./pages/Profile";
import NotFound from './components/NotFound';
import Loading from './components/Loader';
import './css/App.css';

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coins" element={<CoinList />} />
          <Route path="/coins/:id" element={<Asset />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;
