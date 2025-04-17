import { useForm } from 'react-hook-form';
import { createVenue } from "../api/venues.tsx";
import { VenueFormData } from "../types/venues";

export function CreateVenueForm() {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<VenueFormData>({
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            maxGuests: 1,
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
                continent: '',
            },
        },
    });

    const onSubmit = async (data: VenueFormData) => {
        try {
            await createVenue(data);
            alert("Venue created!");
            reset();
            window.location.href = "/";
        } catch (err) {
            console.error(err);
            alert("Failed to create venue.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 max-w-xl mx-auto p-4'>
            <input {...register('name', { required: true })} placeholder='Name' className='input'/>
            <textarea {...register('description', { required: true })} placeholder='Description' className='input'/>

            <input {...register('media.0.url')} placeholder='Image URL' className='input'/>
            <input {...register('media.0.alt')} placeholder='Image alt' className='input'/>

            <input type='number' {...register('price', { valueAsNumber: true, required: true })} placeholder='Price'
                   className='input'/>
            <input type='number' {...register('maxGuests', { valueAsNumber: true, required: true })}
                   placeholder='Max Guests' className='input'/>

            <div className='space-y-1'>
                <label><input type='checkbox' {...register('meta.wifi')} /> Wifi</label>
                <label><input type='checkbox' {...register('meta.parking')} /> Parking</label>
                <label><input type='checkbox' {...register('meta.breakfast')} /> Breakfast</label>
                <label><input type='checkbox' {...register('meta.pets')} /> Pets</label>
            </div>

            <h3 className='font-bold'>Location</h3>
            <input {...register('location.address')} placeholder='Address' className='input'/>
            <input {...register('location.city')} placeholder='City' className='input'/>
            <input {...register('location.zip')} placeholder='ZIP' className='input'/>
            <input {...register('location.country')} placeholder='Country' className='input'/>
            <input {...register('location.continent')} placeholder='Continent' className='input'/>

            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
                Create Venue
            </button>
        </form>
    );
}