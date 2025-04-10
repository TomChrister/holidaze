import { API_KEY } from "./constants.tsx";

// No auth required
export const defaultHeaders = {
    "Content-Type": "application/json",
}

// Auth required
export const authHeaders = () => {
    const token = localStorage.getItem('accessToken');
    return {
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-KEY': API_KEY,
        'Content-Type': 'application/json',
    };
}