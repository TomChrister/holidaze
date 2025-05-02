import { API_BASE_HOLIDAZE } from './constants';
import { authHeaders } from './headers.tsx';

// Get username in header
export function GetUserName() {
    return localStorage.getItem('name');
}

// Check if logged in or not
export function isLoggedIn() {
    return Boolean(localStorage.getItem('accessToken'));
}

// Check if user is venue manager or not
export async function isVenueManager(): Promise<boolean> {
    const name = localStorage.getItem('name');
    if (!name) return false;

    const res = await fetch(`${API_BASE_HOLIDAZE}/profiles/${name}`, {
        headers: authHeaders(),
    });

    if (!res.ok) return false;

    const json = await res.json();
    return json.data.venueManager === true;
}
