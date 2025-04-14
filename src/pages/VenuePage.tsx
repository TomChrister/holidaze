import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { singleVenue } from '../api/venues.tsx';
import { formatDate } from '../utils/helperFunctions.ts';
import { VenueProps } from '../components/VenueCard.tsx';
import { Wifi, CarFront, PawPrint, Utensils, Star } from 'lucide-react';

export function VenuePage() {
    const { id } = useParams();
    const [venue, setVenue] = useState<VenueProps | null>(null);

    useEffect(() => {
        if (id) singleVenue(id).then(setVenue);
    }, [id]);

    if (!venue) return <p>Loading..</p>;

    return (
        <div>
            <div className='flex items-center bg-white p-4 pb-2 justify-between'>
                <h2 className='text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12'>
                    {venue.name}
                </h2>
            </div>

            <img src={venue.media?.[0]?.url || '/default-img.jpg'}
                 alt={venue.media?.[0]?.alt || venue.name}
                 className='w-full h-[218px] object-cover'
            />

            <div className='p-2'>
                <h1 className='text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5'>
                    {venue.name}
                </h1>
                <p className='text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4'>
                    {venue.location?.address || 'Oslo, Norway'}
                </p>
                <div className='flex flex-wrap gap-3 px-4 py-3'>
                    <div
                        className='flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe2e6] p-3 items-start'>
                        <p className='text-[#111518] text-2xl font-bold leading-tight'>{venue.maxGuests}</p>
                        <p className='text-[#617b89] text-sm'>guests</p>
                    </div>
                    <div
                        className='flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe2e6] p-3 items-start'>
                        <p className='text-[#111518] text-2xl font-bold leading-tight'>${venue.price || '200'}</p>
                        <p className='text-[#617b89] text-sm'>price</p>
                    </div>
                    <div
                        className='flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-lg border border-[#dbe2e6] p-3 items-start'>
                        <p className='text-[#111518] text-2xl font-bold leading-tight'>{formatDate(venue.created)}</p>
                        <p className='text-[#617b89] text-sm'>listed at</p>
                    </div>
                </div>

                <h2 className='text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5'>About
                    this place</h2>
                <p className='text-[#111518] text-base font-normal leading-normal pb-3 pt-1 px-4'>
                    {venue.description || 'Enjoy a relaxing stay at this beautiful location!'}
                </p>

                <h2 className='text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5'>What
                    this place offers</h2>

                <div className='flex items-center gap-4 bg-white px-4 min-h-14'>
                    <div
                        className='text-[#111518] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-10'>
                        <Wifi/>
                    </div>
                    <p className='text-[#111518] text-base font-normal leading-normal flex-1'>
                        {venue.meta.wifi || 'WiFi available'}
                    </p>
                </div>

                <div className='flex items-center gap-4 bg-white px-4 min-h-14'>
                    <div
                        className='text-[#111518] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-10'>
                        <CarFront/>
                    </div>
                    <p className='text-[#111518] text-base font-normal leading-normal flex-1'>
                        {venue.meta.parking || 'Free parking'}
                    </p>
                </div>

                <div className='flex items-center gap-4 bg-white px-4 min-h-14'>
                    <div
                        className='text-[#111518] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-10'>
                        <Utensils/>
                    </div>
                    <p className='text-[#111518] text-base font-normal leading-normal flex-1'>
                        {venue.meta.breakfast || 'Breakfast included'}
                    </p>
                </div>

                <div className='flex items-center gap-4 bg-white px-4 min-h-14'>
                    <div
                        className='text-[#111518] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-10'>
                        <PawPrint/>
                    </div>
                    <p className='text-[#111518] text-base font-normal leading-normal flex-1'>
                        {venue.meta.pets || 'Pets allowed'}
                    </p>
                </div>

                <h2 className="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Where
                    you'll be</h2>
                <div className="flex px-4 py-3 max-w-3xl">
                    <iframe
                        className="w-full aspect-video rounded-xl"
                        src="https://maps.google.com/maps?q=Oslo&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>


                <div className='flex items-center gap-4 bg-white px-4 min-h-14'>
                    <div
                        className='text-[#111518] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-10'>
                        <Star/>
                    </div>
                    <p className='text-[#111518] text-base font-normal leading-normal flex-1'>
                        {venue.rating || 'No reviews yet'}
                    </p>
                </div>

            </div>
        </div>
    );
}
