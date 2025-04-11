import { API_REGISTER } from "../utils/constants.tsx";
import { defaultHeaders } from "../utils/headers.tsx";

export type RegisterFormData = {
    name: string;
    email: string;
    password: string;
}

// Register API call
export async function registerUser(data: RegisterFormData) {
    const response = await fetch(`${API_REGISTER}`, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Registration failed.')
    return response.json();
}