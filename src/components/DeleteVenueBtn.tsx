import { useState } from 'react';
import { deleteVenue } from '../api/venues.tsx';

export function DeleteVenueBtn({ venueId, onDelete }: { venueId: string, onDelete: () => void }) {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteVenue(venueId);
            onDelete();
            setShowModal(false);
        } catch (e) {
            alert('Failed to delete');
        }
    };

    return (
        <>
            <button
                className='w-28 cursor-pointer rounded bg-red-500 px-3 py-1 text-white'
                onClick={() => setShowModal(true)}
            >
                Delete
            </button>

            {showModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-[4px]'>
                    <div className='rounded bg-white p-6 shadow-lg'>
                        <p>Are you sure you want to delete this venue?</p>
                        <div className='mt-4 flex justify-end gap-4'>
                            <button onClick={handleDelete} className='rounded bg-red-500 px-4 py-2 text-white'>Delete
                            </button>
                            <button onClick={() => setShowModal(false)}
                                    className='rounded bg-gray-300 px-4 py-2'>Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
