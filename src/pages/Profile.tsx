import { Link } from "react-router-dom";

export function Profile() {
    return (
        <>
            <h1>Profile page</h1>

            <Link to='/MyVenues'>
                Your Venues
            </Link>
        </>
    )
}