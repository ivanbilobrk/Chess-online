import React from "react";
import { useEffect } from "react";
import { useState } from 'react';

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import Training from "./Training";
import useAuth from "../../hooks/useAuth";
import AddTraining from "./AddTraining";

export default function TrainingPageComponent(){

const [trainingData, setData] = useState([]);
const [userData, setUserData] = useState([]);
const [scheduledData, setScheduledData] = useState([]);
const [trainersId, setTrainersId] = useState("");
const [date, setDate] = useState("");
const [duration, setDuration] = useState("");


const axiosPrivate = useAxiosPrivate();
const {auth} = useAuth();

const loadAllTraining = async () => {
    try {
        const response = await axiosPrivate.get('/training', 
                            {
                                headers: {'Content-Type':'application/json'},
                                withCredentials: true
                            });
        setData(response.data.trainingsAll);
        console.log(response.data.trainingsAll);
    } catch (err) {                                        
        console.error(err.response);
        
    }
    console.log(trainingData);
};

const loadAllScheduledTraining = async () => {
    try {
        const response = await axiosPrivate.get('/training/scheduled', 
                            {
                                headers: {'Content-Type':'application/json'},
                                withCredentials: true
                            });
        setScheduledData(response.data.allUserTrainings);
        console.log(response.data.allUserTrainings);
    } catch (err) {                                        
        console.error(err.response);
        
    }
    console.log(scheduledData);
};

const handleUpdateTraining = async (duration, date, showing, id, tId) =>{
    try {
        const response = await axiosPrivate.post('/training/update', 
            JSON.stringify({ 
                            training:{
                                trainingDuration: duration,
                                trainingStart: date,
                                showing: showing,
                                id: id,
                                trainerId: tId
                            }
                            }),
                            {
                                headers: {'Content-Type':'application/json'},
                                withCredentials: true
                            });

    } catch (err) {                                        
        console.error(err.response);
    
    }
    loadAllTraining();
};

const handleAddTraining = async (tId, start, duration) => {
    try {
        const response = await axiosPrivate.post('/training/add', 
            JSON.stringify({ 
                            training:{
                                trainerId: tId,
                                trainingStart: start,
                                trainingDuration: duration,
                            }
                            }),
                            {
                                headers: {'Content-Type':'application/json'},
                                withCredentials: true
                            });
    } catch (err) {                                        
        console.error(err.response);
    
    }
    loadAllTraining();
};

const handleScheduleTraining = async (tId, start, duration, showing, id) => {
    try {
        const response = await axiosPrivate.post('/training/signup', 
            JSON.stringify({ 
                            training:{
                                trainerId: tId,
                                trainingStart: start,
                                trainingDuration: duration,
                                showing: showing,
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
    loadAllTraining();
};

const handleCancelTraining = async (tId, start, duration, showing, id) => {
    try {
        const response = await axiosPrivate.post('/training/cancel', 
            JSON.stringify({ 
                            training:{
                                trainerId: tId,
                                trainingStart: start,
                                trainingDuration: duration,
                                showing: showing,
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
    loadAllTraining();
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
        } catch (err) {                                         //na ovaj na??in ukoliko istekne refresh token cemo vratiti korisnika na login i postaviti u history trenutnu lokaciju kako bi se mogli vratiti nazad na ovo mjesto
            console.error(err);
            
        }
    }
    
    
    getData();
    
    loadAllTraining();
    loadAllScheduledTraining();
    
    return () => {
        isMounted = false;
        controller.abort();
    }
},[]);



return(
    <>
    <h1>Svi treninzi</h1>
    <div>Ovdje se nalaze svi treninzi dostupni na na??oj stranici. Klikom na pojedina??ni trening mo??ete doznati vi??e detalja o samom treningu.</div>
    {(userData[5] == 'trener' || userData[5] == 'admin') ?
        <>
        <div>Pritiskom na ovaj gumb mo??ete dodavati nove treninge. <br/>
        <AddTraining
            trainersId = {trainersId}
            date = {date}
            duration = {duration}
            setTrainersId = {setTrainersId}
            setDate = {setDate}
            setDuration = {setDuration}
            handleAddTraining = {handleAddTraining}
            user = {userData}
        />
        Ukoliko ste trening dodali na stranicu, mo??ete ga i ukloniti pritiskom na dugme u obliku slova X unutar detalja o treningu.</div>
        
        </>
        : <><div>Ovdje se mo??ete prijaviti na trening.<br/>
        Nakon ??to ste kliknuli na trening kako bi dobili vi??e informacija, ozna??ite gumb kako bi se prijavili na trening. Ukoliko se ??elite odjaviti s treninga jednostavno maknite oznaku s gumba.
        </div></>}
    <br></br>
    <div style={{margintop:'10px'}}>
    <Training
          data={trainingData}
          trainersId = {trainersId}
          date = {date}
          duration = {duration}
          setTrainersId = {setTrainersId}
          setDate = {setDate}
          setDuration = {setDuration}
          handleUpdateTraining = {handleUpdateTraining}
          handleScheduleTraining = {handleScheduleTraining}
          handleCancelTraining = {handleCancelTraining}
          scheduledData = {scheduledData}
          user = {userData}/>
    </div>
    
    </>
   
)

}
