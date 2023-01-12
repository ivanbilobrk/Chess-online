import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import Tournaments from "./Tournaments";
import { useState } from "react";
import { useEffect } from "react";

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

    const handleScheduleTournaments = async (tId, start, duration, showing, id, participants) => {
        try {
            const response = await axiosPrivate.post('/tournaments/', 
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
        <Tournaments
            data={tournamentsData}
            trainersId = {trainersId}
            date = {date}
            duration = {duration}
            setTrainersId = {setTrainersId}
            setDate = {setDate}
            setDuration = {setDuration}
            handleScheduleTraining = {handleScheduleTournaments}
            scheduledData = {scheduledData}
            user = {userData}

            />
        </>
    );
}