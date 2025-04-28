import { ProfileData } from '../components/ProfileData.tsx';
import { UpdateProfileForm } from '../components/UpdateProfile.tsx';
import { UpcomingBookings } from '../components/UpcomingBookings.tsx';
import { MyVenues } from '../components/MyVenues.tsx';

export function ProfilePage() {
    const name = localStorage.getItem('name') || '';

    return (
        <>
            <div>
                <ProfileData/>
                <UpdateProfileForm name={name}/>
                <UpcomingBookings/>
                <MyVenues/>
            </div>
        </>
    )
}