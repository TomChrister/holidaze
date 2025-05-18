import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { buildSearchQuery } from '../utils/useQuery.ts';
import { VenueProps } from '../types/venue';
import { singleVenue } from '../api/venues.tsx';
import VenueCard from '../components/VenueCard';

const popularIds = [
    '2d842c90-9d01-42c3-8a51-3fd1e4d2978b',
    '715fc343-7eb9-4db7-804d-5a299753506d',
    '31b0dfef-8ae7-4dfe-b0b5-e9895b8aebb8',
    '62be9ad9-93f8-4b3e-b537-d44fef70f867'
]

export function HomePage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [popularVenues, setPopularVenues] = useState<VenueProps[]>([]);

    useEffect(() => {
        Promise
            .all(popularIds.map(id => singleVenue(id)))
            .then(venues => setPopularVenues(venues))
            .catch(console.error);
    }, []);

    const handleSearch = (params?: {
        startDate?: Date | null;
        endDate?: Date | null;
        guests?: number;
    }) => {
        navigate(`/explore?${buildSearchQuery(search, params)}`);
    };

    return (
        <>
            <title>Holidaze</title>
            <div>
                <div className='relative'>
                    <img src='/appartment.jpg' alt='appartment' className='w-full object-cover h-[450px]' />
                    <div className="text-3xl text-center font-semibold text-shadow-md text-white absolute inset-0 flex flex-col items-center justify-center bg-black/25">
                        <p>Book your next stay</p>
                        <p>
                            with <span>Holidaze</span>
                        </p>
                    </div>
                </div>

                <SearchBar
                    search={search}
                    onSearchChange={setSearch}
                    onSearchSubmit={handleSearch}
                />
            </div>

            <div className='flex justify-center items-center text-lg py-6'>
                <span>Or go to</span>
                <Link to='/explore' className='text-brand-primary font-bold ml-1 hover:underline'>
                    explore
                </Link>
            </div>

            <section className='px-6 py-8 lg:px-32'>
                <h2 className='text-xl font-semibold mb-4'>Popular stays</h2>
                <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                    {popularVenues.map(v => (
                        <VenueCard key={v.id} {...v} />
                    ))}
                </div>
            </section>
        </>
    );
}
