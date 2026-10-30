import { createVenue } from '../api/venues.tsx';
import { VenueFormData } from '../types/venue';
import { VenueForm } from './VenueForm.tsx';
import toast from 'react-hot-toast';

export function CreateVenueForm() {
    const onSubmit = async (data: VenueFormData) => {
        try {
            await createVenue(data);
            toast.success('Venue created successfully!');
            setTimeout(() => {
                window.location.href = '/profile';
            }, 1500);
        } catch (err) {
            console.error(err);
            toast.error('Failed to create venue. Please try again.');
        }
    };

    return (
        <>
            <div className='mx-auto flex max-w-xl flex-col justify-start gap-2 px-6 pt-8 pb-4'>
                <h1 className='text-3xl font-semibold'>List your home</h1>
                <p className='text-gray-400'>Share your space with travelers, fill out the details below</p>
                <p className='text-gray-400'>Fields marked with * are required.</p>
                <hr className='my-4 border-t border-gray-300'/>
            </div>

            <VenueForm onSubmit={onSubmit} submitText='Create venue'/>
        </>
    );
}
