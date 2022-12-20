import React from "react";
import axios from "../api/axios";
import { useEffect } from "react";
import { useState } from 'react';
import { axiosPrivate } from "../api/axios";
import Training from "./Training";
import useAuth from "../hooks/useAuth";

export default function TrainingPageComponent(){

const [trainingData, setData] = useState([]);
const [userData, setUserData] = useState([]);
const [trainerId, setTrainerId] = useState("");
const [date, setDate] = useState("");
const [duration, setDuration] = useState("");

const {auth} = useAuth();

const loadAllTraining = async () => {
    try {
        const response = await axios.get('/', 
                            {
                                headers: {'Content-Type':'application/json'},
                                withCredentials: true
                            });
        setData(response.data.trainingsAll);
        console.log(response.data.trainingsAll);
    } catch (err) {                                        
        console.error(err.response);
        
    }
};

useEffect(() =>{
    let isMounted = true;
    const controller = new AbortController();
    /*const getData = async () => {
        try {
            const response = await axiosPrivate.get(`/user/${auth.user}`, {
            });
            console.log(response.data.podatci)
            isMounted && setUserData(response.data.podatci);
        } catch (err) {                                         //na ovaj način ukoliko istekne refresh token cemo vratiti korisnika na login i postaviti u history trenutnu lokaciju kako bi se mogli vratiti nazad na ovo mjesto
            console.error(err);
            
        }
    }
    
    
    getData();*/
    
    loadAllTraining();
    
    return () => {
        isMounted = false;
        controller.abort();
    }
},[]);



return(
    <>
    <h1>Svi treninzi</h1>
    <Training
          data={trainingData}
          trainerId = {trainerId}
          date = {date}
          duration = {duration}
          setTrainerId = {setTrainerId}
          setDate = {setDate}
          setDuration = {setDuration}
          user = {userData}/>
    </>
)

}
