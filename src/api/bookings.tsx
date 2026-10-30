import { API_BOOKINGS, API_PROFILES } from '../utils/constants.tsx';
import { authHeaders } from '../utils/headers.tsx';
import { BookingData } from '../types/bookings';

// Create booking
export async function createBooking(data: BookingData) {
    const response = await fetch(API_BOOKINGS, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create booking');
    }

    return await response.json();
}

// Upcoming bookings
export async function upcomingBookings(name: string) {
    const response = await fetch(`${API_PROFILES}/${name}/bookings?_venue=true`, {
        method: 'GET',
        headers: authHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch bookings');
    const json = await response.json();
    return json.data;
}
