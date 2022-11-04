import { Link } from "react-router-dom";

export default function HomePage(){
    return(
        <>
        <div>Ovo je home</div>
        <Link to="/profile">Odi na svoj profil</Link>
        </>
    );
};

export {HomePage}