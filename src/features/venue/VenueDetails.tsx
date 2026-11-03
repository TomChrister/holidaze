import { useState } from 'react';
import { VenueProps } from '../../types/venue';
import { capitalizeLetter, NextArrow, PrevArrow } from '../../utils/helperFunctions.tsx';
import { BookingForm } from '../booking/BookingForm.tsx';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CarFront, MapPin, PawPrint, Star, Users, Utensils, Wifi } from 'lucide-react';

interface Props {
    venue: VenueProps;
    venueId: string;
}

export function VenueDetails({ venue, venueId }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const settings: Settings = {
        infinite: venue.media && venue.media.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        afterChange: (index: number) => setCurrentIndex(index),
    };

    const images = venue.media?.length > 0 ? venue.media : [{ url: '/default-img.jpg' }]

    const place = [venue.location?.address, venue.location?.city, venue.location?.country]
        .filter(Boolean).map(capitalizeLetter).join(', ');

    const facilities = [
        { icon: Wifi, label: 'Wifi', on: venue.meta.wifi },
        { icon: PawPrint, label: 'Pets allowed', on: venue.meta.pets },
        { icon: Utensils, label: 'Breakfast included', on: venue.meta.breakfast },
        { icon: CarFront, label: 'Free parking', on: venue.meta.parking },
    ];

    return (
        <div className='container-page pt-4 md:pt-6'>
            <div className='relative overflow-hidden rounded-[20px] bg-cloud md:rounded-frame'>
                <Slider {...settings}>
                    {images.map((img, i) => (
                        <div key={i} className='relative h-[320px] w-full md:h-[480px]'>
                            <img
                                src={img.url}
                                alt={img.alt || venue.name}
                                className='h-full w-full object-cover'
                            />
                        </div>
                    ))}
                </Slider>
                <div className='pointer-events-none absolute right-4 bottom-4 rounded-full bg-ink/70 px-3 py-1 text-sm font-semibold text-white'>
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            <div className='grid gap-10 pt-8 lg:grid-cols-[1fr_380px] lg:gap-16 lg:pt-10'>
                <div>
                    <h1 className='page-heading'>{capitalizeLetter(venue.name)}</h1>
                    <p className='mt-2 flex items-center gap-1.5 text-base text-graphite'>
                        <MapPin size={18}/>
                        {place || 'Location not given'}
                    </p>

                    <div className='mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-divider py-5 text-base'>
                        <span className='flex items-center gap-2'>
                            <Users size={20} className='text-graphite'/>
                            <span><b>{venue.maxGuests}</b> guests</span>
                        </span>
                        <span className='flex items-center gap-2'>
                            <Star size={20} className='text-graphite'/>
                            {venue.rating ? <span><b>{venue.rating}</b> / 5 rating</span> : 'No reviews yet'}
                        </span>
                    </div>

                    <section className='border-b border-divider py-8'>
                        <h2 className='section-heading'>About this place</h2>
                        <p className='mt-3 text-base leading-7 whitespace-pre-line text-graphite'>
                            {venue.description}
                        </p>
                    </section>

                    <section className='border-b border-divider py-8'>
                        <h2 className='section-heading'>What this place offers</h2>
                        <ul className='mt-4 grid gap-4 sm:grid-cols-2'>
                            {facilities.map(({ icon: Icon, label, on }) => (
                                <li key={label}
                                    className={`flex items-center gap-3 text-base ${on ? 'text-ink' : 'text-placeholder line-through'}`}>
                                    <Icon size={22}/>
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className='py-8'>
                        <h2 className='section-heading'>Where you'll stay</h2>
                        <iframe
                            title='Venue Location'
                            src={`https://www.google.com/maps?q=${encodeURIComponent(
                                `${venue.location.address}, ${venue.location.city}, ${venue.location.country}`
                            )}&z=14&output=embed`}
                            className='mt-4 h-64 w-full rounded-card border border-divider lg:h-80'
                            loading='lazy'
                        />
                    </section>
                </div>

                <aside className='lg:pt-1'>
                    <div className='card p-6 lg:sticky lg:top-24'>
                        <div className='flex items-baseline justify-between'>
                            <p className='text-2xl font-extrabold'>
                                ${venue.price}
                                <span className='text-base font-normal text-graphite'> / night</span>
                            </p>
                            {venue.rating > 0 && (
                                <span className='flex items-center gap-1 text-sm font-semibold'>
                                    <Star size={14} fill='currentColor'/>
                                    {venue.rating}
                                </span>
                            )}
                        </div>

                        <div className='mt-6'>
                            <BookingForm venueId={venueId} bookings={venue.bookings ?? []} maxGuests={venue.maxGuests}/>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
