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
import ReactDOM from "react";
import Layout from './components/Layout';
import Unauthorized from "./pages/Unauthorized";
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
   
        <Routes>

          <Route path ="/" element={<Layout/>}>

            <Route path="/" element = {<HomePage/>}></Route>
            <Route path="register" element = {<RegisterPage/>}></Route>
            <Route path="about" element = {<AboutPage/>}></Route>
            <Route path="login" element = {<LoginPage/>}></Route>
            <Route path="unauthorized" element={<Unauthorized />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={["user"]}/>}>
              <Route path ="profile" element ={<ProfilePage/>}></Route>
            </Route>
          </Route>

          </Route>

        </Routes>
  );
}

export default App;
