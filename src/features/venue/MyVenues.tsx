import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteVenue, ownVenues } from '../../api/venues.tsx';
import { formatDate } from '../../utils';
import { CreateVenueLink } from '../../components/HeaderLinks.tsx';
import { SquarePen, Trash2 } from 'lucide-react';
import DeleteVenueModal from '../../components/DeleteVenueModal.tsx';

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
        await deleteVenue(selectedVenueId);
        setVenues((prev) => prev.filter((v) => v.id !== selectedVenueId));
        setShowModal(false);
    };

    useEffect(() => {
        if (username) {
            ownVenues(username).then(setVenues).catch(console.error);
        }
    }, [username]);

    return (
        <div className='w-full px-8 pt-12 bg-brand-secondary lg:pr-20 lg:pt-6'>
            <h1 className='text-2xl font-bold'>My venues</h1>
            <ul className='flex flex-col gap-4 pt-4 space-y-6 lg:pt-6'>
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
                        onClick={() => navigate(`/venues/${venue.id}`)}
                        className='m-0 rounded-lg bg-white p-4 shadow transition-transform min-h-28 duration-400 hover:scale-102'
                    >
                        <div className='flex items-center justify-between'>
                            <Link to={venue.id}>
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
                                    Edit
                                </SquarePen>

                                <Trash2
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenModal(venue.id);
                                    }}
                                    className='cursor-pointer text-red-500 transition-transform hover:scale-110'
                                >
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
                    </li>
                ))}

                <DeleteVenueModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleDelete}
                />
            </ul>
        </div>
    );
}
