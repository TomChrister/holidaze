import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { singleVenue, updateVenue } from '../../api/venues.tsx';
import { EditVenueProps } from '../../types/venue';
import { CarFront, PawPrint, Utensils, Wifi } from 'lucide-react';
import toast from 'react-hot-toast';

export function EditVenue() {
    const { id } = useParams<{ id: string }>()
    const [venue, setVenue] = useState<EditVenueProps>({
        name: '',
        description: '',
        media: [{ url: '', alt: '' }],
        price: 0,
        maxGuests: 0,
        meta: { wifi: false, parking: false, breakfast: false, pets: false },
        location: {
            address: '',
            city: '',
            zip: '',
            country: '',
        },
    })

    useEffect(() => {
        singleVenue(id!)
            .then(setVenue)
            .catch(console.error);
    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement
        setVenue(v => ({
            ...v,
            [name]: type === 'number' ? +value : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateVenue(id!, venue);
            toast.success('Venue updated successfully!');
            setTimeout(() => {
                window.location.href = '/profile';
            }, 1500);
        } catch (err: any) {
            toast.error('Failed to update venue. Please try again.');
            console.error('Update failed', err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='mx-auto flex max-w-xl flex-col rounded-md p-4 px-6 space-y-4'>
            <h3 className='text-xl font-semibold'>Home details</h3>
            <label>
                Name
                <input
                    name='name'
                    value={venue.name}
                    onChange={handleChange}
                    className='rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
            </label>

            <label>
                Description
                <textarea
                    name='description'
                    value={venue.description}
                    onChange={handleChange}
                    className='h-32 rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
            </label>

            <h3 className='pt-3 text-xl font-semibold'>Media</h3>
            {(venue.media ?? []).map((m, i) => (
                <div key={i} className='space-y-2'>
                    <label>
                        Image URL
                        <input
                            name={`media.${i}.url`}
                            value={m.url}
                            onChange={handleChange}
                            className='rounded border-none input bg-brand-tierty placeholder-gray-400'
                        />
                    </label>
                </div>
            ))}

            <h3 className='pt-3 text-xl font-semibold'>Pricing and capacity</h3>
            <label>
                Price
                <input
                    type='number'
                    name='price'
                    value={venue.price}
                    onChange={handleChange}
                    className='rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
            </label>

            <label>
                Max Guests
                <input
                    type='number'
                    name='maxGuests'
                    value={venue.maxGuests}
                    onChange={handleChange}
                    className='rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
            </label>

            <h3 className='pt-4 text-xl font-semibold'>Facilities</h3>
            <div className='grid grid-cols-2 gap-6'>
                <div className='flex items-center justify-between'>
                    <span className='flex gap-1'>
                        <Wifi className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>
                        WiFi
                    </span>
                    <label className='relative inline-block h-6 w-12'>
                        <input
                            type='checkbox'
                            className='h-0 w-0 opacity-0 peer'
                            checked={venue.meta?.wifi}
                            onChange={e =>
                                setVenue(v => ({
                                    ...v,
                                    meta: { ...v.meta, wifi: e.target.checked }
                                }))
                            }
                        />
                        <span
                            className='absolute inset-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-brand-primary'
                        />
                        <span
                            className='absolute top-0 left-0 h-6 w-6 peer-checked:translate-x-full rounded-full bg-white shadow-md transition-transform'
                        />
                    </label>
                </div>

                <div className='flex items-center justify-between'>
                    <span className='flex gap-1'>
                        <CarFront className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>
                        Parking
                    </span>
                    <label className='relative inline-block h-6 w-12'>
                        <input
                            type='checkbox'
                            className='h-0 w-0 opacity-0 peer'
                            checked={venue.meta?.parking}
                            onChange={e =>
                                setVenue(v => ({
                                    ...v,
                                    meta: { ...v.meta, parking: e.target.checked }
                                }))
                            }
                        />
                        <span
                            className='absolute inset-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-brand-primary'
                        />
                        <span
                            className='absolute top-0 left-0 h-6 w-6 peer-checked:translate-x-full rounded-full bg-white shadow-md transition-transform'
                        />
                    </label>
                </div>

                <div className='flex items-center justify-between'>
                    <span className='flex gap-1'>
                        <Utensils className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>
                        Breakfast
                    </span>
                    <label className='relative inline-block h-6 w-12'>
                        <input
                            type='checkbox'
                            className='h-0 w-0 opacity-0 peer'
                            checked={venue.meta?.breakfast}
                            onChange={e =>
                                setVenue(v => ({
                                    ...v,
                                    meta: { ...v.meta, breakfast: e.target.checked }
                                }))
                            }
                        />
                        <span
                            className='absolute inset-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-brand-primary'
                        />
                        <span
                            className='absolute top-0 left-0 h-6 w-6 peer-checked:translate-x-full rounded-full bg-white shadow-md transition-transform'
                        />
                    </label>
                </div>

                <div className='flex items-center justify-between'>
                    <span className='flex gap-1'>
                        <PawPrint className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>
                        Pets
                    </span>
                    <label className='relative inline-block h-6 w-12'>
                        <input
                            type='checkbox'
                            className='h-0 w-0 opacity-0 peer'
                            checked={venue.meta?.pets}
                            onChange={e =>
                                setVenue(v => ({
                                    ...v,
                                    meta: { ...v.meta, pets: e.target.checked }
                                }))
                            }
                        />
                        <span
                            className='absolute inset-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-brand-primary'
                        />
                        <span
                            className='absolute top-0 left-0 h-6 w-6 peer-checked:translate-x-full rounded-full bg-white shadow-md transition-transform'
                        />
                    </label>
                </div>
            </div>

            <h3 className='pt-4 text-xl font-semibold'>Location</h3>
            <label>
                Address
                <input
                    value={venue.location?.address}
                    onChange={e =>
                        setVenue(v => ({
                            ...v,
                            location: { ...v.location, address: e.target.value }
                        }))
                    }
                    className='rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
            </label>

            <label>
                City
                <input
                    value={venue.location?.city}
                    onChange={e =>
                        setVenue(v => ({
                            ...v,
                            location: { ...v.location, city: e.target.value }
                        }))
                    }
                    className='rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
            </label>

            <label>
                Country
                <input
                    value={venue.location?.country}
                    onChange={e =>
                        setVenue(v => ({
                            ...v,
                            location: { ...v.location, country: e.target.value }
                        }))
                    }
                    className='rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
            </label>

            <button
                type='submit'
                className='mt-4 cursor-pointer rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600'
            >
                Save changes
            </button>
        </form>
    )
}