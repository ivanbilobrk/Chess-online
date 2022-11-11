import { color } from "@mui/system";
import { Link, Navigate } from "react-router-dom";
import './home.css';
import { useNavigate } from "react-router-dom";

//novo dodavanje

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//kraj dodavanja

export default function HomePage(){
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
                <h3 className="paragraf">Aktivnosti</h3>
                <p >Izazovne dnevne taktike, individualni i grupni treninzi s licenciranim trenerima te još mnoštvo toga...</p>


                <div className='app'>
                    <h1 className='text-center'>React Calendar</h1>
                    <div className='calendar-container'>
                        <Calendar onChange={setDate} value={date} />
                    </div>
                    <p className='text-center'>
                    <span className='bold'>Selected Date:</span>{' '}
                            {date.toDateString()}
                    </p>
                </div>  



    
            </div>

        </div>
        <Link to="/profile">Odi na svoj profil</Link>
        </>
    );
};

export {HomePage}

