import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { singleVenue, updateVenue } from '../../api/venues.tsx';
import toast from 'react-hot-toast';
import { CarFront, PawPrint, Utensils, Wifi } from 'lucide-react'
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
    const { fields: mediaFields } = useFieldArray({ control, name: 'media' })

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
        { icon: <Wifi className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>, name: 'wifi', label: 'WiFi' },
        { icon: <CarFront className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>, name: 'parking', label: 'Parking' },
        { icon: <Utensils className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>, name: 'breakfast', label: 'Breakfast' },
        { icon: <PawPrint className='rounded p-1 bg-brand-tierty' color='#634AFF' size={30}/>, name: 'pets', label: 'Pets' },
    ] as const


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='mx-auto flex max-w-xl flex-col rounded-md p-4 px-6 pb-12 space-y-4'
        >
            <h3 className='text-xl font-semibold'>Home details</h3>
            <label>
                Name
                <input
                    {...register('name')}
                    className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
            </label>

            <label>
                Description
                <textarea
                    {...register('description')}
                    className='mt-2 h-32 rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
            </label>

            <h3 className='pt-3 text-xl font-semibold'>Media</h3>
            {mediaFields.map((f, i) => (
                <div key={f.id} className='space-y-2'>
                    <label>
                        Image URL
                        <input
                            {...register(`media.${i}.url` as const)}
                            className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
                        />
                    </label>
                    <label>
                        Describe your image
                        <input
                            {...register(`media.${i}.alt` as const)}
                            className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
                        />
                    </label>
                </div>
            ))}

            <h3 className='pt-3 text-xl font-semibold'>Pricing & capacity</h3>
            <label>
                Price
                <input
                    type='number'
                    {...register('price', { valueAsNumber: true })}
                    className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
            </label>
            <label>
                Max guests
                <input
                    type='number'
                    {...register('maxGuests', { valueAsNumber: true })}
                    className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
            </label>

            <h3 className='pt-4 text-xl font-semibold'>Facilities</h3>
            <div className='grid grid-cols-2 gap-6'>
                {facilities.map(f => (
                    <div key={f.name} className='flex items-center justify-between'>
                        <span className='flex gap-1'>{f.icon}{f.label}</span>
                        <label className='relative inline-block h-6 w-12'>
                            <input
                                type='checkbox'
                                {...register(`meta.${f.name}` as const)}
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
            <label>
                Address
                <input
                    {...register('location.address')}
                    className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
            </label>
            <label>
                City
                <input
                    {...register('location.city')}
                    className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
            </label>
            <label>
                ZIP
                <input
                    {...register('location.zip')}
                    className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
                />
            </label>
            <label>
                Country
                <input
                    {...register('location.country')}
                    className='mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400'
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
