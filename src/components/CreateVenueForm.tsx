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
        <div className='container-page'>
            <div className='mx-auto max-w-2xl pt-10 pb-8'>
                <h1 className='page-heading'>List your home</h1>
                <p className='mt-2 text-base text-graphite'>
                    Share your space with travelers. Fields marked with * are required.
                </p>
            </div>
            <VenueForm onSubmit={onSubmit} submitText='Create venue'/>
        </div>
    );
}
