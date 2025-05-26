import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteVenue, ownVenues } from '../../api/venues.tsx';
import { formatDate } from '../../utils';
import { CreateVenueLink } from '../../components/HeaderLinks.tsx';
import { House, SquarePen, Trash2 } from 'lucide-react';
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

    return (
        <div className='w-full px-8 pt-6 lg:px-0 lg:pt-6'>
            <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-4'>
                    <h1 className='text-2xl font-semibold'>My venues</h1>
                    <House className='text-brand-primary'/>
                </div>
                <Link to='/create' className='font-semibold text-brand-primary hover:underline'>
                    Create new
                </Link>
            </div>

            <ul className='flex flex-col gap-4 pt-4 space-y-6'>
                {venues.length === 0 && (
                    <p className='rounded-lg bg-white p-4 px-6 text-gray-600'>You haven't created a venue yet.<br/>
                        go to
                        <span className='ml-1 font-semibold text-brand-primary'>
                            <CreateVenueLink/>.
                        </span>
                    </p>
                )}

                {venues.map((venue: any) => (
                    <li key={venue.id}
                        className='m-0 rounded-lg bg-white p-4 shadow transition-transform min-h-28 duration-400 hover:shadow-md'>
                        <div className='block'>
                            <div className='flex items-center justify-between'>
                                <Link to={`/venues/${venue.id}`}>
                                    <h2 className='text-xl font-semibold'>{venue.name}</h2>
                                </Link>
                                <div className='flex gap-4'>
                                    <SquarePen
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/venues/${venue.id}/edit`);
                                        }}
                                        className='cursor-pointer transition-transform text-brand-primary hover:scale-110'
                                    >
                                        <title>Edit venue</title>
                                        Edit
                                    </SquarePen>

                                    <Trash2
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenModal(venue.id);
                                        }}
                                        className='cursor-pointer text-red-500 transition-transform hover:scale-110'
                                    >
                                        <title>Delete venue</title>
                                        Delete
                                    </Trash2>
                                </div>
                            </div>

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
                                <p className='mt-2 text-sm text-gray-500'>No bookings for this venue yet</p>
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
        </div>
    );
}
