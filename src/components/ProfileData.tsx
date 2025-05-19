import { useEffect, useState } from 'react';
import { fetchProfile } from '../api/profile.tsx';
import { Loader } from './Loader.tsx';
import { UpdateProfileForm } from './UpdateProfile.tsx';

export function ProfileData() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const name = localStorage.getItem('name') || '';

    useEffect(() => {
        if (!name) return;

        async function loadProfile() {
            try {
                const data = await fetchProfile(name);
                setProfile(data.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, [name]);

    if (loading) return <Loader/>;
    if (error) return <p>Error: {error}</p>
    if (!profile) return <p>No profile found</p>

    const defaultApiAvatar = 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400';

    const isDefaultAvatar = profile.avatar?.url === defaultApiAvatar;
    const avatarUrl = !profile.avatar?.url || isDefaultAvatar
        ? '/blank-profile-picture.png'
        : profile.avatar.url;

    return (
        <div
            className='flex flex-col justify-center gap-6 self-center pt-4 lg:flex-col lg:items-center lg:self-baseline lg:pt-8'>
            <div className='flex justify-center'>
                <img
                    src={avatarUrl}
                    alt={profile.avatar?.alt || 'Avatar'}
                    className='mt-4 h-32 w-32 rounded-full object-cover'
                />
            </div>

            <div className='flex flex-col gap-2 items-center'>
                <h1 className='text-2xl font-bold'>{profile.name}</h1>
                <p className='ml-1 text-gray-600'>{profile.email}</p>
                <p className='ml-1 text-gray-500'>{profile.bio || 'No bio available'}</p>
            </div>

            <UpdateProfileForm name={name}/>

            <div className='w-full px-6 flex flex-col justify-center'>
                <hr className='border border-gray-300 w-full max-w-xl'/>
            </div>

            <div className='flex justify-center gap-8 pb-6'>
                <div className='flex flex-col items-center'>
                    <span className='text-xl font-semibold'>{profile._count?.bookings}</span>
                    <p className='text-sm'>
                        {profile._count?.bookings === 1 ? 'trip' : 'trips'}
                    </p>
                </div>

                <div className='flex flex-col items-center'>
                    <span className='text-xl font-semibold'>{profile._count?.venues}</span>
                    <p className='text-sm'>
                        {profile._count?.venues === 1 ? 'venue' : 'venues'}
                    </p>
                </div>
            </div>
        </div>
    )
}