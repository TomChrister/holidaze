import { ConfirmModalProps } from '../types/venue';

export default function ConfirmModal({
    isOpen, onClose, onConfirm,
    title = 'Confirm', message,
    confirmText = 'Delete',
}: ConfirmModalProps) {
    if (!isOpen) return null
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4' onClick={onClose}>
            <div
                role='dialog'
                aria-modal='true'
                className='w-full max-w-sm rounded-card bg-white p-6'
                onClick={e => e.stopPropagation()}
            >
                {title && <h2 className='section-heading'>{title}</h2>}
                <p className='mt-2 text-graphite'>{message}</p>
                <div className='mt-6 flex justify-end gap-2'>
                    <button onClick={onClose} className='btn-secondary'>
                        Keep it
                    </button>
                    <button onClick={onConfirm} className='btn-danger'>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}
