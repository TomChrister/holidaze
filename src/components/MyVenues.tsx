import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ownVenues } from '../api/venues';
import { formatDate } from '../utils';
import { DeleteVenueBtn } from './DeleteVenueBtn.tsx';

export function MyVenues() {
    const navigate = useNavigate();

    const [venues, setVenues] = useState<any[]>([]);
    const username = localStorage.getItem('name');

    useEffect(() => {
        if (username) {
            ownVenues(username).then(setVenues).catch(console.error);
        }
    }, [username]);

    return (
        <div>
            <h1 className='text-3xl font-bold mb-4'>My Venues</h1>
            <ul className='space-y-6'>
                {venues.map((venue: any) => (
                    <li key={venue.id} className='border p-4 rounded'>
                        <Link to={`/venues/${venue.id}`} className='block mb-2'>
                            <h2 className='text-xl font-semibold'>{venue.name}</h2>
                        </Link>

                        {venue.bookings && venue.bookings.length > 0 ? (
                            <div className='mt-4'>
                                <h3 className='font-semibold'>Bookings:</h3>
                                <ul className='list-disc ml-5'>
                                    {venue.bookings.map((booking: any) => (
                                        <li key={booking.id} className='text-sm flex flex-wrap gap-1'>
                                            <span>
                                                {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                                            </span>
                                            <span>for {booking.guests} guests</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className='text-gray-500 text-sm mt-2'>No bookings yet.</p>
                        )}

                        <div className='mt-4 flex gap-2'>
                            <DeleteVenueBtn
                                venueId={venue.id}
                                onDelete={() => setVenues((prev) => prev.filter((v) => v.id !== venue.id))}
                            />
                        </div>
                        <button
                            onClick={() => navigate(`/venues/${venue.id}/edit`)}
                            className='ml-2 px-3 py-1 bg-blue-500 text-white rounded'
                        >
                            Edit
                        </button>
                    </li>
                ))};
            </ul>
        </div>
    );
}
