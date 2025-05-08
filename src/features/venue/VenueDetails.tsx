import { useState } from 'react';
import { VenueProps } from '../../types/venue';
import { capitalizeLetter, NextArrow, PrevArrow } from '../../utils';
import { BookingForm } from '../booking/BookingForm.tsx';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoLocation } from 'react-icons/io5';
import { FaBed, FaDollarSign, FaStar } from 'react-icons/fa';

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
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        afterChange: (index: number) => setCurrentIndex(index),
    };

    const images = venue.media?.length > 0 ? venue.media : [{url: '/default-img.jpg'}]
    return (
        <>
            <div className='bg-brand-secondary border-b border-gray-300'>
                <Slider {...settings}>
                    {images.map((img, i) => (
                        <div key={i} className='relative w-full h-[318px]'>
                            <img
                                src={img.url}
                                alt={img.alt || venue.name}
                                className='w-full h-full object-cover'
                            />
                            <div className='absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded'>
                                {currentIndex + 1}/{images.length}
                            </div>
                        </div>
                    ))}
                </Slider>

                <div className='p-2'>
                    <h1 className='text-[#111518] text-[22px] font-bold px-4 pb-2'>
                        {capitalizeLetter(venue.name)}
                    </h1>
                    <p className='flex gap-1 items-center text-gray-600 px-4 pb-3'>
                        <IoLocation size={18}/>
                        {capitalizeLetter(venue.location?.address) || 'Oslo, Norway'}
                    </p>

                    <div className='flex items-center px-4 py-3 gap-6'>
                        <div className='flex flex-col items-center text-gray-600'>
                            <FaBed size={24}/>
                            {venue.maxGuests} guests
                        </div>

                        <div className='flex flex-col items-center text-gray-600'>
                            <FaDollarSign size={24}/>
                            {venue.price}/night
                        </div>

                        <div className='flex flex-col items-center text-gray-600'>
                            <FaStar size={24}/>
                            {venue.rating} of 5
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 px-4 pb-6 pt-4'>
                        <p className='text-xl font-semibold font'>About this place</p>
                        <p className='text-gray-600'>{venue.description}</p>
                    </div>
                </div>
            </div>

            <div className='py-8'>
                <BookingForm venueId={venueId} />
            </div>
        </>
    );
}
