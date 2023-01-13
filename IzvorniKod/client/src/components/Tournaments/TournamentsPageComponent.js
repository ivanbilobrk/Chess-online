import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import Tournaments from "./Tournaments";
import { useState } from "react";
import { useEffect } from "react";
import AddTournaments from "./AddTournament";

export default function TournamentsPageComponent(){
    const [tournamentsData, setTournamentsData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [scheduledData, setScheduledData] = useState([]);
    const [trainersId, setTrainersId] = useState("");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState("");

    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();

    const loadAllTournaments = async () => {
        try {
            const response = await axiosPrivate.get('/tournaments', 
                                {
                                    headers: {'Content-Type':'application/json'},
                                    withCredentials: true
                                });
            setTournamentsData(response.data.tournamentsAll);
            console.log(response.data.tournamentsAll);
        } catch (err) {                                        
            console.error(err.response);
            
        }
        console.log(tournamentsData);
    };

    const loadAllScheduledTraining = async () => {
        try {
            const response = await axiosPrivate.get('/tournaments/scheduled', 
                                {
                                    headers: {'Content-Type':'application/json'},
                                    withCredentials: true
                                });
            setScheduledData(response.data.allUserTournaments);
            console.log(response.data.allUserTournaments);
        } catch (err) {                                        
            console.error(err.response);
            
        }
    };

    const handleAddTournaments = async (tId, start, duration) => {
        try {
            const response = await axiosPrivate.post('/tournaments/add', 
                JSON.stringify({ 
                                tournament:{
                                    trainerId: tId,
                                    tournamentStart: start,
                                    tournamentDuration: duration,
                                }
                                }),
                                {
                                    headers: {'Content-Type':'application/json'},
                                    withCredentials: true
                                });
        } catch (err) {                                        
            console.error(err.response);
        
        }
        loadAllTournaments();
    };

    const handleUpdateTournaments = async (tId, start, duration, showing, tournament_id, participants) => {
        try {
            const response = await axiosPrivate.post('/tournaments/update', 
                JSON.stringify({ 
                                tournament:{
                                    trainerId: tId,
                                    tournamentStart: start,
                                    tournamentDuration: duration,
                                    showing: showing,
                                    id: tournament_id,
                                    participantsNo: participants
                                }
                                }),
                                {
                                    headers: {'Content-Type':'application/json'},
                                    withCredentials: true
                                });
        } catch (err) {                                        
            console.error(err.response);
        
        }
        loadAllTournaments();
    };

    const handleDeleteTournaments = async (tId, start, duration, showing, tournament_id) => {
        try {
            const response = await axiosPrivate.post('/tournaments/delete', 
                JSON.stringify({ 
                                tournament:{
                                    trainerId: tId,
                                    tournamentStart: start,
                                    tournamentDuration: duration,
                                    showing: showing,
                                    id: tournament_id
                                }
                                }),
                                {
                                    headers: {'Content-Type':'application/json'},
                                    withCredentials: true
                                });
        } catch (err) {                                        
            console.error(err.response);
        
        }
        loadAllTournaments();
    };
    
    

    const handleScheduleTournaments = async (tId, start, duration, showing, id, participants) => {
        try {
            const response = await axiosPrivate.post('/tournaments/signup', 
                JSON.stringify({ 
                                tournament:{
                                    trainerId: tId,
                                    tournamentStart: start,
                                    tournamentDuration: duration,
                                    showing: showing,
                                    participantsNo: participants,
                                    id:id
                                }
                                }),
                                {
                                    headers: {'Content-Type':'application/json'},
                                    withCredentials: true
                                });
        } catch (err) {                                        
            console.error(err.response);
        
        }
        loadAllTournaments();
    };

    const handleCancelTournaments = async (tId, start, duration, showing, id, participants) => {
        try {
            const response = await axiosPrivate.post('/tournaments/cancel', 
                JSON.stringify({ 
                                tournament:{
                                    trainerId: tId,
                                    tournamentStart: start,
                                    tournamentDuration: duration,
                                    showing: showing,
                                    participantsNo: participants,
                                    id:id
                                }
                                }),
                                {
                                    headers: {'Content-Type':'application/json'},
                                    withCredentials: true
                                });
        } catch (err) {                                        
            console.error(err.response);
        
        }
        loadAllTournaments();
    };

    useEffect(() =>{
        let isMounted = true;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosPrivate.get(`/user/${auth.user}`, {
                });
                console.log(response.data)
                isMounted && setUserData(response.data.podatci);
            } catch (err) {                                         //na ovaj način ukoliko istekne refresh token cemo vratiti korisnika na login i postaviti u history trenutnu lokaciju kako bi se mogli vratiti nazad na ovo mjesto
                console.error(err);
                
            }
        }
        
        getData();
        loadAllTournaments();
        loadAllScheduledTraining();

        console.log(scheduledData);
        console.log(tournamentsData);
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    },[]);

    return(
        <>
        <h1>Svi turniri</h1>
    <div>Ovdje se nalaze svi turniri dostupni na našoj stranici. Klikom na pojedinačni turnir možete doznati više detalja o samom turniru.</div>
        {(userData[5] == 'trener' || userData[5] == 'admin') ?
        <>
        <div>Pritiskom na ovaj gumb možete dodavati nove turnire. <br/>
        <AddTournaments
            date = {date}
            duration = {duration}
            setDate = {setDate}
            setDuration = {setDuration}
            handleAddTournaments = {handleAddTournaments}
            user = {userData}
        />
        Ukoliko ste turnir dodali na stranicu, možete ga i ukloniti pritiskom na dugme u obliku slova X unutar detalja o turniru.</div>
        
        </>
        : <><div>Ovdje se možete prijaviti na turnir.<br/>
        Nakon što ste kliknuli na turnir kako bi dobili više informacija, označite gumb kako bi se prijavili na turnir. Ukoliko se želite odjaviti s turnira jednostavno maknite oznaku s gumba.
        </div></>}
        <Tournaments
            data={tournamentsData}
            trainersId = {trainersId}
            date = {date}
            duration = {duration}
            setTrainersId = {setTrainersId}
            setDate = {setDate}
            setDuration = {setDuration}
            handleScheduleTournaments = {handleScheduleTournaments}
            handleUpdateTournaments = {handleUpdateTournaments}
            handleDeleteTournaments = {handleDeleteTournaments}
            handleCancelTournaments = {handleCancelTournaments}
            scheduledData = {scheduledData}
            user = {userData}

            />
        </>
    );
}