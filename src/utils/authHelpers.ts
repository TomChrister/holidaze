// Auth helpers

// Get username in header
export function GetUserName() {
    return localStorage.getItem('name');
}

// Check if logged in or not
export function isLoggedIn() {
    return Boolean(localStorage.getItem('accessToken'));
}