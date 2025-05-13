import { API_BASE_HOLIDAZE, API_PROFILES, API_VENUES } from '../utils/constants.tsx';
import { authHeaders } from '../utils/headers.tsx';
import { VenueProps } from '../types/venue';

// Fetch all venues
export async function allVenues(): Promise<VenueProps[]> {
    const all: VenueProps[] = [];
    let page = 1;
    let isLastPage = false;

    try {
        while (!isLastPage) {
            const res = await fetch(
                `${API_BASE_HOLIDAZE}/venues?page=${page}&limit=100`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!res.ok) throw new Error(`HTTP error ${res.status}`);

            const json = await res.json();
            all.push(...json.data);

            isLastPage = json.meta?.isLastPage || json.data.length < 100;
            page++;
        }

        return all;
    } catch (err) {
        console.error('Error fetching venues:', err);
        throw err;
    }
}

// Fetch a single venue by ID
export async function singleVenue(id: string) {
    const response = await fetch(`${API_VENUES}/${id}`, {
        headers: authHeaders()
    });
    const { data } = await response.json();
    return data;
}

// Create venue
export async function createVenue(data: VenueProps) {
    const res = await fetch(`${API_VENUES}`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create venue.');
    }

    return await res.json();
}

// My venues
export async function ownVenues(name: string) {
    const response = await fetch(`${API_PROFILES}/${name}/venues?_bookings=true`, {
        method: 'GET',
        headers: authHeaders(),
    });
    const json = await response.json();
    return json.data;
}

// Delete venue
export async function deleteVenue(id: string) {
    const response = await fetch(`${API_VENUES}/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
    });

    if (!response.ok) {
        throw new Error(`Failed to delete venue`);
    }

    return response.status !== 204 ? await response.json() : null;
}

// Update venue
export async function updateVenue(id: string, data: any) {
    const res = await fetch(`${API_VENUES}/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
    const body = await res.json();
    if (!res.ok) {

        const msg = body.error || body.message || JSON.stringify(body);
        throw new Error(msg);
    }
    return body;
}

