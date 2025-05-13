import { useForm } from 'react-hook-form';
import { createVenue } from '../api/venues.tsx';
import { VenueProps } from '../types/venue';
import { CarFront, PawPrint, Utensils, Wifi } from 'lucide-react'
import toast from 'react-hot-toast';

export function CreateVenueForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
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
                <p className='text-gray-400'>When creating a listing these are the required fields:</p>
                <p className='text-gray-400'>
                    - Name<br/>
                    - Description<br/>
                    - Image URL<br/>
                    - Price<br/>
                    - Max Guests<br/>
                </p>
            </div>

            <div className='mx-auto max-w-xl px-6'>
                <hr className='my-4 border-t border-gray-300'/>
            </div>

            <div className='mx-auto max-w-xl px-6 py-1 pt-4'>
                <h3 className='text-xl font-semibold'>Home details</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='mx-auto max-w-xl rounded-md p-6 space-y-4'>
                <input
                    {...register('name', { required: 'Name is required' })}
                    placeholder='Name *'
                    className='rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
                {errors.name && (
                    <p className='text-red-500'>
                        {errors.name.message}
                    </p>
                )}

                <textarea {...register('description', { required: 'Description is required' })}
                          placeholder='Description *'
                          className='h-32 rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
                {errors.description && (
                    <p className='text-red-500'>
                        {errors.description.message}
                    </p>
                )}

                <input {...register('media.0.url', { required: 'Img URL is required, and must be a live link to a image URL' })}
                       placeholder='Image URL *'
                       className='rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
                {errors.media?.[0]?.url && (
                    <p className='text-red-500'>
                        {errors.media?.[0]?.url.message}
                    </p>
                )}
                <input {...register('media.0.alt')}
                       placeholder='Describe your image'
                       className='rounded border-none input bg-brand-tierty placeholder-gray-400'
                />

                <h3 className='pt-4 text-xl font-semibold'>Pricing & capacity</h3>
                <input
                    type='number'
                    placeholder='Price *'
                    defaultValue=''
                    {...register('price', { valueAsNumber: true, required: 'Price is required' })}
                    className='rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
                {errors.price && (
                    <p className='text-red-500'>
                        {errors.price.message}
                    </p>
                )}

                <input
                    type='number'
                    placeholder='Max Guests *'
                    defaultValue=''
                    {...register('maxGuests', { valueAsNumber: true, required: 'Max guests is required' })}
                    className='rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
                {errors.maxGuests && (
                    <p className='text-red-500'>
                        {errors.maxGuests.message}
                    </p>
                )}

                <h3 className='pt-4 text-xl font-semibold'>Facilities</h3>
                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex items-center justify-between'>
                    <span className='flex gap-1'>
                        <Wifi className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>
                        WiFi
                    </span>
                        <label className='relative inline-block h-6 w-12 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='h-0 w-0 opacity-0 peer'
                                {...register('meta.wifi')}
                            />
                            <span
                                className='absolute inset-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-brand-primary'/>
                            <span
                                className='absolute top-0 left-0 h-6 w-6 peer-checked:translate-x-full rounded-full bg-white shadow-md transition-transform'/>
                        </label>
                    </div>

                    <div className='flex items-center justify-between'>
                    <span className='flex gap-1'>
                        <CarFront className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>
                        Parking
                    </span>
                        <label className='relative inline-block h-6 w-12 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='h-0 w-0 opacity-0 peer'
                                {...register('meta.parking')}
                            />
                            <span
                                className='absolute inset-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-brand-primary'/>
                            <span
                                className='absolute top-0 left-0 h-6 w-6 peer-checked:translate-x-full rounded-full bg-white shadow-md transition-transform'/>
                        </label>
                    </div>

                    <div className='flex items-center justify-between'>
                    <span className='flex gap-1'>
                        <Utensils className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>
                        Breakfast
                    </span>
                        <label className='relative inline-block h-6 w-12 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='h-0 w-0 opacity-0 peer'
                                {...register('meta.breakfast')}
                            />
                            <span
                                className='absolute inset-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-brand-primary'/>
                            <span
                                className='absolute top-0 left-0 h-6 w-6 peer-checked:translate-x-full rounded-full bg-white shadow-md transition-transform'/>
                        </label>
                    </div>

                    <div className='flex items-center justify-between'>
                    <span className='flex gap-1'>
                        <PawPrint className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>
                        Pets
                    </span>
                        <label className='relative inline-block h-6 w-12 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='h-0 w-0 opacity-0 peer'
                                {...register('meta.pets')}
                            />
                            <span
                                className='absolute inset-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-brand-primary'/>
                            <span
                                className='absolute top-0 left-0 h-6 w-6 peer-checked:translate-x-full rounded-full bg-white shadow-md transition-transform'/>
                        </label>
                    </div>
                </div>

                <h3 className='pt-4 text-xl font-bold'>Location</h3>
                <input {...register('location.address')}
                       placeholder='Address'
                       className='rounded border-none input bg-brand-tierty placeholder-gray-400'/>
                <input {...register('location.city')}
                       placeholder='City'
                       className='rounded border-none input bg-brand-tierty placeholder-gray-400'/>
                <input {...register('location.country')}
                       placeholder='Country'
                       className='rounded border-none input bg-brand-tierty placeholder-gray-400'/>
                <input {...register('location.zip')}
                       placeholder='ZIP'
                       className='rounded border-none input bg-brand-tierty placeholder-gray-400'/>

                <button type='submit'
                        className='my-4 cursor-pointer rounded px-4 py-2 text-white bg-brand-primary hover:opacity-90'>
                    Create Venue
                </button>
            </form>
        </>
    );
}