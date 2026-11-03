import { ProfileData } from '../components/ProfileData.tsx';
import { MyBookings } from '../features/booking/MyBookings.tsx';
import { MyVenues } from '../features/venue/MyVenues.tsx';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/authHelpers.ts';

export function ProfilePage() {
    if (!isLoggedIn()) return <Navigate to='/login' replace/>;

    return (
        <div className='container-page grid gap-10 pt-8 md:pt-10 lg:grid-cols-[340px_1fr] lg:gap-12'>
            <title>Profile</title>
            <aside>
                <div className='card p-6 lg:sticky lg:top-24'>
                    <ProfileData/>
                </div>
            </aside>

            <div className='flex flex-col gap-12'>
                <MyBookings/>
                <MyVenues/>
            </div>
        </div>
    )
}
