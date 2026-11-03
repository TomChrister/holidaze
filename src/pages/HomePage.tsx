import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { buildSearchQuery } from '../utils/useQuery.ts';
import { VenueProps } from '../types/venue';
import { singleVenue } from '../api/venues.tsx';
import VenueCard from '../components/VenueCard';
import { ArrowRight } from 'lucide-react';
import { isVenueManager } from '../utils/authHelpers.ts';

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
        // allSettled: one deleted venue must not hide the others
        Promise
            .allSettled(popularIds.map(id => singleVenue(id)))
            .then(results => setPopularVenues(
                results.flatMap(r => r.status === 'fulfilled' ? [r.value] : [])
            ));
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
            <section className='container-page pt-4 md:pt-6'>
                <div className='relative overflow-hidden rounded-[20px] md:rounded-frame'>
                    <img
                        src='/appartment.jpg'
                        alt='Bright apartment living room'
                        className='absolute inset-0 h-full w-full object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-b from-ink/10 via-ink/25 to-ink/55'/>

                    <div className='relative flex min-h-[520px] flex-col justify-end gap-8 px-4 pt-24 pb-6 md:min-h-[560px] md:px-10 md:pb-10'>
                        <div className='text-center text-white'>
                            <p className='text-base font-semibold text-white/85'>Homes, cabins & apartments</p>
                            <h1 className='mt-2 text-4xl leading-tight font-extrabold tracking-tight md:text-6xl'>
                                Book your next stay<br className='hidden sm:block'/> with Holidaze
                            </h1>
                        </div>

                        <SearchBar
                            search={search}
                            onSearchChange={setSearch}
                            onSearchSubmit={handleSearch}
                        />
                    </div>
                </div>
            </section>

            <section className='container-page pt-12 md:pt-16'>
                <div className='mb-6 flex items-end justify-between gap-4'>
                    <div>
                        <h2 className='section-heading'>Popular stays</h2>
                        <p className='text-base text-graphite'>Hand-picked places our guests love</p>
                    </div>
                    <Link to='/explore' className='link shrink-0 text-base'>Explore all</Link>
                </div>

                <div className='grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4'>
                    {popularVenues.map(v => (
                        <VenueCard key={v.id} {...v} />
                    ))}
                </div>
            </section>

            <section className='container-page pt-12 md:pt-16'>
                <div className='flex flex-col items-start justify-between gap-6 rounded-[20px] bg-accent p-8 text-white md:flex-row md:items-center md:rounded-frame md:p-12'>
                    <div className='max-w-xl'>
                        <h2 className='text-[32px] leading-10 font-extrabold tracking-tight'>Have a place to share?</h2>
                        <p className='mt-2 text-base text-white/85'>
                            Become a venue manager and list your home for travelers from all over the world.
                        </p>
                    </div>
                    <Link
                        to={isVenueManager() ? '/create' : '/register'}
                        className='btn shrink-0 bg-white text-ink hover:bg-cloud'
                    >
                        {isVenueManager() ? 'List your home' : 'Get started'}
                        <ArrowRight size={18}/>
                    </Link>
                </div>
            </section>
        </>
    );
}
