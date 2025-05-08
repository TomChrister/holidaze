import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ownVenues } from '../../api/venues.tsx';
import { formatDate } from '../../utils';
import { DeleteVenueBtn } from '../../components/DeleteVenueBtn.tsx';

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
        <div className='pt-6 px-6 w-full bg-brand-secondary'>
            <h1 className='text-2xl font-bold'>My Venues</h1>
            <ul className='space-y-6'>
                {venues.map((venue: any) => (
                    <li key={venue.id} className='rounded-lg bg-white p-4'>
                        <Link to={`/venues/${venue.id}`} className='mb-2 block'>
                            <h2 className='text-xl font-semibold'>{venue.name}</h2>
                        </Link>

                        {venue.bookings && venue.bookings.length > 0 ? (
                            <div className='mt-4'>
                                <h3 className='font-semibold'>Bookings:</h3>
                                <ul className='ml-5 list-disc'>
                                    {venue.bookings.map((booking: any) => (
                                        <li key={booking.id} className='flex flex-wrap gap-1 text-sm'>
                                            <span>
                                                {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                                            </span>
                                            <span>for {booking.guests} guests</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p className='mt-2 text-sm text-gray-500'>No bookings yet.</p>
                        )}

                        <div className='flex gap-2'>
                            <div className='mt-4 flex gap-2'>
                                <DeleteVenueBtn
                                    venueId={venue.id}
                                    onDelete={() => setVenues((prev) => prev.filter((v) => v.id !== venue.id))}
                                />
                            </div>
                            <button
                                onClick={() => navigate(`/venues/${venue.id}/edit`)}
                                className='mt-4 w-28 cursor-pointer rounded bg-blue-500 px-3 text-white'
                            >
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
