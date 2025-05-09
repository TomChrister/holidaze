import { DeleteVenueModalProps } from '../types/venue';

export default function DeleteVenueModal({ isOpen, onClose, onConfirm }: DeleteVenueModalProps) {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs'>
            <div className='rounded bg-white p-6 shadow-lg w-full max-w-sm mx-4'>
                <p>Are you sure you want to delete this venue?</p>
                <div className='mt-4 flex justify-center gap-4'>
                    <button
                        onClick={onConfirm}
                        className='rounded bg-red-500 px-4 py-2 text-white cursor-pointer'
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className='rounded bg-gray-300 px-4 py-2 cursor-pointer'
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

