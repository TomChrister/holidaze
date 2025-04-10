import { API_BASE } from "../../utils/constants.tsx";
import { authHeaders } from "../../utils/headers.tsx";

export async function allVenues() {
    try {
        const response = await fetch(`${API_BASE}/venues`, {
            method: "GET",
            headers: authHeaders()
        });

        if (!response.ok) {
            console.error('Response details', response);
            throw new Error(`HTTP error ${response.status}`);
        }

        const {data} = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}