import { useRef, useState, useEffect } from "react";
import {Register} from '../components/Register'
import './register.css';
import HeaderUnsigned from '../components/HeaderSigned'
import Footer from "../components/Footer";

export default function RegisterPage(){


    return(
        <>
        <HeaderUnsigned/>
        <Register/>
        <Footer/>
        </>
    );

}

export { RegisterPage };