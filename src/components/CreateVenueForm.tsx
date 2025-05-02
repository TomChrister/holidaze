import { useForm } from 'react-hook-form';
import { createVenue } from '../api/venues.tsx';
import { VenueProps } from '../types/venue';
import { CarFront, PawPrint, Utensils, Wifi } from 'lucide-react'

export function CreateVenueForm() {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<VenueProps>({
        defaultValues: {
            name: '',
            description: '',
            media: [{ url: '', alt: '' }],
            meta: {
                wifi: false,
                parking: false,
                breakfast: false,
                pets: false,
            },
            location: {
                address: '',
                city: '',
                zip: '',
                country: '',
            },
        },
    });

    const onSubmit = async (data: VenueProps) => {
        try {
            await createVenue(data);
            alert('Venue created!');
            reset();
            window.location.href = '/';
        } catch (err) {
            console.error(err);
            alert('Failed to create venue.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 max-w-xl mx-auto p-4'>
            <input {...register('name', { required: true })} placeholder='Name' className='input'/>
            <textarea {...register('description', { required: true })} placeholder='Description' className='input'/>

            <input {...register('media.0.url')} placeholder='Image URL' className='input'/>
            <input {...register('media.0.alt')} placeholder='Image alt' className='input'/>

            <input
                type='number'
                placeholder='Price'
                defaultValue=''
                {...register('price', { valueAsNumber: true, required: true })}
                className='input'
            />
            <input
                type='number'
                placeholder='Max Guests'
                defaultValue=''
                {...register('maxGuests', { valueAsNumber: true, required: true })}
                className='input'
            />

            <h3>Facilities</h3>
            <div className='grid grid-cols-2 gap-6'>
                <div className='flex justify-between items-center'>
                    <span className='flex gap-1'>
                        <Wifi className='bg-amber-300 rounded p-1'/>
                        WiFi
                    </span>
                    <label className='relative inline-block w-12 h-6'>
                        <input
                            type='checkbox'
                            className='opacity-0 w-0 h-0 peer'
                            {...register('meta.wifi')}
                        />
                        <span className='absolute inset-0 rounded-full bg-gray-300 peer-checked:bg-blue-500 transition-colors'/>
                        <span className='absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform'/>
                    </label>
                </div>

                <div className='flex justify-between items-center'>
                    <span className='flex gap-1'>
                        <CarFront className='bg-amber-300 rounded p-1'/>
                        Parking
                    </span>
                    <label className='relative inline-block w-12 h-6'>
                        <input
                            type='checkbox'
                            className='opacity-0 w-0 h-0 peer'
                            {...register('meta.parking')}
                        />
                        <span className='absolute inset-0 rounded-full bg-gray-300 peer-checked:bg-blue-500 transition-colors'/>
                        <span className='absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform'/>
                    </label>
                </div>

                <div className='flex justify-between items-center'>
                    <span className='flex gap-1'>
                        <Utensils className='bg-amber-300 rounded p-1'/>
                        Breakfast
                    </span>
                    <label className='relative inline-block w-12 h-6'>
                        <input
                            type='checkbox'
                            className='opacity-0 w-0 h-0 peer'
                            {...register('meta.breakfast')}
                        />
                        <span
                            className='absolute inset-0 rounded-full bg-gray-300 peer-checked:bg-blue-500 transition-colors'/>
                        <span
                            className='absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform'/>
                    </label>
                </div>

                <div className='flex justify-between items-center'>
                    <span className='flex gap-1'>
                        <PawPrint className='bg-amber-300 rounded p-1'/>
                        Pets
                    </span>
                    <label className='relative inline-block w-12 h-6'>
                        <input
                            type='checkbox'
                            className='opacity-0 w-0 h-0 peer'
                            {...register('meta.pets')}
                        />
                        <span
                            className='absolute inset-0 rounded-full bg-gray-300 peer-checked:bg-blue-500 transition-colors'/>
                        <span
                            className='absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform'/>
                    </label>
                </div>
            </div>

            <h3 className='font-bold'>Location</h3>
            <input {...register('location.address')} placeholder='Address' className='input'/>
            <input {...register('location.city')} placeholder='City' className='input'/>
            <input {...register('location.country')} placeholder='Country' className='input'/>
            <input {...register('location.zip')} placeholder='ZIP' className='input'/>

            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>
                Create Venue
            </button>
        </form>
    );
}