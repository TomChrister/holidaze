import { Link } from 'react-router-dom';
import { capitalizeLetter, truncate } from '../utils/helperFunctions.tsx';
import { VenueProps } from '../types/venue';
import { Star } from 'lucide-react';

export default function VenueCard({
    id, name, price, media, location, rating
}: VenueProps) {
    const place = [location.city, location.country].filter(Boolean).map(capitalizeLetter).join(', ');

    return (
        <Link to={`/venues/${id}`} className='group block' aria-label={name}>
            <div className='aspect-[4/3] overflow-hidden rounded-card bg-cloud'>
                <img
                    src={media[0]?.url || '/default-img.jpg'}
                    alt={media[0]?.alt || name}
                    loading='lazy'
                    onError={(e) => {
                        if (!e.currentTarget.src.endsWith('/default-img.jpg')) e.currentTarget.src = '/default-img.jpg';
                    }}
                    className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                />
            </div>

            <div className='flex flex-col gap-0.5 pt-3'>
                <div className='flex items-start justify-between gap-3'>
                    <h3 className='text-base leading-6 font-bold text-ink'>
                        {capitalizeLetter(truncate(name))}
                    </h3>
                    <span className='flex shrink-0 items-center gap-1 text-sm font-semibold text-ink'>
                        <Star size={14} fill='currentColor'/>
                        {rating ? rating.toFixed(1) : 'New'}
                    </span>
                </div>

                <p className='text-sm text-graphite'>
                    {place || 'Location not given'}
                </p>

                <p className='pt-1 text-base text-ink'>
                    <span className='font-bold'>${price}</span>
                    <span className='text-graphite'> / night</span>
                </p>
            </div>
        </Link>
    );
}
