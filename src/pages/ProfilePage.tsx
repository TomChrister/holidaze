import { ProfileData } from '../components/ProfileData.tsx';
import { MyBookings } from '../features/booking/MyBookings.tsx';
import { MyVenues } from '../features/venue/MyVenues.tsx';

export function ProfilePage() {
    return (
        <>
            <div className='bg-brand-secondary pb-12 lg:flex lg:justify-center lg:gap-20 lg:pb-20'>
                <title>Profile</title>
                <div className='justify-center bg-white lg:mt-8 lg:flex lg:rounded-lg lg:px-8 lg:shadow'>
                    <ProfileData/>
                </div>

                <div className='flex flex-col justify-center gap-6 md:flex-row lg:flex-col lg:gap-5 xl:flex-col'>
                    <MyBookings/>
                    <MyVenues/>
                </div>
            </div>
        </>
    )
}