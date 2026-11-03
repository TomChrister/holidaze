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
        <div className='flex flex-col items-center text-center'>
            <img
                src={avatarUrl}
                alt={profile.avatar?.alt || 'Avatar'}
                className='h-28 w-28 rounded-full object-cover ring-1 ring-divider'
            />

            <h1 className='mt-4 text-2xl leading-8 font-bold'>{profile.name}</h1>
            <p className='text-sm text-graphite'>{profile.email}</p>
            <p className='mt-3 text-base text-graphite'>{profile.bio || 'No bio yet'}</p>

            <div className='my-6 grid w-full grid-cols-2 divide-x divide-divider border-y border-divider py-4'>
                <div>
                    <p className='text-xl font-extrabold'>{profile._count?.bookings ?? 0}</p>
                    <p className='text-sm text-graphite'>{profile._count?.bookings === 1 ? 'Trip' : 'Trips'}</p>
                </div>
                <div>
                    <p className='text-xl font-extrabold'>{profile._count?.venues ?? 0}</p>
                    <p className='text-sm text-graphite'>{profile._count?.venues === 1 ? 'Venue' : 'Venues'}</p>
                </div>
            </div>

            <div className='w-full text-left'>
                <UpdateProfileForm name={name}/>
            </div>
        </div>
    )
}
