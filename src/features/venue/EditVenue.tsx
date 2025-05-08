import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { singleVenue, updateVenue } from '../../api/venues.tsx';
import { EditVenueProps } from '../../types/venue';
import { CarFront, PawPrint, Utensils, Wifi } from 'lucide-react';

export function EditVenue() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();
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
            navigate(`/profile`);
        } catch (err: any) {
            console.error('Update failed', err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 space-y-4'>
            <label>
                Name
                <input
                    name='name'
                    value={venue.name}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </label>

            <label>
                Description
                <textarea
                    name='description'
                    value={venue.description}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </label>

            <label>
                Price
                <input
                    type='number'
                    name='price'
                    value={venue.price}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </label>

            <label>
                Max Guests
                <input
                    type='number'
                    name='maxGuests'
                    value={venue.maxGuests}
                    onChange={handleChange}
                    className='border p-2 w-full'
                />
            </label>

            <h3 className='font-semibold'>Media</h3>
            {(venue.media ?? []).map((m, i) => (
                <div key={i} className='space-y-2'>
                    <label>
                        Image URL
                        <input
                            name={`media.${i}.url`}
                            value={m.url}
                            onChange={handleChange}
                            className='border p-2 w-full'
                        />
                    </label>
                </div>
            ))}

            <h3 className='font-semibold'>Facilities</h3>
            <div className='grid grid-cols-2 gap-6'>
                <div className='flex justify-between items-center'>
                    <span className='flex gap-1'><Wifi className='bg-amber-300 rounded p-1'/>WiFi</span>
                    <label className='relative inline-block w-12 h-6'>
                        <input
                            type='checkbox'
                            className='opacity-0 w-0 h-0 peer'
                            checked={venue.meta?.wifi}
                            onChange={e =>
                                setVenue(v => ({
                                    ...v,
                                    meta: { ...v.meta, wifi: e.target.checked }
                                }))
                            }
                        />
                        <span
                            className='absolute inset-0 rounded-full bg-gray-300 peer-checked:bg-blue-500 transition-colors'
                        />
                        <span
                            className='absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform'
                        />
                    </label>
                </div>

                <div className='flex justify-between items-center'>
                    <span className='flex gap-1'><CarFront className='bg-amber-300 rounded p-1'/>Parking</span>
                    <label className='relative inline-block w-12 h-6'>
                        <input
                            type='checkbox'
                            className='opacity-0 w-0 h-0 peer'
                            checked={venue.meta?.parking}
                            onChange={e =>
                                setVenue(v => ({
                                    ...v,
                                    meta: { ...v.meta, parking: e.target.checked }
                                }))
                            }
                        />
                        <span
                            className='absolute inset-0 rounded-full bg-gray-300 peer-checked:bg-blue-500 transition-colors'
                        />
                        <span
                            className='absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform'
                        />
                    </label>
                </div>

                <div className='flex justify-between items-center'>
                    <span className='flex gap-1'><Utensils className='bg-amber-300 rounded p-1'/>Breakfast</span>
                    <label className='relative inline-block w-12 h-6'>
                        <input
                            type='checkbox'
                            className='opacity-0 w-0 h-0 peer'
                            checked={venue.meta?.breakfast}
                            onChange={e =>
                                setVenue(v => ({
                                    ...v,
                                    meta: { ...v.meta, breakfast: e.target.checked }
                                }))
                            }
                        />
                        <span
                            className='absolute inset-0 rounded-full bg-gray-300 peer-checked:bg-blue-500 transition-colors'
                        />
                        <span
                            className='absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform'
                        />
                    </label>
                </div>

                <div className='flex justify-between items-center'>
                    <span className='flex gap-1'><PawPrint className='bg-amber-300 rounded p-1'/>Pets</span>
                    <label className='relative inline-block w-12 h-6'>
                        <input
                            type='checkbox'
                            className='opacity-0 w-0 h-0 peer'
                            checked={venue.meta?.pets}
                            onChange={e =>
                                setVenue(v => ({
                                    ...v,
                                    meta: { ...v.meta, pets: e.target.checked }
                                }))
                            }
                        />
                        <span
                            className='absolute inset-0 rounded-full bg-gray-300 peer-checked:bg-blue-500 transition-colors'
                        />
                        <span
                            className='absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform'
                        />
                    </label>
                </div>
            </div>

            <h3 className='font-semibold'>Location</h3>
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
                    className='border p-2 w-full'
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
                    className='border p-2 w-full'
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
                    className='border p-2 w-full'
                />
            </label>

            <button
                type='submit'
                className='mt-4 px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600'
            >
                Save changes
            </button>
        </form>
    )
}