import { useState, useEffect } from 'react';
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
        <div className='space-y-4'>
            <h2 className='text-2xl font-bold'>Upcoming trips</h2>
            <ul className='space-y-2'>
                {bookings.map((booking) => (
                    <Link to={`/venues/${booking.venue.id}`}>
                        <li key={booking.id} className='border p-4 rounded'>
                            <p><strong>{booking.venue.name}</strong></p>
                            <img
                                src={booking.venue.media?.[0]?.url}
                                alt={booking.venue.media?.[0]?.alt}
                                className='w-full h-48 object-cover rounded mb-2'
                            />
                            <p>{formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}</p>
                            <p><strong>Guests:</strong> {booking.guests}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}