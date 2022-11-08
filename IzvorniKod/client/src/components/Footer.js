import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"


const Footer = () =>{
    const year = new Date().getFullYear();
    return <footer className="footer">
        <div className="container">
           <div className="child">Šahisti</div>
           <Link className="child links" to="/about">AlmostByte</Link>
           <div className="child">FER 2022/2023</div>
        </div>
        
    </footer>
}

export default Footer;