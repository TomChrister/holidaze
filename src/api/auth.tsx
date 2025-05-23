import { API_REGISTER, API_LOGIN } from '../utils/constants.tsx';
import { defaultHeaders } from '../utils/headers.tsx';
import { LoginFormData, RegisterFormData } from '../types/auth';

// Login
export async function loginUser(data: LoginFormData) {
    const response = await fetch(`${API_LOGIN}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('LoginPage failed.')
    return response.json();
}

// Register
export async function registerUser(data: RegisterFormData) {
    const response = await fetch(`${API_REGISTER}`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Registration failed.')
    return response.json();
}
