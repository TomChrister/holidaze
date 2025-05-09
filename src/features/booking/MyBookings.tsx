import { useEffect, useState } from 'react';
import { upcomingBookings } from '../../api/bookings.tsx';
import { formatDate } from '../../utils';
import { Link } from 'react-router-dom';
import { PlaneTakeoff } from 'lucide-react';

export function MyBookings() {
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

    return (
        <div className='w-full pt-6 space-y-4 bg-brand-secondary'>
            <h2 className='m-0 px-6 text-2xl font-bold'>Upcoming trips</h2>
            {bookings.length === 0 && (
                <p className='mx-6 rounded-lg bg-white p-4 px-6 text-gray-600'>
                    No bookings yet.<br/> Go to
                    <Link to={'/explore'} className='text-brand-primary font-semibold ml-1'>
                        explore
                    </Link> here.
                </p>
            )}
            <ul className='flex flex-col p-6 gap-4 space-y-4'>
                {bookings.map((booking) => (
                    <li key={booking.id} className='flex items-center justify-between h-28 rounded-lg cursor-pointer bg-white p-4 m-0 transition-transform duration-400 hover:scale-105'>
                        <Link to={`/venues/${booking.venue.id}`}>
                            <p>
                                <strong>
                                    {booking.venue.location.city}, {booking.venue.location.country}
                                </strong>
                            </p>
                            <p className='text-gray-500'>
                                {formatDate(booking.dateFrom)} – {formatDate(booking.dateTo)}
                            </p>
                            <p><strong>Guests:</strong> {booking.guests}</p>
                        </Link>
                        <PlaneTakeoff className='text-brand-primary'/>
                    </li>
                ))}
            </ul>
        </div>
    )
}