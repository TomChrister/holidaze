import { useEffect, useState } from 'react';
import { upcomingBookings } from '../../api/bookings.tsx';
import { formatDate } from '../../utils';
import { Link } from 'react-router-dom';
import { PlaneTakeoff, Trash2 } from 'lucide-react';
import { cancelBookings } from '../../api/venues.tsx';
import ConfirmModal from '../../components/ConfirmModal.tsx';

export function MyBookings() {
    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showCancel, setShowCancel] = useState(false)
    const [selBookingId, setSelBookingId] = useState<string | null>(null)

    const handleOpenCancel = (id: string) => {
        setSelBookingId(id)
        setShowCancel(true)
    }

    const handleCancel = async () => {
        if (!selBookingId) return
        await cancelBookings(selBookingId)
        setBookings(b => b.filter(x => x.id !== selBookingId))
        setShowCancel(false)
    }

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
        <div className='w-full px-8 pt-6 space-y-4 lg:px-0'>
            <div className='flex items-center gap-3'>
                <h2 className='m-0 text-2xl font-semibold'>Upcoming trips</h2>
                <PlaneTakeoff className='text-brand-primary'/>
            </div>

            {bookings.length === 0 && (
                <p className='rounded-lg bg-white p-4 px-6 text-gray-600'>
                    No bookings yet.<br/> Go to
                    <Link to={'/explore'} className='ml-1 font-semibold text-brand-primary'>
                        explore
                    </Link> here.
                </p>
            )}

            <ul className='grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
                {bookings.map((booking) => (
                    <li key={booking.id}
                        className='flex h-28 items-center justify-between rounded-lg bg-white p-4 shadow duration-400 transition-transform hover:shadow-md lg:w-80'
                    >
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

                        <Trash2
                            onClick={e => {
                                e.stopPropagation();
                                handleOpenCancel(booking.id)
                            }}
                            className='cursor-pointer text-red-500 transition-transform hover:scale-110'
                        >
                            <title>Cancel booking</title>
                        </Trash2>
                    </li>
                ))}
            </ul>

            <ConfirmModal
                isOpen={showCancel}
                onClose={() => setShowCancel(false)}
                onConfirm={handleCancel}
                title='Cancel booking'
                message='Are you sure you want to cancel this booking?'
                confirmText='Cancel booking'
            />
        </div>
    )
}