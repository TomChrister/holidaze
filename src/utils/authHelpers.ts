// Get username in the header
export function GetUserName() {
    return localStorage.getItem('name');
}

// Check if logged in or not
export function isLoggedIn() {
    return Boolean(localStorage.getItem('accessToken'));
}

// Check if user is venue manager or not, saved at login
export function isVenueManager() {
    return localStorage.getItem('venueManager') === 'true';
}
