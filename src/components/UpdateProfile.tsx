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
            <div className='border-b-gray-500 px-8 pb-6 shadow'>
                <button
                    onClick={() => setShowForm(true)}
                    className='mt-4 flex w-full cursor-pointer items-center justify-center rounded px-4 py-2 text-white bg-brand-primary hover:opacity-90'
                >
                    <UserRoundPen className='mr-2 h-4 w-4'/>
                    Update profile
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className='p-6 shadow space-y-4'>
            <div>
                <label className='block font-semibold'>New bio:</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className='w-full rounded border border-gray-400 p-2'
                    rows={3}
                />
            </div>

            <div>
                <label className='block font-semibold'>Avatar URL:</label>
                <input
                    type='text'
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className='w-full rounded border border-gray-400 p-2'
                />
            </div>

            {avatarUrl && (
                <div className='mt-4'>
                    <p className='text-sm text-gray-600'>Preview</p>
                    <img src={avatarUrl} alt='Avatar URL' className='mt-2 h-32 w-32 rounded-full object-cover'
                    />
                </div>
            )}

            <button
                type='submit'
                className='flex w-full cursor-pointer items-center justify-center rounded px-4 py-2 text-white bg-brand-primary'
            >
                <UserRoundPen className='mr-2 h-4 w-4'/>
                Update profile
            </button>

            <button
                type='button'
                onClick={() => setShowForm(false)}
                className='w-full cursor-pointer rounded bg-red-700 px-4 py-2 text-white'>
                Cancel
            </button>
        </form>
    );
}
