import { API_REGISTER, API_LOGIN } from "../utils/constants.tsx";
import { defaultHeaders } from "../utils/headers.tsx";

// Login API call
export type LoginFormData = {
    email: string;
    password: string;
}

export async function loginUser(data: LoginFormData) {
    const response = await fetch(`${API_LOGIN}`, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Login failed.')
    return response.json();
}

// Register API call
export type RegisterFormData = {
    name: string;
    email: string;
    password: string;
}

export async function registerUser(data: RegisterFormData) {
    const response = await fetch(`${API_REGISTER}`, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Registration failed.')
    return response.json();
}
