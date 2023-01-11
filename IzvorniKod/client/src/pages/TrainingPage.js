import React from "react";
import HeaderSigned from "../components/HeaderSigned";
import Footer from "../components/Footer";
import TrainingPageComponent from "../components/Training/TrainingPageComponent";

export default function TrainingPage(){
    return(
        <>
        <HeaderSigned></HeaderSigned>
        <TrainingPageComponent></TrainingPageComponent>
        <Footer/>
        </>
    )
}