import { useState } from 'react';
import { Search } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SearchBarProps } from '../types/search';

const fieldLabel = 'block text-xs font-bold uppercase tracking-wide text-ink';
const fieldInput = 'w-full bg-transparent text-base text-ink placeholder:text-placeholder focus:outline-none';

export function SearchBar({
    search,
    onSearchChange,
    onSearchSubmit,
    initialStartDate = null,
    initialEndDate = null,
    initialGuests,
}: SearchBarProps) {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([initialStartDate, initialEndDate]);
    const [guests, setGuests] = useState<string>(initialGuests !== undefined ? initialGuests.toString() : '');

    const submit = () =>
        onSearchSubmit({
            startDate: dateRange[0],
            endDate: dateRange[1],
            guests: parseInt(guests) || undefined,
        });

    return (
        <div
            className='relative z-10 mx-auto flex w-full max-w-4xl flex-col rounded-card border border-divider bg-white p-2
            md:flex-row md:items-center md:rounded-full md:p-1.5'>
            <label htmlFor='where' className='flex-1 cursor-text px-5 pt-3 pb-2 md:pl-7'>
                <span className={fieldLabel}>Where</span>
                <input
                    id='where'
                    type='text'
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && submit()}
                    className={fieldInput}
                    placeholder='Search destinations'
                />
            </label>

            <div className='mx-5 h-px bg-divider md:mx-0 md:h-9 md:w-px'/>

            <label htmlFor='date-range' className='flex-1 cursor-pointer px-5 pt-3 pb-2'>
                <span className={fieldLabel}>Dates</span>
                <DatePicker
                    id='date-range'
                    selectsRange
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={(update) => setDateRange(update as [Date | null, Date | null])}
                    placeholderText='Add dates'
                    className={`${fieldInput} cursor-pointer`}
                    dateFormat='dd/MM/yyyy'
                />
            </label>

            <div className='mx-5 h-px bg-divider md:mx-0 md:h-9 md:w-px'/>

            <label htmlFor='add-guests' className='flex-1 cursor-pointer px-5 pt-3 pb-2'>
                <span className={fieldLabel}>Guests</span>
                <select
                    id='add-guests'
                    name='add-guests'
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className={`${fieldInput} cursor-pointer appearance-none ${guests ? '' : 'text-placeholder'}`}
                >
                    <option value='' disabled>Add guests</option>
                    {Array.from({ length: 100 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1} guest{i + 1 > 1 ? 's' : ''}
                        </option>
                    ))}
                </select>
            </label>

            <button
                onClick={submit}
                aria-label='Search'
                className='search-button btn-primary m-2 md:m-0 md:h-14 md:w-14 md:shrink-0 md:p-0'
            >
                <Search size={20} strokeWidth={2.5}/>
                <span className='md:hidden'>Search</span>
            </button>
        </div>
    );
}
