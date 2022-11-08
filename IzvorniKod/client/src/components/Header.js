import * as React from 'react';
import { Link } from "react-router-dom";
import "./Header.css"


const Header = () =>{
    return <header className="header">
        <div className="container">
           <Link className="child linksH" to="/login">Prijava u sustav</Link>
           <Link className="child linksH title" to="/">ŠAHISTI</Link>
           <Link className="child linksH" to="/profile">Osobni podaci</Link>
        </div>
    </header>
}

export default Header;