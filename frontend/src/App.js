import React from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./asset/css/user.css";
import "./asset/css/main.css";

import Main from "./Main";
import Header from "./component/Header";
import Footer from "./component/Footer";
import GuestLogin from "./pages/guest/login";
import SearchEmail from "./pages/guest/searchEmail";
import SearchPw from "./pages/guest/searchPw";
import HotelDetail from "./pages/host/HotelDetail";
import Account from "./pages/guest/Account";
import Pay from "./pages/guest/Pay";

// host 계정
import HostLogin from "./pages/host/login";
import SearchHostEmail from "./pages/host/searchEmail";
import SearchHostPw from "./pages/host/searchPw";

function App() {
  console.warn = function no_console() {};

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/guest/login" element={<GuestLogin />} />
          <Route path="/guest/searchEmail" element={<SearchEmail />} />
          <Route path="/guest/searchPw" element={<SearchPw />} />
          <Route path="/guest/Account" element={<Account />} />
          <Route path="/guest/Pay" element={<Pay />} />
          <Route
            path="/host/hotel/hotelDetail/:HoIdx"
            element={<HotelDetail />}
          />

          {/* host 계정 */}
          <Route path="/host/Login" element={<HostLogin />} />
          <Route path="/host/searchEmail" element={<SearchHostEmail />} />
          <Route path="/host/searchPw" element={<SearchHostPw />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
