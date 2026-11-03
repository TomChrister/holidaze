import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteVenue, ownVenues } from '../../api/venues.tsx';
import { formatDate } from '../../utils/helperFunctions.tsx';
import { CreateVenueLink } from '../../components/HeaderLinks.tsx';
import { isVenueManager } from '../../utils/authHelpers.ts';
import { Plus, SquarePen, Trash2 } from 'lucide-react';
import ConfirmModal from '../../components/ConfirmModal.tsx';

export function MyVenues() {
    const navigate = useNavigate();

    const [venues, setVenues] = useState<any[]>([]);
    const username = localStorage.getItem('name');

    const [showModal, setShowModal] = useState(false);
    const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

    const handleOpenModal = (venueId: string) => {
        setSelectedVenueId(venueId);
        setShowModal(true);
    };

    const handleDelete = async () => {
        if (!selectedVenueId) return;
        try {
            await deleteVenue(selectedVenueId);
            setVenues(v => v.filter(x => x.id !== selectedVenueId));
        } catch (e) {
            console.error(e);
        } finally {
            setShowModal(false);
        }
    };

    useEffect(() => {
        if (username) {
            ownVenues(username).then(setVenues).catch(console.error);
        }
    }, [username]);

    const iconButton = 'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-divider text-ink transition-colors hover:border-ink';

    return (
        <section>
            <div className='flex items-center justify-between gap-3'>
                <h2 className='section-heading'>My venues</h2>
                {isVenueManager() && (
                    <Link to='/create' className='btn-secondary py-2'>
                        <Plus size={16}/>
                        New venue
                    </Link>
                )}
            </div>

            {venues.length === 0 && (
                <div className='mt-4 rounded-card bg-cloud p-6 text-graphite'>
                    You haven't listed a venue yet.{' '}
                    <span className='link font-semibold'><CreateVenueLink/></span>
                </div>
            )}

            <ul className='mt-4 flex flex-col gap-4'>
                {venues.map((venue: any) => (
                    <li key={venue.id} className='card flex flex-col gap-4 p-4 sm:flex-row'>
                        <Link to={`/venues/${venue.id}`} className='shrink-0'>
                            <img
                                src={venue.media?.[0]?.url || '/default-img.jpg'}
                                alt={venue.name}
                                className='aspect-[4/3] w-full rounded-control object-cover sm:w-40'
                            />
                        </Link>

                        <div className='min-w-0 flex-1'>
                            <div className='flex items-start justify-between gap-3'>
                                <Link to={`/venues/${venue.id}`} className='min-w-0'>
                                    <h3 className='truncate text-lg font-bold hover:underline'>{venue.name}</h3>
                                    <p className='text-sm text-graphite'>
                                        ${venue.price} / night · {venue.maxGuests} guests
                                    </p>
                                </Link>
                                <div className='flex shrink-0 gap-2'>
                                    <button
                                        onClick={() => navigate(`/venues/${venue.id}/edit`)}
                                        aria-label='Edit venue'
                                        title='Edit venue'
                                        className={iconButton}
                                    >
                                        <SquarePen size={16}/>
                                    </button>
                                    <button
                                        onClick={() => handleOpenModal(venue.id)}
                                        aria-label='Delete venue'
                                        title='Delete venue'
                                        className={`${iconButton} hover:border-red-600 hover:text-red-600`}
                                    >
                                        <Trash2 size={16}/>
                                    </button>
                                </div>
                            </div>

                            {venue.bookings && venue.bookings.length > 0 ? (
                                <div className='mt-4 border-t border-divider pt-3'>
                                    <h4 className='text-xs font-bold tracking-wide uppercase'>
                                        Bookings ({venue.bookings.length})
                                    </h4>
                                    <ul className='mt-2 flex flex-col gap-1'>
                                        {venue.bookings.map((booking: any) => (
                                            <li key={booking.id} className='text-sm text-graphite'>
                                                {formatDate(booking.dateFrom)} – {formatDate(booking.dateTo)}
                                                {' · '}{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <p className='mt-4 border-t border-divider pt-3 text-sm text-graphite'>
                                    No bookings yet
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                title='Delete venue'
                message='Are you sure you want to delete this venue?'
                confirmText='Delete'
            />
        </section>
    );
}
