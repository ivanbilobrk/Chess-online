import { useRef, useState, useEffect } from "react";
import {Register} from '../components/Register'
import './register.css';
import HeaderUnsigned from '../components/HeaderSigned'

export default function RegisterPage(){


    return(
        <>
        <HeaderUnsigned/>
        <Register/>
        </>
    );

}

export { RegisterPage };