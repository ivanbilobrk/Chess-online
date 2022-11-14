import {Login} from '../components/Login'
import HeaderSigned from '../components/HeaderSigned'
import Footer from '../components/Footer';

export default function LoginPage(){


    return(
        <>
        <HeaderSigned/>
        <Login/>
        <Footer/>
        </>
    );

}

export { LoginPage };