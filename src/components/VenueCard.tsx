import { Link } from 'react-router-dom';
import { capitalizeLetter, truncate } from '../utils';
import { VenueProps } from '../types/venue';
import { FaStar } from 'react-icons/fa';

export default function VenueCard({
    id, name, price, media, location, rating
}: VenueProps) {
    return (
        <div className='@container bg-white rounded-xl border border-gray-200 shadow-md'>
            <div className='flex flex-col items-stretch justify-start rounded-xl @xl:flex-row @xl:items-start'>
                <div className='aspect-video w-full rounded-xl bg-cover bg-center bg-no-repeat'
                     style={{ backgroundImage: `url(${media[0]?.url || '/default-img.jpg'})` }}
                >
                </div>
                <div className='flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 p-4 @xl:px-4'>
                    <div className='flex items-center justify-between'>
                        <p className='text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]'>
                            {capitalizeLetter(truncate(name))}
                        </p>
                        <div className='flex items-center'>
                            <FaStar size={16} className='mr-1 mb-1 text-yellow-400'/>
                            <span className='text-sm font-medium text-gray-700'>
                                {rating}/5
                            </span>
                        </div>
                    </div>
                    <div className='flex items-end justify-between gap-3'>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[#617b89] text-base font-normal leading-normal'>
                                {location.city || 'Koh Samui'}, {location.country || 'Thailand'}
                            </p>
                            <p className='pb-3 text-base font-bold leading-normal text-blue-600'>
                                ${price}/night
                            </p>
                        </div>
                    </div>
                    <Link to={`/venues/${id}`}
                          className='rounded-lg border p-2 text-center font-medium text-white bg-brand-primary hover:opacity-90'>
                        View details
                    </Link>
                </div>
            </div>
        </div>
    );
}