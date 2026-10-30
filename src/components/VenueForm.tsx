import { useFieldArray, useForm } from 'react-hook-form';
import { CarFront, PawPrint, Plus, Utensils, Wifi, X } from 'lucide-react';
import { VenueFormData } from '../types/venue';

type VenueFormProps = {
    values?: VenueFormData;
    onSubmit: (data: VenueFormData) => Promise<void>;
    submitText: string;
};

const iconProps = { className: 'rounded p-1 bg-brand-tierty', color: '#634AFF', size: 30 };

const facilities = [
    { name: 'wifi', label: 'WiFi', icon: <Wifi {...iconProps}/> },
    { name: 'parking', label: 'Parking', icon: <CarFront {...iconProps}/> },
    { name: 'breakfast', label: 'Breakfast', icon: <Utensils {...iconProps}/> },
    { name: 'pets', label: 'Pets', icon: <PawPrint {...iconProps}/> },
] as const;

const inputClass = 'mt-2 rounded border-none input bg-brand-tierty placeholder-gray-400';

// Used by both create and edit venue; `values` fills the form once the venue has loaded
export function VenueForm({ values, onSubmit, submitText }: VenueFormProps) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<VenueFormData>({
        defaultValues: {
            name: '',
            description: '',
            media: [{ url: '', alt: '' }],
            meta: { wifi: false, parking: false, breakfast: false, pets: false },
            location: { address: '', city: '', zip: '', country: '' },
        },
        values,
    });

    const { fields, append, remove } = useFieldArray({ control, name: 'media' });

    return (
        <form
            id='venue-form'
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className='mx-auto flex max-w-xl flex-col rounded-md px-6 pb-12 space-y-4'
        >
            <h3 className='text-xl font-semibold'>Home details</h3>
            <label className='mb-0' htmlFor='venue-name'>Name *</label>
            <input
                {...register('name', { required: 'Name is required' })}
                id='venue-name'
                className={inputClass}
            />
            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

            <label className='mb-0' htmlFor='venue-description'>Description *</label>
            <textarea
                {...register('description', { required: 'Description is required' })}
                id='venue-description'
                className={`h-32 ${inputClass}`}
            />
            {errors.description && <p className='text-red-500'>{errors.description.message}</p>}

            <h3 className='pt-3 text-xl font-semibold'>Media</h3>
            {fields.map((field, index) => (
                <div key={field.id} className='mb-4 flex items-center gap-2'>
                    <div className='flex-1'>
                        <label htmlFor={`venue-media-${index}`} className='sr-only'>Image URL</label>
                        <input
                            {...register(`media.${index}.url`, {
                                required: 'Img URL is required, and must be a live link to a image URL',
                            })}
                            id={`venue-media-${index}`}
                            type='url'
                            placeholder='Image URL, max 8 *'
                            className='w-full rounded border-none input bg-brand-tierty placeholder-gray-400'
                        />
                        {errors.media?.[index]?.url && (
                            <p className='mt-1 text-sm text-red-500'>{errors.media[index].url.message}</p>
                        )}
                    </div>

                    {fields.length > 1 && (
                        <button
                            type='button'
                            onClick={() => remove(index)}
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
                className='flex cursor-pointer items-center gap-2 text-green-500 hover:text-green-600'
            >
                <Plus size={18}/>
                Add Image
            </button>

            <h3 className='pt-3 text-xl font-semibold'>Pricing & capacity</h3>
            <label className='mb-0' htmlFor='venue-price'>Price *</label>
            <input
                type='number'
                {...register('price', { valueAsNumber: true, required: 'Price is required' })}
                id='venue-price'
                className={inputClass}
            />
            {errors.price && <p className='text-red-500'>{errors.price.message}</p>}

            <label className='mb-0' htmlFor='venue-max-guests'>Max guests *</label>
            <input
                type='number'
                {...register('maxGuests', { valueAsNumber: true, required: 'Max guests is required' })}
                id='venue-max-guests'
                className={inputClass}
            />
            {errors.maxGuests && <p className='text-red-500'>{errors.maxGuests.message}</p>}

            <h3 className='pt-4 text-xl font-semibold'>Facilities</h3>
            <div className='grid grid-cols-2 gap-6'>
                {facilities.map(f => (
                    <div key={f.name} className='flex items-center justify-between'>
                        <span className='flex gap-1'>{f.icon}{f.label}</span>
                        <label className='relative inline-block h-6 w-12 cursor-pointer' htmlFor={`venue-${f.name}`}>
                            <input
                                type='checkbox'
                                {...register(`meta.${f.name}`)}
                                id={`venue-${f.name}`}
                                className='h-0 w-0 opacity-0 peer'
                            />
                            <span
                                className='absolute inset-0 rounded-full bg-gray-300 transition-colors peer-checked:bg-brand-primary'/>
                            <span
                                className='absolute top-0 left-0 h-6 w-6 peer-checked:translate-x-full rounded-full bg-white shadow-md transition-transform'/>
                        </label>
                    </div>
                ))}
            </div>

            <h3 className='pt-4 text-xl font-semibold'>Location</h3>
            <label className='mb-0' htmlFor='venue-address'>Address</label>
            <input {...register('location.address')} id='venue-address' className={inputClass}/>

            <label className='mb-0' htmlFor='venue-city'>City</label>
            <input {...register('location.city')} id='venue-city' className={inputClass}/>

            <label className='mb-0' htmlFor='venue-zip'>ZIP</label>
            <input {...register('location.zip')} id='venue-zip' className={inputClass}/>

            <label className='mb-0' htmlFor='venue-country'>Country</label>
            <input {...register('location.country')} id='venue-country' className={inputClass}/>

            <button
                type='submit'
                className='my-4 w-full cursor-pointer rounded px-4 py-2 text-white transition-colors duration-200 bg-brand-primary hover:bg-brand-hover'
            >
                {submitText}
            </button>
        </form>
    );
}
