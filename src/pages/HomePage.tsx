import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { buildSearchQuery } from '../utils/useQuery.ts';

export function HomePage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

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
                <div>
                    <img src='/appartment.png' alt='appartment' className='w-full object-cover h-[378px]' />
                </div>
                <SearchBar
                    search={search}
                    onSearchChange={setSearch}
                    onSearchSubmit={handleSearch}
                />

            </div>

            <div>
                Or go to <Link to='/explore'>explore</Link>
            </div>
        </>
    );
}
