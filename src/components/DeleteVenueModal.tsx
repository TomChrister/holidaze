import { DeleteVenueModalProps } from '../types/venue';

export default function DeleteVenueModal({ isOpen, onClose, onConfirm }: DeleteVenueModalProps) {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs'>
            <div className='mx-4 w-full max-w-sm rounded bg-white p-6 shadow-lg'>
                <p>Are you sure you want to delete this venue?</p>
                <div className='mt-4 flex justify-center gap-4'>
                    <button
                        onClick={onConfirm}
                        className='cursor-pointer rounded bg-red-500 px-4 py-2 text-white'
                    >
                        Delete
                    </button>
                    <button
                        onClick={onClose}
                        className='cursor-pointer rounded bg-gray-300 px-4 py-2'
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

