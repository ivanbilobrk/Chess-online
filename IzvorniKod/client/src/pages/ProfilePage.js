import{Link} from 'react-router-dom'
export default function ProfilePage(){
    return(
        <>
        <div>Ovo je profile</div>
        <Link to="/">Odi na home</Link>
        </>
    );
};

export {ProfilePage}