import { Route, Routes } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';

import Login from "./pages/Login"
import Register from "./pages/Register"

const Home = () => <h1>Home</h1>

function App() {
  return (
    <>
      <Navbar />
      <div className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
