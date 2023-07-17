import './App.css';
import Navbar from './components/header/Navbar.js';
import Newnav from './components/newnavbar/Newnav';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import Signin from './components/signup_signin/Signin';
import Signup from './components/signup_signin/Signup';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Cart from './components/cart/Cart.js';
import Buynow from './components/buynow/Buynow';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 1000)
  }, [data])

  return (
    <>
      {
        data ? <><Newnav />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Maincomp />} />
              <Route path="/login" element={<Signin />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/getproductsone/:id" element={<Cart />} />
              <Route path="/buynow" element={<Buynow />} />
            </Routes>
          </BrowserRouter>
          <Footer /></> : <div className='circle'>
             <CircularProgress/>
             <h2>Loading</h2>
        </div>
      }

    </>
  );
}

export default App;
