export const API_BASE:string = 'https://v2.api.noroff.dev/holidaze';

export const API_KEY:string = import.meta.env.VITE_API_KEY;

export const API_TOKEN:string = import.meta.env.VITE_ACCESS_TOKEN;

export const API_REGISTER:string = `${API_BASE}/auth/register`;

export const API_LOGIN:string = `${API_BASE}/auth/login`;

export const API_VENUES:string = `${API_BASE}/venues`;

export const API_BOOKINGS:string = `${API_BASE}/bookings`;

export const API_PROFILES:string = `${API_BASE}/profiles`;
