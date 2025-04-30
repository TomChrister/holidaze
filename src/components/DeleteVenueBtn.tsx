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
                className='px-3 py-1 bg-red-500 text-white rounded'
                onClick={() => setShowModal(true)}
            >
                Delete
            </button>

            {showModal && (
                <div className='fixed inset-0 bg-opacity-50 backdrop-blur-[4px] flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded shadow-lg'>
                        <p>Are you sure you want to delete this venue?</p>
                        <div className='mt-4 flex justify-end gap-4'>
                            <button onClick={handleDelete} className='px-4 py-2 bg-red-500 text-white rounded'>Delete
                            </button>
                            <button onClick={() => setShowModal(false)}
                                    className='px-4 py-2 bg-gray-300 rounded'>Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
