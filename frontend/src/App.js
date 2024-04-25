import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './asset/css/user.css';

import Main from "./Main";
import Header from './component/Header';
import GuestLogin from "./pages/guest/login";
import HotelDetail from "./pages/host/HotelDetail";


function App() {
  console.warn = function no_console() {};

  return (
    <>
    <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/guest/login" element={<GuestLogin/>}/>
          <Route path="/host/hotel/hotelDetail" element={<HotelDetail/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;