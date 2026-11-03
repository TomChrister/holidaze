import { useFieldArray, useForm } from 'react-hook-form';
import { CarFront, PawPrint, Plus, Utensils, Wifi, X } from 'lucide-react';
import { VenueFormData } from '../types/venue';

type VenueFormProps = {
    values?: VenueFormData;
    onSubmit: (data: VenueFormData) => Promise<void>;
    submitText: string;
};

const iconProps = { className: 'text-graphite', size: 20 };

const facilities = [
    { name: 'wifi', label: 'WiFi', icon: <Wifi {...iconProps}/> },
    { name: 'parking', label: 'Parking', icon: <CarFront {...iconProps}/> },
    { name: 'breakfast', label: 'Breakfast', icon: <Utensils {...iconProps}/> },
    { name: 'pets', label: 'Pets', icon: <PawPrint {...iconProps}/> },
] as const;

const inputClass = 'input';

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
            className='card mx-auto flex max-w-2xl flex-col gap-4 p-6 sm:p-8'
        >
            <h3 className='section-heading'>Home details</h3>
            <label className='label -mb-2' htmlFor='venue-name'>Name *</label>
            <input
                {...register('name', { required: 'Name is required' })}
                id='venue-name'
                className={inputClass}
            />
            {errors.name && <p className='-mt-2 text-sm text-red-600'>{errors.name.message}</p>}

            <label className='label -mb-2' htmlFor='venue-description'>Description *</label>
            <textarea
                {...register('description', { required: 'Description is required' })}
                id='venue-description'
                className={`h-32 ${inputClass}`}
            />
            {errors.description && <p className='-mt-2 text-sm text-red-600'>{errors.description.message}</p>}

            <h3 className='section-heading mt-4 border-t border-divider pt-8'>Media</h3>
            {fields.map((field, index) => (
                <div key={field.id} className='flex items-start gap-2'>
                    <div className='flex-1'>
                        <label htmlFor={`venue-media-${index}`} className='sr-only'>Image URL</label>
                        <input
                            {...register(`media.${index}.url`, {
                                required: 'Img URL is required, and must be a live link to a image URL',
                            })}
                            id={`venue-media-${index}`}
                            type='url'
                            placeholder='Image URL, max 8 *'
                            className='input'
                        />
                        {errors.media?.[index]?.url && (
                            <p className='mt-1 text-sm text-red-500'>{errors.media[index].url.message}</p>
                        )}
                    </div>

                    {fields.length > 1 && (
                        <button
                            type='button'
                            onClick={() => remove(index)}
                            className='flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-graphite hover:bg-cloud hover:text-red-600'
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
                className='btn-secondary self-start py-2'
            >
                <Plus size={18}/>
                Add Image
            </button>

            <h3 className='section-heading mt-4 border-t border-divider pt-8'>Pricing & capacity</h3>
            <label className='label -mb-2' htmlFor='venue-price'>Price *</label>
            <input
                type='number'
                {...register('price', { valueAsNumber: true, required: 'Price is required' })}
                id='venue-price'
                className={inputClass}
            />
            {errors.price && <p className='-mt-2 text-sm text-red-600'>{errors.price.message}</p>}

            <label className='label -mb-2' htmlFor='venue-max-guests'>Max guests *</label>
            <input
                type='number'
                {...register('maxGuests', { valueAsNumber: true, required: 'Max guests is required' })}
                id='venue-max-guests'
                className={inputClass}
            />
            {errors.maxGuests && <p className='-mt-2 text-sm text-red-600'>{errors.maxGuests.message}</p>}

            <h3 className='section-heading mt-4 border-t border-divider pt-8'>Facilities</h3>
            <div className='grid gap-x-8 gap-y-4 sm:grid-cols-2'>
                {facilities.map(f => (
                    <div key={f.name} className='flex items-center justify-between rounded-control border border-divider px-4 py-3'>
                        <span className='flex items-center gap-3 font-semibold'>{f.icon}{f.label}</span>
                        <label className='relative inline-block h-6 w-12 cursor-pointer' htmlFor={`venue-${f.name}`}>
                            <input
                                type='checkbox'
                                {...register(`meta.${f.name}`)}
                                id={`venue-${f.name}`}
                                className='h-0 w-0 opacity-0 peer'
                            />
                            <span
                                className='absolute inset-0 rounded-full bg-divider transition-colors peer-checked:bg-accent'/>
                            <span
                                className='absolute top-0 left-0 h-6 w-6 peer-checked:translate-x-full rounded-full bg-white shadow-sm ring-1 ring-divider transition-transform'/>
                        </label>
                    </div>
                ))}
            </div>

            <h3 className='section-heading mt-4 border-t border-divider pt-8'>Location</h3>
            <label className='label -mb-2' htmlFor='venue-address'>Address</label>
            <input {...register('location.address')} id='venue-address' className={inputClass}/>

            <label className='label -mb-2' htmlFor='venue-city'>City</label>
            <input {...register('location.city')} id='venue-city' className={inputClass}/>

            <label className='label -mb-2' htmlFor='venue-zip'>ZIP</label>
            <input {...register('location.zip')} id='venue-zip' className={inputClass}/>

            <label className='label -mb-2' htmlFor='venue-country'>Country</label>
            <input {...register('location.country')} id='venue-country' className={inputClass}/>

            <button
                type='submit'
                className='btn-primary mt-6 w-full py-3'
            >
                {submitText}
            </button>
        </form>
    );
}
