import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderUnsigned from "../components/HeaderUnsigned";
import HeaderSigned from "../components/HeaderSigned";

export default function HomePage(){
    return(
        <>
        <div>Ovo je home</div>
        <Link to="/profile">Odi na svoj profil</Link>
        </>
    );
};

export {HomePage}