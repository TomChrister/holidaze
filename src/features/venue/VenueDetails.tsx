import { useState } from 'react';
import { VenueProps } from '../../types/venue';
import { capitalizeLetter, NextArrow, PrevArrow } from '../../utils';
import { BookingForm } from '../booking/BookingForm.tsx';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoLocation } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import { Bed, CarFront, PawPrint, Star, Utensils, Wifi } from 'lucide-react';

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
    return (
        <>
            <div className='border-b border-gray-300 bg-brand-secondary lg:px-52 md:pt-6'>
                <Slider {...settings}>
                    {images.map((img, i) => (
                        <div key={i} className='relative w-full h-[330px] lg:h-[400px]'>
                            <img
                                src={img.url}
                                alt={img.alt || venue.name}
                                className='h-full w-full object-cover lg:rounded-md'
                            />
                            <div
                                className='absolute right-2 bottom-2 rounded bg-white bg-opacity-60 px-2 py-1 text-sm text-black'>
                                {currentIndex + 1}/{images.length}
                            </div>
                        </div>
                    ))}
                </Slider>

                <div className='p-2 pb-6 lg:p-0'>
                    <h1 className='text-[#111518] text-[22px] font-bold px-4 pb-2 lg:px-0'>
                        {capitalizeLetter(venue.name)}
                    </h1>
                    <p className='flex items-center gap-1 px-4 pb-3 text-gray-600 lg:px-0'>
                        <IoLocation size={18}/>
                        <span>
                            {capitalizeLetter(venue.location?.address) || 'Oslo, Norway'}, {capitalizeLetter(venue.location?.country)}
                        </span>
                    </p>

                    <div className='flex flex-col gap-6 px-4 py-3 lg:px-0'>
                        <div className='flex gap-4'>
                            <div className='flex flex-col items-center text-gray-600'>
                                <Bed size={24} color='#634AFF'/>
                                {venue.maxGuests} guests
                            </div>

                            <div className='flex flex-col items-center text-gray-600 lg:px-0'>
                                <Star size={24} color='#634AFF'/>
                                <p>{venue?.rating ? `${venue.rating} stars` : 'No reviews'}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 px-4 pt-4 pb-6 lg:px-0'>
                        <p className='text-xl font-semibold font'>About this place</p>
                        <p className='text-gray-600'>{venue.description}</p>
                    </div>

                    <div className='px-4 pb-4 lg:px-0'>
                        <h2 className='text-xl font-semibold pb-2'>Facilities</h2>

                        <div className='flex gap-5'>
                            <div className='flex flex-col items-center gap-1 text-gray-600'>
                                <Wifi size={24} color='#634AFF'/>
                                <p className='text-sm text-center'>{venue.meta.wifi ? 'Available' : 'Not available'}</p>
                            </div>

                            <div className='flex flex-col items-center gap-1 text-gray-600'>
                                <PawPrint size={24} color='#634AFF'/>
                                <p className='text-sm text-center'>{venue.meta.pets ? 'Allowed' : 'Not allowed'}</p>
                            </div>

                            <div className='flex flex-col items-center gap-1 text-gray-600'>
                                <Utensils size={24} color='#634AFF'/>
                                <p className='text-sm text-center'>{venue.meta.breakfast ? 'Included' : 'Not included'}</p>
                            </div>

                            <div className='flex flex-col items-center gap-1 text-gray-600'>
                                <CarFront size={24} color='#634AFF'/>
                                <p className='text-sm text-center'>{venue.meta.parking ? 'Parking' : 'No parking'}</p>
                            </div>
                        </div>
                    </div>

                    <div className='px-4 pb-4 lg:px-0 lg:pb-8'>
                        <h2 className='text-xl font-semibold pb-4'>Where you'll stay</h2>
                        <iframe
                            title='Venue Location'
                            src={`https://www.google.com/maps?q=${encodeURIComponent(
                                `${venue.location.address}, ${venue.location.city}, ${venue.location.country}`
                            )}&z=14&output=embed`}
                            className='w-full max-w-screen-md h-44 rounded-lg shadow-md border border-gray-200 lg:h-72'
                            loading='lazy'
                        />
                    </div>
                </div>
            </div>

            <div className='w-full max-w-screen-md mx-auto lg:px-0'>
                <h2 className='text-2xl font-semibold px-6 pt-8'>Book your stay</h2>
                <div className='flex justify-between px-6 pt-8'>
                <span className='flex text-2xl font-bold'>
                    ${venue.price}<p className='font-normal text-brand-primary'>/night</p>
                </span>
                    <div className='flex gap-1'>
                        {venue.rating}/5
                        <FaStar size={20} className='text-yellow-500'/>
                    </div>
                </div>

                <div className='px-6 py-8'>
                    <BookingForm venueId={venueId}/>
                </div>
            </div>
        </>
    );
}
