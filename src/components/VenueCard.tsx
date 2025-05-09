import { Link } from 'react-router-dom';
import { capitalizeLetter, truncate } from '../utils';
import { VenueProps } from '../types/venue';
import { FaStar } from 'react-icons/fa';

export default function VenueCard({
    id, name, price, media, location, rating
}: VenueProps) {
    return (
        <div className='@container bg-white rounded-lg shadow-md'>
            <div className='flex flex-col items-stretch justify-start rounded-xl @xl:flex-row @xl:items-start'>
                <div className='w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl'
                     style={{ backgroundImage: `url(${media[0]?.url || '/default-img.jpg'})` }}
                ></div>
                <div className='flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 p-4 @xl:px-4'>
                    <div className='flex justify-between items-center'>
                        <p className='text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]'>
                            {capitalizeLetter(truncate(name))}
                        </p>
                        <div className='flex items-center'>
                            <FaStar size={16} className=' text-yellow-400 mr-1 mb-1'/>
                            <span className='text-sm font-medium text-gray-700'>
                                {rating}/5
                            </span>
                        </div>
                    </div>
                    <div className='flex items-end gap-3 justify-between'>
                        <div className='flex flex-col gap-1'>
                            <p className='text-[#617b89] text-base font-normal leading-normal'>
                                {location.city || 'Koh Samui'}, {location.country || 'Thailand'}
                            </p>
                            <p className='text-blue-600 text-base font-bold leading-normal pb-3'>
                                ${price}/night
                            </p>
                        </div>
                    </div>
                    <Link to={`/venues/${id}`}
                          className='bg-brand-primary text-white border rounded-lg text-center p-2 font-medium hover:opacity-90'>
                        View details
                    </Link>
                </div>
            </div>
        </div>
    );
}