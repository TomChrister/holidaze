import { API_BASE_HOLIDAZE } from "../utils/constants.tsx";
import { authHeaders } from "../utils/headers.tsx";
import { VenueFormData } from "../types/venues";

// Fetch all venues
export async function allVenues(limit = 15, page = 1) {
    try {
        const response = await fetch(
            `${API_BASE_HOLIDAZE}/venues?sort=created&sortOrder=asc&limit=${limit}&page=${page}`,
            {
                method: "GET",
                headers: authHeaders()
            });

        if (!response.ok) {
            console.error('Response details', response);
            throw new Error(`HTTP error ${response.status}`);
        }

        const { data } = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
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
export async function createVenue(data: VenueFormData) {
    const res = await fetch(`${API_BASE_HOLIDAZE}/venues`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create venue.");
    }

    return await res.json();
}
