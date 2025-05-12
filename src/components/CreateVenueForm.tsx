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
            <div className='flex flex-col justify-start max-w-xl mx-auto px-4 pt-8 pb-4 gap-2'>
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

            <div className='max-w-xl mx-auto px-4'>
                <hr className='border-t border-gray-300 my-4'/>
            </div>

            <div className='max-w-xl mx-auto py-1 px-4 pt-4'>
                <h3 className='text-xl font-semibold'>Home details</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 max-w-xl mx-auto p-4 rounded-md'>
                <input
                    {...register('name', { required: 'Name is required' })}
                    placeholder='Name *'
                    className='input bg-brand-tierty border-none rounded placeholder-gray-400'
                />
                {errors.name && (
                    <p className='text-red-500'>
                        {errors.name.message}
                    </p>
                )}

                <textarea {...register('description', { required: 'Description is required' })}
                          placeholder='Description *'
                          className='input bg-brand-tierty border-none rounded placeholder-gray-400 h-32'
                />
                {errors.description && (
                    <p className='text-red-500'>
                        {errors.description.message}
                    </p>
                )}

                <input {...register('media.0.url', { required: 'Img URL is required, and must be a live link to a image URL' })}
                       placeholder='Image URL *'
                       className='input bg-brand-tierty border-none rounded placeholder-gray-400'
                />
                {errors.media?.[0]?.url && (
                    <p className='text-red-500'>
                        {errors.media?.[0]?.url.message}
                    </p>
                )}
                <input {...register('media.0.alt')}
                       placeholder='Describe your image'
                       className='input bg-brand-tierty border-none rounded placeholder-gray-400'
                />

                <h3 className='text-xl pt-4 font-semibold'>Pricing & capacity</h3>
                <input
                    type='number'
                    placeholder='Price *'
                    defaultValue=''
                    {...register('price', { valueAsNumber: true, required: 'Price is required' })}
                    className='input bg-brand-tierty border-none rounded placeholder-gray-400'
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
                    className='input bg-brand-tierty border-none rounded placeholder-gray-400'
                />
                {errors.maxGuests && (
                    <p className='text-red-500'>
                        {errors.maxGuests.message}
                    </p>
                )}

                <h3 className='text-xl pt-4 font-semibold'>Facilities</h3>
                <div className='grid grid-cols-2 gap-6'>
                    <div className='flex justify-between items-center'>
                    <span className='flex gap-1'>
                        <Wifi className='bg-brand-tierty rounded p-1' color='#634AFF' size={30}/>
                        WiFi
                    </span>
                        <label className='relative inline-block w-12 h-6 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='opacity-0 w-0 h-0 peer'
                                {...register('meta.wifi')}
                            />
                            <span
                                className='absolute inset-0 rounded-full bg-gray-300 peer-checked:bg-brand-primary transition-colors'/>
                            <span
                                className='absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform'/>
                        </label>
                    </div>

                    <div className='flex justify-between items-center'>
                    <span className='flex gap-1'>
                        <CarFront className='bg-brand-tierty rounded p-1' color='#634AFF' size={30}/>
                        Parking
                    </span>
                        <label className='relative inline-block w-12 h-6 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='opacity-0 w-0 h-0 peer'
                                {...register('meta.parking')}
                            />
                            <span
                                className='absolute inset-0 rounded-full bg-gray-300 peer-checked:bg-brand-primary transition-colors'/>
                            <span
                                className='absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform'/>
                        </label>
                    </div>

                    <div className='flex justify-between items-center'>
                    <span className='flex gap-1'>
                        <Utensils className='bg-brand-tierty rounded p-1' color='#634AFF' size={30}/>
                        Breakfast
                    </span>
                        <label className='relative inline-block w-12 h-6 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='opacity-0 w-0 h-0 peer'
                                {...register('meta.breakfast')}
                            />
                            <span
                                className='absolute inset-0 rounded-full bg-gray-300 peer-checked:bg-brand-primary transition-colors'/>
                            <span
                                className='absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform'/>
                        </label>
                    </div>

                    <div className='flex justify-between items-center'>
                    <span className='flex gap-1'>
                        <PawPrint className='bg-brand-tierty rounded p-1' color='#634AFF' size={30}/>
                        Pets
                    </span>
                        <label className='relative inline-block w-12 h-6 cursor-pointer'>
                            <input
                                type='checkbox'
                                className='opacity-0 w-0 h-0 peer'
                                {...register('meta.pets')}
                            />
                            <span
                                className='absolute inset-0 rounded-full bg-gray-300 peer-checked:bg-brand-primary transition-colors'/>
                            <span
                                className='absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform'/>
                        </label>
                    </div>
                </div>

                <h3 className='text-xl pt-4 font-bold'>Location</h3>
                <input {...register('location.address')}
                       placeholder='Address'
                       className='input bg-brand-tierty border-none rounded placeholder-gray-400'/>
                <input {...register('location.city')}
                       placeholder='City'
                       className='input bg-brand-tierty border-none rounded placeholder-gray-400'/>
                <input {...register('location.country')}
                       placeholder='Country'
                       className='input bg-brand-tierty border-none rounded placeholder-gray-400'/>
                <input {...register('location.zip')}
                       placeholder='ZIP'
                       className='input bg-brand-tierty border-none rounded placeholder-gray-400'/>

                <button type='submit'
                        className='bg-brand-primary text-white px-4 py-2 my-4 rounded cursor-pointer hover:opacity-90'>
                    Create Venue
                </button>
            </form>
        </>
    );
}