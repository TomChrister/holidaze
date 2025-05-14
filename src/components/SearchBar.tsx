import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SearchBarProps } from '../types/search';

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

    const { pathname } = useLocation();
    const extra = pathname === '/' ? '-mt-10' : 'mt-2'

    return (
        <div className='flex justify-center p-4 px-6 pb-6'>
            <div className={`relative z-10 flex flex-col gap-6 border border-gray-200 rounded-lg p-4 w-full max-w-md -mt-10 bg-white shadow-md lg:flex-row lg:max-w-4xl lg:flex justify-center lg:items-end ${extra}`}>
                <div className='flex flex-col'>
                    <div className='mb-1 text-sm font-semibold text-gray-500'>Where</div>
                    <div className='flex items-center border-b border-gray-300 pb-2'>
                        <MapPin className='mr-2 h-4 w-4 text-gray-400'/>
                        <input
                            type='text'
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                            className='w-full text-sm text-gray-500 placeholder-gray-400 focus:outline-none'
                            placeholder='Where to?'
                        />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <div className='text-sm font-semibold text-gray-500 mb-[1px]'>Check in - Check out</div>
                    <div className='flex items-center border-b border-gray-300 pb-2'>
                        <CalendarDays className='mr-2 h-4 w-4 text-gray-400'/>
                        <DatePicker
                            selectsRange
                            startDate={dateRange[0]}
                            endDate={dateRange[1]}
                            onChange={(update) => setDateRange(update as [Date | null, Date | null])}
                            placeholderText='Select dates'
                            className='w-full text-sm text-gray-500 focus:outline-none'
                            dateFormat='dd/MM/yyyy'
                        />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <div className='mb-1 text-sm font-semibold text-gray-500'>Add guests</div>
                    <div className='flex items-center border-b border-gray-300 pb-2'>
                        <Users className='mr-2 h-4 w-4 text-gray-400'/>
                        <input
                            type='number'
                            min={1}
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className='w-full text-sm text-gray-500 focus:outline-none'
                            placeholder='Who'
                        />
                    </div>
                </div>

                <button
                    onClick={() =>
                        onSearchSubmit({
                            startDate: dateRange[0],
                            endDate: dateRange[1],
                            guests: parseInt(guests) || undefined,
                        })
                    }
                    className='mt-2 cursor-pointer rounded px-4 py-2 text-white bg-brand-primary hover:opacity-90 lg:mt-0 lg:self-center'
                >
                    Search
                </button>
            </div>


        </div>
    );
}
