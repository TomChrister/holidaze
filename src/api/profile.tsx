import { API_PROFILES } from '../utils/constants.tsx';
import { authHeaders } from '../utils/headers.tsx';
import { ProfileProps } from '../types/profile';

// Get profile data
export async function fetchProfile(name: string) {
    const response = await fetch(`${API_PROFILES}/${name}`, {
        method: 'GET',
        headers: authHeaders(),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.mmessage || 'Failed to fetch profile');
    }

    return await response.json();
}

// Update profile data
export async function updateProfile(name: string, data: ProfileProps) {
    const response = await fetch(`${API_PROFILES}/${name}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.mmessage || 'Failed to update profile');
    }

    return await response.json();
}