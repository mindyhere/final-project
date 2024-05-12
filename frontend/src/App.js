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
import HostPage from "./pages/host/HostPage";
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
import Order from "./pages/guest/Order";
import Coupon from "./pages/guest/coupon";
import LastReservItem from "./pages/guest/lastReservItem";
import PreReservItem from "./pages/guest/preReservItem";
import LastReservDetail from "./pages/guest/lastReservDetail";
import ReservRevItem from "./pages/guest/reservRevItem";
import PreReservDetail from "./pages/guest/preReservDetail";
import CancelReserv from "./pages/guest/cancelReserv";
import UpdateReserv from "./pages/guest/updateReserv";

// admin 계정
import Amain from "./pages/admin/amain";
import AdminLogin from "./pages/admin/alogin";
import Ahost from "./pages/admin/ahost";
import NoticeList from "./pages/admin/notice/alist";
import Awrite from "./pages/admin/notice/awrite";

// host 계정
import HostLogin from "./pages/host/login/Login";
import SearchHostEmail from "./pages/host/login/SearchEmail";
import SearchHostPw from "./pages/host/login/SearchPw";
import HostAccount from "./pages/host/hostAccount/HostAccount";
import EditHostInfo from "./pages/host/hostAccount/EditHostInfo";
import MyHotelList from "./pages/host/MyHotelList";

import WriteReview from "./pages/guest/WriteReview";

import WriteReply from "./pages/host/hostAccount/WriteReply";

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
          <Route path="/host/hotel/hostPage/:HIdx" element={<HostPage />} />
          <Route path="/guest/GuestInfo" element={<GuestInfo />} />
          <Route path="/guest/PayItem" element={<PayItem />} />
          <Route path="/guest/wishItem" element={<WishItem />} />
          <Route path="/guest/wishList" element={<WishList />} />
          <Route path="/guest/wish" element={<Wish />} />
          <Route path="/guest/recent" element={<Recent />} />
          <Route path="/guest/recentItem" element={<RecentItem />} />
          <Route path="/guest/reservation" element={<Reservation />} />
          <Route path="/guest/Order" element={<Order />} />
          <Route path="/guest/coupon" element={<Coupon />} />
          <Route path="/guest/preReservItem" element={<PreReservItem />} />
          <Route path="/guest/lastReservItem" element={<LastReservItem />} />
          <Route
            path="/guest/lastReservDetail/:OIdx"
            element={<LastReservDetail />}
          />
          <Route
            path="/guest/preReservDetail/:OIdx"
            element={<PreReservDetail />}
          />
          <Route path="/guest/reservRevItem" element={<ReservRevItem />} />
          <Route path="/guest/cancelReserv/:OIdx" element={<CancelReserv />} />
          <Route path="/guest/updateReserv/:OIdx" element={<UpdateReserv />} />

          {/* admin 계정 */}
          <Route path="/admin/amain" element={<Amain />} />
          <Route path="/admin/alogin" element={<AdminLogin />} />
          <Route path="/admin/ahost" element={<Ahost />} />
          <Route path="/admin/notice/alist" element={<NoticeList />} />
          <Route path="/admin/notice/awrite" element={<Awrite />} />

          {/* host 계정 */}
          <Route path="/host/login" element={<HostLogin />} />
          <Route path="/host/searchEmail" element={<SearchHostEmail />} />
          <Route path="/host/searchPw" element={<SearchHostPw />} />
          <Route path="/api/host/account/:userIdx" element={<HostAccount />} />
          <Route path="/host/edit/:userIdx" element={<EditHostInfo />} />
          <Route path="/host/hotel/MyHotelList" element={<MyHotelList />} />

          <Route path="/guest/write" element={<WriteReview />} />

          <Route
            path="/host/account/manage/review"
            element={<WriteReply />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
