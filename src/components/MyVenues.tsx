import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ownVenues } from '../api/venues';
import { formatDate } from '../utils';

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
            <h1 className="text-3xl font-bold mb-4">My Venues</h1>
            <ul className="space-y-6">
                {venues.map((venue: any) => (
                    <li key={venue.id} className="border p-4 rounded">
                        <Link to={`/venues/${venue.id}`} className="block mb-2">
                            <h2 className="text-xl font-semibold">{venue.name}</h2>
                            <img
                                src={venue.media[0]?.url}
                                alt={venue.media[0]?.alt || venue.name}
                                className="w-[200px] rounded-lg mt-2"
                            />
                        </Link>

                        {venue.bookings && venue.bookings.length > 0 ? (
                            <div className="mt-4">
                                <h3 className="font-semibold">Bookings:</h3>
                                <ul className="list-disc ml-5">
                                    {venue.bookings.map((booking: any) => (
                                        <li key={booking.id} className="text-sm flex flex-wrap gap-1">
                                            <span>
                                                {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                                            </span>
                                            <span>for {booking.guests} guests</span>
                                        </li>

                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm mt-2">No bookings yet.</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}