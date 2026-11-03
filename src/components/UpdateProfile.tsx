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
            toast.success('Profile page updated', { duration: 1500 });

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
            <button onClick={() => setShowForm(true)} className='btn-secondary w-full'>
                <UserRoundPen size={18}/>
                Edit profile
            </button>
        );
    }

    return (
        <form
            id='update-profile-form'
            onSubmit={handleSubmit}
            className='space-y-4'>
            <div>
                <label className='label' htmlFor='bio'>Bio</label>
                <textarea
                    id='bio'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className='input'
                    rows={3}
                />
            </div>

            <div>
                <label className='label' htmlFor='avatar-url'>Avatar URL</label>
                <input
                    id='avatar-url'
                    type='text'
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className='input'
                />
            </div>

            {avatarUrl && (
                <div className='mt-4'>
                    <p className='label'>Preview</p>
                    <img src={avatarUrl} alt='Avatar URL' className='h-24 w-24 rounded-full object-cover ring-1 ring-divider'
                    />
                </div>
            )}

            <button
                type='submit'
                className='btn-primary w-full'
            >
                Save changes
            </button>

            <button
                type='button'
                onClick={() => setShowForm(false)}
                className='btn-secondary w-full'>
                Cancel
            </button>
        </form>
    );
}
