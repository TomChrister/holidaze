import { useEffect, useState } from 'react';
import { fetchProfile } from '../api/profile.tsx';
import { Loader } from './Loader.tsx';

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
        <div className='flex self-center justify-center gap-6 pt-6'>
            <div>
                <img
                    src={avatarUrl}
                    alt={profile.avatar?.alt || 'Avatar'}
                    className='w-32 h-32 rounded-full mt-4 object-cover'
                />
            </div>
            <div className='self-center'>
                <h1 className='text-2xl font-bold'>{profile.name}</h1>
                <p className='text-gray-600 ml-1'>{profile.email}</p>
                <p className='text-gray-500 ml-1'>{profile.bio || 'No bio available'}</p>
            </div>
        </div>
    )
}