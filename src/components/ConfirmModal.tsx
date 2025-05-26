import { ConfirmModalProps } from '../types/venue';

export default function ConfirmModal({
    isOpen, onClose, onConfirm,
    title = 'Confirm', message,
    confirmText = 'Delete',
}: ConfirmModalProps) {
    if (!isOpen) return null
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs'>
            <div className='mx-4 w-full max-w-sm rounded bg-white p-6 shadow-lg'>
                {title && <h2 className='mb-2 text-lg font-semibold'>{title}</h2>}
                <p>{message}</p>
                <div className='mt-4 flex justify-center gap-4'>
                    <button
                        onClick={onConfirm}
                        className='cursor-pointer rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
                    >
                        {confirmText}
                    </button>

                    <button
                        onClick={onClose}
                        className='cursor-pointer rounded bg-gray-300 px-4 py-2 hover:bg-gray-400'
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}
