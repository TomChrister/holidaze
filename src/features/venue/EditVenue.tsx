import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { singleVenue, updateVenue } from '../../api/venues.tsx';
import toast from 'react-hot-toast';
import { CarFront, PawPrint, Plus, Utensils, Wifi, X } from 'lucide-react'
import { EditVenueProps } from '../../types/venue';

export function EditVenue() {
    const { id } = useParams<{ id: string }>()
    const { register, control, handleSubmit, reset } = useForm<EditVenueProps>({
        defaultValues: {
            name: '',
            description: '',
            media: [{ url: '', alt: '' }],
            price: 0,
            maxGuests: 0,
            meta: { wifi: false, parking: false, breakfast: false, pets: false },
            location: { address: '', city: '', zip: '', country: '' },
        },
    })
    const { fields: mediaFields, append, remove } = useFieldArray({
        control,
        name: 'media',
    });

    const navigate = useNavigate()

    useEffect(() => {
        singleVenue(id!).then(data => reset(data)).catch(console.error)
    }, [id, reset])

    const onSubmit = async (data: EditVenueProps) => {
        try {
            await updateVenue(id!, data)
            toast.success('Venue updated successfully!')
            setTimeout(() => {
                navigate(`/venues/${id}`)
            }, 1500)
        } catch (err: any) {
            toast.error('Failed to update venue.')
            console.error(err)
        }
    }

    const facilities = [
        {
            icon: <Wifi className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>,
            name: 'wifi',
            label: 'WiFi'
        },
        {
            icon: <CarFront className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>,
            name: 'parking',
            label: 'Parking'
        },
        {
            icon: <Utensils className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>,
            name: 'breakfast',
            label: 'Breakfast'
        },
        {
            icon: <PawPrint className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>,
            name: 'pets',
            label: 'Pets'
        },
    ] as const

    return (
        <form
            id='edit-venue-form'
            method='PUT'
            onSubmit={handleSubmit(onSubmit)}
            className='mx-auto flex max-w-xl flex-col rounded-md p-4 px-6 pb-12 space-y-4'
        >
            <h1 className='text-2xl font-semibold'>Edit your venue</h1>
            <hr className='my-4 border-t border-gray-300'/>
            <h3 className='text-xl font-semibold'>Home details</h3>
            <label className='mb-0' htmlFor='edit-name'>Name</label>
            <input
                {...register('name')}
                id='edit-name'
                className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
            />

            <label className='mb-0' htmlFor='edit-description'>Description</label>
            <textarea
                {...register('description')}
                id='edit-description'
                className='mt-2 h-32 rounded border-none input bg-brand-tierty placeholder-gray-400'
            />

            <h3 className='pt-3 text-xl font-semibold'>Media</h3>
            {mediaFields.map((f, i) => (
                <div key={f.id} className='mb-4 flex items-center gap-2'>
                    <div className='flex-1'>
                        <label htmlFor={`edit-media-url-${i}`} className='sr-only'>Image URL</label>
                        <input
                            {...register(`media.${i}.url` as const)}
                            id={`edit-media-url-${i}`}
                            type='url'
                            placeholder='Image URL *'
                            className='w-full rounded border-none input bg-brand-tierty placeholder-gray-400'
                        />
                    </div>

                    {mediaFields.length > 1 && (
                        <button
                            type='button'
                            onClick={() => remove(i)}
                            className='cursor-pointer text-red-500 hover:text-red-700'
                            aria-label='Remove image'
                        >
                            <X size={18}/>
                        </button>
                    )}
                </div>
            ))}

            <button
                type='button'
                onClick={() => append({ url: '', alt: '' })}
                className='flex cursor-pointer items-center gap-2 text-green-500 hover:text-green-700'
            >
                <Plus size={18}/>
                Add Image
            </button>

            <h3 className='pt-3 text-xl font-semibold'>Pricing & capacity</h3>
            <label className='mb-0' htmlFor='edit-price'>Price</label>
            <input
                type='number'
                {...register('price', { valueAsNumber: true })}
                id='edit-price'
                className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
            />

            <label className='mb-0' htmlFor='edit-max-guests'>Max guests</label>
            <input
                type='number'
                {...register('maxGuests', { valueAsNumber: true })}
                id='edit-max-guests'
                className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
            />

            <h3 className='pt-4 text-xl font-semibold'>Facilities</h3>
            <div className='grid grid-cols-2 gap-6'>
                {facilities.map(f => (
                    <div key={f.name} className='flex items-center justify-between'>
                        <span className='flex gap-1'>{f.icon}{f.label}</span>
                        <label className='relative inline-block h-6 w-12' htmlFor='edit-facilities'>
                            <input
                                type='checkbox'
                                {...register(`meta.${f.name}` as const)}
                                id='edit-facilities'
                                className='mt-2 h-0 w-0 opacity-0 peer'
                            />
                            <span
                                className='absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition-colors peer-checked:bg-brand-primary'/>
                            <span
                                className='absolute top-0 left-0 h-6 w-6 peer-checked:translate-x-full cursor-pointer rounded-full bg-white shadow-md transition-transform'/>
                        </label>
                    </div>
                ))}
            </div>

            <h3 className='pt-4 text-xl font-semibold'>Location</h3>
            <label className='mb-0' htmlFor='edit-address'>Address</label>
            <input
                {...register('location.address')}
                id='edit-address'
                className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
            />

            <label className='mb-0' htmlFor='edit-city'>City</label>
            <input
                {...register('location.city')}
                id='edit-city'
                className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
            />

            <label className='mb-0' htmlFor='edit-zip'>ZIP</label>
            <input
                {...register('location.zip')}
                id='edit-zip'
                className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
            />

            <label className='mb-0' htmlFor='edit-country'>Country</label>
            <input
                {...register('location.country')}
                id='edit-country'
                className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
            />

            <button
                type='submit'
                className='mt-4 cursor-pointer rounded bg-green-500 px-4 py-2 text-white transition-colors duration-200 save-button hover:bg-green-600'
            >
                Save changes
            </button>
        </form>
    )
}
