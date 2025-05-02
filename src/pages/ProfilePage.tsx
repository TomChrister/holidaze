import { ProfileData } from '../components/ProfileData.tsx';
import { UpdateProfileForm } from '../components/UpdateProfile.tsx';
import { MyBookings } from '../features/booking/MyBookings.tsx';
import { MyVenues } from '../components/MyVenues.tsx';

export function ProfilePage() {
    const name = localStorage.getItem('name') || '';

    return (
        <>
            <div>
                <ProfileData/>
                <UpdateProfileForm name={name}/>
                <MyBookings/>
                <MyVenues/>
            </div>
        </>
    )
}