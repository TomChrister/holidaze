import { SearchBarProps } from '../types/search';

export function SearchBar({ search, onSearchChange, onSearchSubmit }: SearchBarProps) {
    return (
        <div className='flex gap-2'>
            <div className='w-full border p-3 rounded'>
                <label className='block font-semibold text-sm leading-tight'>Where to?</label>
                <input
                    type='text'
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                    className='w-full text-gray-500 text-sm placeholder-gray-400 focus:outline-none'
                    placeholder='Search location...'
                />
            </div>

            <button
                onClick={onSearchSubmit}
                className='bg-blue-500 text-white px-4 py-2 rounded'
            >
                Search
            </button>
        </div>
    );
}

