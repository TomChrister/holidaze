import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';

export function HomePage() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (search.trim()) {
            navigate(`/explore?search=${encodeURIComponent(search)}`);
        }
    };

    return (
        <>
            <div>
                <h1 className='text-3xl mb-2'>Home</h1>
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
