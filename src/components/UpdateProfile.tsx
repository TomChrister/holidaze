import React, { useState } from 'react';
import { updateProfile } from '../api/profile';
import { toast } from 'react-hot-toast';
import { UserRoundPen } from 'lucide-react';

export function UpdateProfileForm({ name }: { name: string }) {
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [showForm, setShowForm] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const profileData: any = {};

        if (bio) {
            profileData.bio = bio;
        }

        if (avatarUrl) {
            profileData.avatar = {
                url: avatarUrl,
            };
        }

        try {
            await updateProfile(name, profileData);
            toast.success('Profile page updated', {duration: 1500});

            setTimeout(() => {
                window.location.reload()
            }, 1500)
            setShowForm(false);
        } catch (error: any) {
            toast.error(error.message || 'Could not update profile');
        }
    }

    if (!showForm) {
        return (
            <div className='px-6 pb-6'>
                <button
                    onClick={() => setShowForm(true)}
                    className='bg-brand-primary text-white py-2 px-4 rounded w-full mt-4 flex items-center justify-center cursor-pointer'
                >
                    <UserRoundPen className='w-4 h-4 mr-2'/>
                    Update profile
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4 p-6'>
            <div>
                <label className='block font-semibold'>Ny bio:</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className='w-full p-2 border rounded'
                    rows={3}
                />
            </div>

            <div>
                <label className='block font-semibold'>Avatar URL:</label>
                <input
                    type='text'
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className='w-full p-2 border rounded'
                />
            </div>

            {avatarUrl && (
                <div className='mt-4'>
                    <p className='text-sm text-gray-600'>Preview</p>
                    <img src={avatarUrl} alt='Avatar URL' className='w-32 h-32 rounded-full mt-2 object-cover'
                    />
                </div>
            )}

            <button
                type='submit'
                className='flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded w-full cursor-pointer'
            >
                <UserRoundPen className='w-4 h-4 mr-2'/>
                Update profile
            </button>

            <button
                type='button'
                onClick={() => setShowForm(false)}
                className='bg-red-600 text-white py-2 px-4 rounded w-full cursor-pointer'>
                Cancel
            </button>
        </form>
    );
}
