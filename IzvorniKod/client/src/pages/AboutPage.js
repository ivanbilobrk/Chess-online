import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function AboutPage(){
    return(
        <>
        <Header></Header>
        <div>Ovo je about</div>
        <Footer></Footer>
        </>
    );
};

export {AboutPage}