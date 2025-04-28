import { Link } from 'react-router-dom';
import { ProfileData } from '../components/ProfileData.tsx';
import { UpdateProfileForm } from "../components/UpdateProfile.tsx";

export function Profile() {
    const name = localStorage.getItem('name') || '';

    return (
        <>
            <h1>Profile page</h1>

            <Link to='/MyVenues'>
                Your Venues
            </Link>

            <div>
                <ProfileData/>
                <UpdateProfileForm name={name} />
            </div>
        </>
    )
}