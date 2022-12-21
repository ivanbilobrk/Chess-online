
import { Link, Navigate } from "react-router-dom";
import './home.css';
import { BiUser } from "react-icons/bi";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from '../hooks/useLogout';
import Footer from './Footer';

import { useEffect } from "react";
import axios from '../api/axios';
import News from "./News/News";
import AddNewsFormDialog from "./News/AddNews";
import DailyTactics from "./DailyTactics/DailyTactics";
//novo dodajem

import 'react-calendar/dist/Calendar.css';


//zavrsetak najnovijeg

//novo dodavanje

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AddDailyTacticsFormDialog from "./DailyTactics/AddDailyTactics";


//kraj dodavanja

export default function Home(){
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [userData, setUserData] = useState([]);
    const [dailyTactics, setDailyTactics] = useState([]);
    const [news, setNews] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    const logout = useLogout();
    const location = useLocation();
    const {auth} = useAuth();

    function handleClick(){
        navigate("/register");
    }
    const loadAllNews = async () => {
        try {
            const response = await axios.get('/news', 
                                {
                                    headers: {'Content-Type':'application/json'},
                                    withCredentials: true
                                });
            
            setNews(response.data.newsAll);
        } catch (err) {                                        
            console.error(err.response);
            
        }
    };
    const loadAllTactics = async () => {
        
        try {
            const response = await axios.get('/tactics', 
                                {
                                    headers: {'Content-Type':'application/json'},
                                    withCredentials: true
                                });
            
            setDailyTactics(response.data.tactics);
            console.log("loadAllTactics: ")
            console.log(response.data.tactics)
        } catch (err) {                                        
            console.error(err.response);
            
        }
    };


    //tu počinje js
    const [date, setDate] = useState(new Date());
    //tu završava js
    useEffect(() =>{
        let isMounted = true;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosPrivate.get(`/user`, {
                });
                isMounted && setUserData(response.data.podatci);
            } catch (err) {                      //na ovaj način ukoliko istekne refresh token cemo vratiti korisnika na login i postaviti u history trenutnu lokaciju kako bi se mogli vratiti nazad na ovo mjesto
                console.error(err);
            }
        }
        
        getData();
        
        loadAllNews();
        loadAllTactics();
        console.log(dailyTactics)
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    },[]);
    
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

<h4 className="paragraf paragraf-news">Novosti
        {(userData[5] == 'trener' || userData[5] == 'admin') ?
            <AddNewsFormDialog
                loadAllNews={loadAllNews}
                title = {title}
                content = {content}
                setTitle = {setTitle}
                setContent = {setContent}
                user = {userData}
            /> : <></>
        }
</h4>
    <div className="news">
        <News
            data={news}
            loadAllNews={loadAllNews}
            title = {title}
            content = {content}
            setTitle = {setTitle}
            setContent = {setContent}
            user = {userData}
        />
    </div>

<br></br>

<h4 className="paragraf paragraf-news">Dnevne taktike
        {(userData[5] == 'trener' || userData[5] == 'admin') ?
            <AddDailyTacticsFormDialog
                loadAllTactics= {loadAllTactics}
                title = {title}
                content = {content}
                setTitle = {setTitle}
                setContent = {setContent}
                user = {userData}
                /> : <></>
        }
</h4>
    <div className="news">
        <DailyTactics
            loadAllTactics= {loadAllTactics}
            data={dailyTactics}
            title = {title}
            content={content}
            setTitle = {setTitle}
            setContent={setContent}
            user = {userData}
        />
    </div>
    
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
             <a className="profil" >   <Link to="/profile" className="link">Odi na svoj profil <BiUser style={{marginBottom:-5, fontSize: 26}}/></Link> </a>
             <Footer/>
            
            </div>
        </div>
        </>
    );
};



