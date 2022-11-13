import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderSigned from "../components/HeaderSigned";
import AboutTable from "../components/AboutTable";
import AboutText from "../components/AboutText";

export default function AboutPage(){
    return(
        <>
        <HeaderSigned/>
        <h1>O projektu</h1>
        <AboutText></AboutText>
        <AboutTable></AboutTable>
        </>
    );
};

export {AboutPage}