import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AboutTable from "../components/AboutTable";
import AboutText from "../components/AboutText";

export default function AboutPage(){
    return(
        <>
        <Header></Header>
        <h1>O projektu</h1>
        <AboutText></AboutText>
        <AboutTable></AboutTable>
        <Footer></Footer>
        </>
    );
};

export {AboutPage}