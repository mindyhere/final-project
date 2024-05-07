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
import WishItem from "./pages/guest/wishItem";
import WishList from "./pages/guest/wishList";
import Wish from "./pages/guest/wish";
import Recent from "./pages/guest/recent";
import RecentItem from "./pages/guest/recentItem";
import Reservation from "./pages/guest/reservation";

// host 계정
import HostLogin from "./pages/host/Login";
import SearchHostEmail from "./pages/host/SearchEmail";
import SearchHostPw from "./pages/host/SearchPw";
import HostAccount from "./pages/host/HostAccount";
import EditHostInfo from "./pages/host/EditHostInfo";

//review test 
import Reputation from "./hotelDetailSection/Reputation";


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
          <Route path="/guest/wishItem" element={<WishItem/>}/>
          <Route path="/guest/wishList" element={<WishList/>}/>
          <Route path="/guest/wish" element={<Wish/>}/>
          <Route path="/guest/recent" element={<Recent/>}/>
          <Route path="/guest/recentItem" element={<RecentItem/>}/>
          <Route path="/guest/reservation" element={<Reservation/>}/>
         
          {/* host 계정 */}
          <Route path="/host/login" element={<HostLogin />} />
          <Route path="/host/searchEmail" element={<SearchHostEmail />} />
          <Route path="/host/searchPw" element={<SearchHostPw />} />
          <Route path="/api/host/account/:userIdx" element={<HostAccount />} />
          <Route path="/host/edit/:userIdx" element={<EditHostInfo />} />

          {/* review test */}
          <Route path="/host/edit/:userIdx" element={<EditHostInfo />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
