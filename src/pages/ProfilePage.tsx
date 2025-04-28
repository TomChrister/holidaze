import { Link } from 'react-router-dom';
import { ProfileData } from '../components/ProfileData.tsx';
import { UpdateProfileForm } from '../components/UpdateProfile.tsx';
import { UpcomingBookings } from '../components/UpcomingBookings.tsx';

export function ProfilePage() {
    const name = localStorage.getItem('name') || '';

    return (
        <>
            <Link to='/MyVenues'>
                Your Venues
            </Link>

            <div>
                <ProfileData/>
                <UpdateProfileForm name={name}/>
                <UpcomingBookings/>
            </div>
        </>
    )
}