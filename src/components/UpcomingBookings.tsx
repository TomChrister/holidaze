import { useEffect, useState } from 'react';
import { upcomingBookings } from '../api/bookings.tsx';
import { formatDate } from '../utils';
import { Link } from 'react-router-dom';

export function UpcomingBookings() {
    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const name = localStorage.getItem('name') || '';

    useEffect(() => {
        if (!name) return

        async function getBookings() {
            try {
                const data = await upcomingBookings(name)
                setBookings(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        getBookings();
    }, [name]);

    if (loading) return <p>Loading your bookings</p>
    if (error) return <p>Error: {error}</p>
    if (bookings.length === 0) return <p>No bookings yet.</p>;

    return (
        <div className='space-y-4 bg-brand-primary'>
            <h2 className='text-2xl font-bold pt-6 px-6 m-0'>Upcoming trips</h2>
            <ul className='flex flex-col space-y-4 p-6'>
                {bookings.map((booking) => (
                    <Link to={`/venues/${booking.venue.id}`}>
                        <li key={booking.id} className='p-4 rounded-lg bg-white'>
                            <p><strong>{booking.venue.name}</strong></p>
                            <p className='text-gray-500'>{formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}</p>
                            <p><strong>Guests:</strong> {booking.guests}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}