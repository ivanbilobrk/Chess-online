import logo from "./logo.svg";
import "./App.css";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { AboutPage } from "./pages/AboutPage";
import {AuthProvider} from './context/AuthProvider';
import {ProfilePage} from './pages/ProfilePage'
import RequireAuth from "./components/RequireAuth";
import Layout from './components/Layout';
import Unauthorized from "./pages/Unauthorized";
import PersistLogin from "./components/PersistLogin";
import BlockAuth from './components/BlockAuth';
import {EditPage} from './pages/EditPage'
import AllMembers from "./components/AllMembers"
import Transakcije from "./components/Transakcije"
import Banned from "./components/Banned"
import PayMembership from "./components/PayMembership"
import TrainingPage from "./pages/TrainingPage";
import TournamentsPage from "./pages/TournamentsPage";
function App() {
  return (
   
        <Routes>

          <Route path ="/" element={<Layout/>}>

            <Route path="/" element = {<HomePage/>}></Route>

            <Route path ="edit" element ={<EditPage/>}></Route>
            <Route path ="members" element ={<AllMembers/>}></Route>
            <Route path ="transactions" element ={<Transakcije/>}></Route>
            <Route path ="banned" element ={<Banned/>}></Route>
            <Route path ="payMembership" element ={<PayMembership/>}></Route>

          <Route element={<BlockAuth/>}>
            <Route path="register" element = {<RegisterPage/>}></Route>
            <Route path="login" element = {<LoginPage/>}></Route>
            </Route>
            <Route path="about" element = {<AboutPage/>}></Route>
           
            <Route path="unauthorized" element={<Unauthorized />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={["user", "admin", "trener"]}/>}>
              <Route path ="profile" element ={<ProfilePage/>}></Route>
              <Route path="training" element ={<TrainingPage/>}></Route>
              <Route path="tournaments" element ={<TournamentsPage/>}></Route>
            </Route>
          </Route>


          

          </Route>

        </Routes>
  );
}

export default App;
