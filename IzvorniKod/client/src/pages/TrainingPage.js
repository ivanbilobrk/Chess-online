import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderSigned from "../components/HeaderSigned";
import AboutTable from "../components/AboutTable";
import AboutText from "../components/AboutText";
import TrainingElement from "../components/TrainingElement";
import TrainingPageComponent from "../components/TrainingPageComponent";

export default function TrainingPage(){
    return(
        <>
        <HeaderSigned/>
        <TrainingPageComponent></TrainingPageComponent>
        <Footer/>
        </>
    );
};

export {TrainingPage}