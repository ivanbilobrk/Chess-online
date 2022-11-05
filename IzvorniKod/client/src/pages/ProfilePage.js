import { useState, useEffect } from 'react';
import{Link} from 'react-router-dom'
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from '../hooks/useLogout';


export default function ProfilePage(){
    const [data, setData] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const logout = useLogout();
    const location = useLocation();
    const {auth} = useAuth();           //primjer kako koristiti auth 

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getData = async () => {
            try {
                const response = await axiosPrivate.get(`/user/${auth.user}`, {
                });
                console.log(response.data.podatci);
                isMounted && setData(response.data.podatci);
            } catch (err) {                                         //na ovaj način ukoliko istekne refresh token cemo vratiti korisnika na login i postaviti u history trenutnu lokaciju kako bi se mogli vratiti nazad na ovo mjesto
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const signout = async() =>{
        await logout();
        navigate('/');
    }



    return(
        <>
        <div>Ovo je profile</div>
        <Link to="/">Odi na home</Link>
        <h2>Users List</h2>
            {data?.length
                ? (
                    <ul>
                        {data.map((podatak, i) => <li key={i}>{podatak}</li>)}
                    </ul>
                ) : <p>No data to display</p>
            }
            <button onClick={signout}>Odjavi se</button>
        </>
    );
};

export {ProfilePage}