import React from "react";
import TournamentsPageComponent from "../components/Tournaments/TournamentsPageComponent";
import Footer from "../components/Footer";
import HeaderSigned from "../components/HeaderSigned";

export default function(){
    return(
    <>
    <HeaderSigned/>
    <TournamentsPageComponent/>
    <Footer/>
    </>)
}