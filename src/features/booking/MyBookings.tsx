import { useEffect, useState } from 'react';
import { upcomingBookings } from '../../api/bookings.tsx';
import { formatDate } from '../../utils/helperFunctions.tsx';
import { Link } from 'react-router-dom';
import { CalendarDays, Trash2, Users } from 'lucide-react';
import { cancelBookings } from '../../api/venues.tsx';
import ConfirmModal from '../../components/ConfirmModal.tsx';
import toast from 'react-hot-toast';
import { Loader } from '../../components/Loader.tsx';

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
        try {
            await cancelBookings(selBookingId)
            setBookings(b => b.filter(x => x.id !== selBookingId))
        } catch (e) {
            console.error(e)
            toast.error('Could not cancel the booking. Please try again.')
        } finally {
            setShowCancel(false)
        }
    }

    const name = localStorage.getItem('name') || '';

    useEffect(() => {
        if (!name) return

        async function getBookings() {
            try {
                const data = await upcomingBookings(name)
                const now = new Date()
                setBookings(data.filter((b: any) => new Date(b.dateTo) >= now));
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        getBookings();
    }, [name]);

    if (loading) return <Loader/>
    if (error) return <p>Error: {error}</p>

    return (
        <section>
            <h2 className='section-heading'>Upcoming trips</h2>

            {bookings.length === 0 && (
                <div className='mt-4 rounded-card bg-cloud p-6 text-graphite'>
                    No trips booked yet. <Link to='/explore' className='link font-semibold'>Start exploring</Link>
                </div>
            )}

            <ul className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                {bookings.map((booking) => (
                    <li key={booking.id} className='card group relative overflow-hidden'>
                        <Link to={`/venues/${booking.venue.id}`} className='block'>
                            <div className='aspect-[16/9] bg-cloud'>
                                <img
                                    src={booking.venue.media?.[0]?.url || '/default-img.jpg'}
                                    alt={booking.venue.name}
                                    className='h-full w-full object-cover'
                                />
                            </div>
                            <div className='p-4'>
                                <p className='font-bold'>
                                    {[booking.venue.location.city, booking.venue.location.country]
                                        .filter(Boolean).join(', ') || booking.venue.name}
                                </p>
                                <p className='mt-1 flex items-center gap-1.5 text-sm text-graphite'>
                                    <CalendarDays size={14}/>
                                    {formatDate(booking.dateFrom)} – {formatDate(booking.dateTo)}
                                </p>
                                <p className='mt-0.5 flex items-center gap-1.5 text-sm text-graphite'>
                                    <Users size={14}/>
                                    {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                                </p>
                            </div>
                        </Link>

                        <button
                            onClick={() => handleOpenCancel(booking.id)}
                            aria-label='Cancel booking'
                            title='Cancel booking'
                            className='absolute top-3 right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-ink transition-colors hover:text-red-600'
                        >
                            <Trash2 size={16}/>
                        </button>
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
        </section>
    )
}
