import {Outlet} from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () =>{
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth, persist} = useAuth();


    useEffect(()=>{
        let isMounted = true;
        const verifyRefreshToken = async()=>{
            try{
                await refresh();
            } catch(error){
                console.log(error)
            }
            finally{
                isMounted && setIsLoading(false);
            }
        }

      if(!auth?.accessToken){
        verifyRefreshToken();
        console.log(auth.role);
      } else {
        console.log(auth.role);
        setIsLoading(false);
      }

      return ()=>{
        isMounted = false;
      }
    },[])

    useEffect(()=>{
        console.log(`isloading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    },[isLoading])

    return(
        <>
            {!persist ? <Outlet/>: 
                    isLoading ? <p>Loading...</p> : <Outlet/>}
        </>
    )
}
export default PersistLogin;