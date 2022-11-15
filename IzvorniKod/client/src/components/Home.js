import { color } from "@mui/system";
import { Link, Navigate } from "react-router-dom";
import './home.css';
import { useNavigate } from "react-router-dom";
import Footer from './Footer';
//novo dodajem

import 'react-calendar/dist/Calendar.css';


//zavrsetak najnovijeg

//novo dodavanje

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//kraj dodavanja

export default function Home(){
    const navigate = useNavigate();

    function handleClick(){
        navigate("/register");
    }

    //tu počinje js
    const [date, setDate] = useState(new Date());
    //tu završava js

    return(
        <>
        <div>
            <div className="banner-container">
                <div className="text-center">

                    <h1 className=" text-6xl"><blockquote><i>"Mnogi su postali šahovski majstori; nitko nije postao majstor šaha. "</i>- Siegbert Tarrasch</blockquote></h1>
                    <input type="button" className="registerButton" value="Dokaži suprotno!" onClick={handleClick}></input>
                </div>
            </div>
           
            <div className="tekst">
                <h4 className="paragraf">Aktivnosti u klubu</h4>
                <h6>Ako postaneš član šahovskog kluba AmostByte imat ćeš mogućnost razvijati svoje šahovske vještine uz naše profesionalne trenere u sklopu grupnih ili pak individualnih treninga. 
Također, svi oni natjecateljskog duha mogu sudjelovati u šahovskim turnirima, a za sve naše članove i one koji se jos premišljaju tu su i izazovne dnevne taktike koje samo čekaju biti riješene!</h6>

<br></br>
<h4 className="paragraf">Novosti</h4>
                <h6>Trenutno nema novih novosti.</h6>
<br></br>
<h4 className="paragraf">Kalendar</h4>
                <div className="app">
                     <br></br>
                    <div className="calendar-container">
                        <Calendar onChange={setDate} value={date} className={"kalendar"} />
                    </div>
                    <p className="text-center">
                    <h6><span className="bold">Odabrani datum:</span> {date.toDateString()}</h6>
                    </p>
                </div>
             <a className="profil" >   <Link to="/profile">Odi na svoj profil</Link> </a>
             <Footer/>
            
            </div>
        </div>
        </>
    );
};

export {Home}

