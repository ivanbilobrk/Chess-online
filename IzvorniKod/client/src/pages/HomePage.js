import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function HomePage(){
    return(
        <>
        <Header></Header>
        <div>Ovo je home</div>
        <Link to="/profile">Odi na svoj profil</Link>
        <Footer></Footer>
        </>
    );
};

export {HomePage}