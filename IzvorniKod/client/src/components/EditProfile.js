import { color } from "@mui/system";
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
//novo dodajem
import Typography from '@mui/material/Typography';

import 'react-calendar/dist/Calendar.css';

import ProfileElement from "./ProfileElement";
//zavrsetak najnovijeg

//novo dodavanje

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//kraj dodavanja

export default function EditProfile(){
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [userData, setUserData] = useState([]);
    const [data, setData] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");

    const logout = useLogout();
    const location = useLocation();
    const {auth} = useAuth();

    
 

    const handleClickUpdateProfile = async (username, name, surname, email , id) =>{
        try {
            const response =await axiosPrivate.post(`/user/u/${auth.user}`, 
                JSON.stringify({ 
                                user:{
                                  username: username,
                                  name:name,
                                  surname:surname,
                                  email:email,
                                    id: id
                                }
                                }),
                                {

                                });
    
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
                const response = await axiosPrivate.get(`/user/${auth.user}`, {
                });
                console.log(response.data.podatci)
                isMounted && setUserData(response.data.podatci);
            } catch (err) {                                         //na ovaj način ukoliko istekne refresh token cemo vratiti korisnika na login i postaviti u history trenutnu lokaciju kako bi se mogli vratiti nazad na ovo mjesto
                console.error(err);
                
            }
        }
        
        
        getData();
        
        
        return () => {
            isMounted = false;
            controller.abort();
        }
    },[]);
    
    return(
        <>
        <div>
        <h1>Uređivanje profila</h1>
        
            <div className="tekst">
              
<br></br>


    <div className="edit">
        <ProfileElement
            handleClickUpdateProfile = {handleClickUpdateProfile}
            username= {username}
            name={name}
            surname={surname}
            email={email}
            setUsername={setUsername}
            setName={setName}
            setSurname={setSurname}
            setEmail={setEmail}
            user = {userData}
        />
    </div>

<br></br>

            
            </div>
        </div>
        </>
    );
};

//export
