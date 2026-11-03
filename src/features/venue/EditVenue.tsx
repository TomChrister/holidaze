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
            <div className='container-page'>
                <div className='mx-auto max-w-2xl pt-10 pb-8'>
                    <h1 className='page-heading'>Edit your venue</h1>
                    <p className='mt-2 text-base text-graphite'>Update the details and save your changes.</p>
                </div>
                <VenueForm values={venue} onSubmit={onSubmit} submitText='Save changes'/>
            </div>
        </>
    )
}
