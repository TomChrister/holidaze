import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { singleVenue, updateVenue } from '../../api/venues.tsx';
import toast from 'react-hot-toast';
import { VenueFormData } from '../../types/venue';
import { VenueForm } from '../../components/VenueForm.tsx';

export function EditVenue() {
    const { id } = useParams<{ id: string }>()
    const [venue, setVenue] = useState<VenueFormData>()
    const navigate = useNavigate()

    useEffect(() => {
        singleVenue(id!).then(setVenue).catch(console.error)
    }, [id])

    const onSubmit = async (data: VenueFormData) => {
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

    return (
        <>
            <div className='mx-auto max-w-xl px-6 pt-8'>
                <h1 className='text-2xl font-semibold'>Edit your venue</h1>
                <hr className='my-4 border-t border-gray-300'/>
            </div>
            <VenueForm values={venue} onSubmit={onSubmit} submitText='Save changes'/>
        </>
    )
}
