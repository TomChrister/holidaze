import { API_BOOKINGS } from '../utils/constants.tsx';
import { authHeaders } from '../utils/headers.tsx';
import { BookingData } from '../types/bookings';

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