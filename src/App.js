import { Route, Routes } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';

import Login from "./pages/Login"
import Register from "./pages/Register"
import Coins from "./pages/Coins"
import NotFound from './components/NotFound';
import Loading from './components/Loader';

const Home = () => <h1>Home</h1>

function App() {
  return (
    <>
      <Navbar />
      <div className='App-header'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
