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
import GuestInfo from "./pages/guest/GuestInfo";
import PayItem from "./pages/guest/PayItem";

// host 계정
import HostLogin from "./pages/host/Login";
import SearchHostEmail from "./pages/host/SearchEmail";
import SearchHostPw from "./pages/host/SearchPw";


function App() {
  console.warn = function no_console() {};

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/guest/login" element={<GuestLogin/>}/>
          <Route path="/guest/searchEmail" element={<SearchEmail/>}/>
          <Route path="/guest/searchPw" element={<SearchPw/>}/>
          <Route path="/guest/Account" element={<Account/>}/>
          <Route path="/guest/Pay" element={<Pay/>}/>
          <Route path="/host/hotel/hotelDetail/:HoIdx" element={<HotelDetail/>}/>
          <Route path="/guest/GuestInfo" element={<GuestInfo/>}/>
          <Route path="/guest/PayItem" element={<PayItem/>}/>
         
          {/* host 계정 */}
          <Route path="/host/Login" element={<HostLogin />} />
          <Route path="/host/SearchEmail" element={<SearchHostEmail />} />
          <Route path="/host/SearchPw" element={<SearchHostPw />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
