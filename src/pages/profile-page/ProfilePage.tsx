import { Outlet } from 'react-router-dom';

const ProfilePage = () => {

    return ( 
        <>
            <div className='content container'>
                <Outlet /> 
            </div>
        </>
     );
}

export default ProfilePage;

