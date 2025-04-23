import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ownVenues } from '../api/venues';

export function MyVenues() {
    const [venues, setVenues] = useState([]);
    const username = localStorage.getItem('name');

    useEffect(() => {
        if (username) {
            ownVenues(username).then(setVenues).catch(console.error);
        }
    }, [username]);

    return (
        <div>
            <h1>Your venues</h1>
            <ul>
                {venues.map((venue: any) => (
                    <li key={venue.id}>
                        <Link to={`/venues/${venue.id}`}>
                            {venue.name}
                            <img
                                src={venue.media[0]?.url}
                                alt={venue.media[0]?.alt || venue.name}
                                className='w-[200px] rounded-lg'
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

