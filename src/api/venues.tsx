import { API_BASE_HOLIDAZE } from '../utils/constants.tsx';
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

// Fetch venue by ID
export async function singleVenue(id: string) {
    const response = await fetch(`${API_BASE_HOLIDAZE}/venues/${id}`, {
        headers: authHeaders()
    });
    const { data } = await response.json();
    return data;
}

// Create venue
export async function createVenue(data: VenueProps) {
    const res = await fetch(`${API_BASE_HOLIDAZE}/venues`, {
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

// Search venues via API
export async function searchVenues(query: string): Promise<VenueProps[]> {
    const response = await fetch(
        `${API_BASE_HOLIDAZE}/venues?search=${encodeURIComponent(query)}&limit=100`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const { data } = await response.json();
    return data;
}
