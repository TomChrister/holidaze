import React from 'react';
import { VenueProps } from '../types/venue';
import { Wifi, CarFront, PawPrint, Utensils, Star } from 'lucide-react';
import { NextArrow, PrevArrow, formatDate, capitalizeLetter } from '../utils';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
    venue: VenueProps;
}

export function VenueDetails({ venue }: Props) {
    const settings = {
        dots: true,
        infinite: venue.media && venue.media.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div>
            <div className='flex items-center bg-white p-4 pb-2 justify-between'>
                <h2 className='text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12'>
                    {capitalizeLetter(venue.name)}
                </h2>
            </div>

            <Slider {...settings}>
                {(venue.media?.length > 0 ? venue.media : [{ url: '/default-img.jpg' }]).map((img, i) => (
                    <div key={i} className='w-full h-[218px]'>
                        <img
                            src={img.url}
                            alt={img.alt || venue.name}
                            className='w-full h-full object-cover'
                        />
                    </div>
                ))}
            </Slider>

            <div className='p-2'>
                <h1 className='text-[#111518] text-[22px] font-bold px-4 pb-3 pt-5'>
                    {capitalizeLetter(venue.name)}
                </h1>
                <p className='text-[#111518] text-base px-4 pb-3 pt-1'>
                    {venue.location?.address || 'Oslo, Norway'}
                </p>

                <div className='flex flex-wrap gap-3 px-4 py-3'>
                    <InfoCard title='guests' value={venue.maxGuests} />
                    <InfoCard title='price' value={`$${venue.price || '200'}`} />
                    <InfoCard title='listed at' value={formatDate(venue.created)} />
                </div>

                <Section title='About this place' text={venue.description || 'Enjoy a relaxing stay at this beautiful location!'} />

                <Section title='What this place offers' />
                <Feature icon={<Wifi />} text={venue.meta.wifi ? 'WiFi available' : 'No WiFi'} />
                <Feature icon={<CarFront />} text={venue.meta.parking ? 'Free parking' : 'Parking not possible'} />
                <Feature icon={<Utensils />} text={venue.meta.breakfast ? 'Breakfast included' : 'Breakfast not included'} />
                <Feature icon={<PawPrint />} text={venue.meta.pets ? 'Pets allowed' : 'Pets not allowed'} />

                <Section title='Where you`ll be'/>
                <div className='flex px-4 py-3 max-w-3xl'>
                    <iframe
                        className='w-full aspect-video rounded-xl'
                        src='https://maps.google.com/maps?q=Oslo&t=&z=13&ie=UTF8&iwloc=&output=embed'
                        allowFullScreen
                        loading='lazy'
                    ></iframe>
                </div>

                <Feature
                    icon={<Star />}
                    text={venue.rating ? `${venue.rating}` : 'No reviews yet'}
                />
            </div>
        </div>
    );
}

function InfoCard({ title, value }: { title: string; value: string | number }) {
    return (
        <div className='flex min-w-[111px] flex-1 flex-col gap-2 rounded-lg border border-[#dbe2e6] p-3 items-start'>
            <p className='text-[#111518] text-2xl font-bold'>{value}</p>
            <p className='text-[#617b89] text-sm'>{title}</p>
        </div>
    );
}

function Section({ title, text }: { title: string; text?: string }) {
    return (
        <>
            <h2 className='text-[#111518] text-[22px] font-bold px-4 pb-3 pt-5'>{title}</h2>
            {text && <p className='text-[#111518] text-base px-4 pb-3 pt-1'>{text}</p>}
        </>
    );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className='flex items-center gap-4 bg-white px-4 min-h-14'>
            <div className='text-[#111518] flex items-center justify-center rounded-lg bg-[#f0f3f4] shrink-0 size-10'>
                {icon}
            </div>
            <p className='text-[#111518] text-base flex-1'>{text}</p>
        </div>
    );
}
