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

    return (
        <div className='flex self-center justify-center gap-6 4'>
            <div>
                <img
                    src={profile.avatar?.url || '/default-avatar.jpg'}
                    alt={profile.avatar?.alt || 'Avatar'}
                    className='w-32 h-32 rounded-full mt-4'
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