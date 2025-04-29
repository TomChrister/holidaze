import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { CalendarDays, MapPin, Users } from 'lucide-react';
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

    return (
        <div className="flex flex-wrap gap-2">
            <div className="flex items-center border p-3 rounded w-full sm:w-auto">
                <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                    className="text-sm text-gray-500 placeholder-gray-400 focus:outline-none w-full"
                    placeholder="Where to?"
                />
            </div>

            <div className="flex items-center border p-3 rounded">
                <CalendarDays className="w-4 h-4 text-gray-400 mr-2" />
                <DatePicker
                    selectsRange
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={(update) => setDateRange(update as [Date | null, Date | null])}
                    placeholderText="Select dates"
                    className="text-sm text-gray-500 focus:outline-none"
                    dateFormat="dd/MM/yyyy"
                />
            </div>

            <div className="flex items-center border p-3 rounded">
                <Users className="w-4 h-4 text-gray-400 mr-2" />
                <input
                    type="number"
                    min={1}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="text-sm text-gray-500 focus:outline-none w-16"
                    placeholder="Guests"
                />
            </div>

            <button
                onClick={() =>
                    onSearchSubmit({
                        startDate: dateRange[0],
                        endDate: dateRange[1],
                        guests: parseInt(guests) || undefined,
                    })
                }
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Search
            </button>
        </div>
    );
}

