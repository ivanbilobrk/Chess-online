import React from "react";
import axios from "../api/axios";
import { useEffect } from "react";
import { useState } from 'react';

import useAxiosPrivate from "../hooks/useAxiosPrivate";

import Training from "./Training";
import useAuth from "../hooks/useAuth";
import AddTraining from "./AddTraining";

export default function TrainingPageComponent(){

const [trainingData, setData] = useState([]);
const [userData, setUserData] = useState([]);
const [trainersId, setTrainersId] = useState("");
const [date, setDate] = useState("");
const [duration, setDuration] = useState("");

const axiosPrivate = useAxiosPrivate();
const {auth} = useAuth();

const loadAllTraining = async () => {
    try {
        const response = await axios.get('/training/', 
                            {
                                headers: {'Content-Type':'application/json'},
                                withCredentials: true
                            });
        setData(response.data.trainingsAll);
        console.log(response.data.trainingsAll + "Konj");
    } catch (err) {                                        
        console.error(err.response);
        
    }
    console.log(trainingData);
};

const handleUpdateTraining = async (duration, date, showing, id, tId) =>{
    try {
        const response = await axios.post('/training/update', 
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
        const response = await axios.post('/training/add', 
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
        const response = await axios.post('/training/signup', 
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
        const response = await axios.post('/training/cancel', 
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
            console.log(response.data.podatci)
            isMounted && setUserData(response.data.podatci);
        } catch (err) {                                         //na ovaj način ukoliko istekne refresh token cemo vratiti korisnika na login i postaviti u history trenutnu lokaciju kako bi se mogli vratiti nazad na ovo mjesto
            console.error(err);
            
        }
    }
    
    
    getData();
    
    loadAllTraining();
    
    return () => {
        isMounted = false;
        controller.abort();
    }
},[]);



return(
    <>
    <h1>Svi treninzi</h1>
    {(userData[5] == 'trener' || userData[5] == 'admin') ?
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
        : <></>}
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
          user = {userData}/>
    </>
   
)

}
