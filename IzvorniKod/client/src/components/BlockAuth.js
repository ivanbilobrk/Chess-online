import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { useLocation, Navigate, Outlet } from "react-router-dom";

const PersistLogin = () =>{
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth, persist} = useAuth();
    const location = useLocation();


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
            {!auth.accessToken ? <Outlet/>: 
                    <Navigate to="/" state={{from: location}} replace/>}
        </>
    )
}
export default PersistLogin;