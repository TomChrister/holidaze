import { ProfileData } from '../components/ProfileData.tsx';
import { UpdateProfileForm } from '../components/UpdateProfile.tsx';
import { MyBookings } from '../features/booking/MyBookings.tsx';
import { MyVenues } from '../features/venue/MyVenues.tsx';

export function ProfilePage() {
    const name = localStorage.getItem('name') || '';

    return (
        <>
            <div>
                <ProfileData/>
                <UpdateProfileForm name={name}/>
                <div className='flex flex-col justify-center md:flex-row'>
                    <MyBookings/>
                    <MyVenues/>
                </div>
            </div>
        </>
    )
}