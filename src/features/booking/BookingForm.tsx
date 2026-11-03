import React, { useMemo, useState } from 'react';
import { createBooking } from '../../api/bookings';
import { BookingFormProps } from '../../types/bookings';
import { overlapsBooking } from '../../utils/helperFunctions.tsx';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import { CalendarDays, Users } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

export function BookingForm({ venueId, bookings, maxGuests }: BookingFormProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [guests, setGuests] = useState('');

    // Every booked day as a date string, so each calendar cell is one Set lookup
    const bookedDays = useMemo(() => new Set(bookings.flatMap(booking => {
        const endDate = new Date(booking.dateTo);
        const datesInRange: string[] = [];
        const currentDate = new Date(booking.dateFrom);

        while (currentDate <= endDate) {
            datesInRange.push(currentDate.toDateString());
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return datesInRange;
    })), [bookings]);

    async function handleBooking(e: React.FormEvent) {
        e.preventDefault();

        const token = localStorage.getItem('accessToken');
        if (!token) {
            toast.error('You need to be logged in to book a venue!');
            return;
        }

        if (!startDate || !endDate || !guests) {
            toast.error('Please fill in all fields!');
            return;
        }

        if (overlapsBooking(bookings, startDate, endDate)) {
            toast.error('Your dates include days that are already booked.');
            return;
        }

        try {
            await createBooking({
                dateFrom: startDate.toISOString(),
                dateTo: endDate.toISOString(),
                guests: Number(guests),
                venueId,
            });
            toast.success('Booking successfully created!');
            setTimeout(() => {
                window.location.href = '/profile';
            }, 1500);
        } catch (err) {
            console.error('Booking failed', err);
            toast.error(err instanceof Error ? err.message : 'Booking failed. Please try again.');
        }
    }

    return (
        <form
            id='booking-form'
            onSubmit={handleBooking}
            method='POST'
            noValidate
            className='space-y-4'>
            <div className='overflow-hidden rounded-control border border-divider'>
                <label htmlFor='booking-dates' className='block cursor-pointer px-4 pt-3 pb-2.5'>
                    <span className='flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase'>
                        <CalendarDays size={14}/> Dates
                    </span>
                    <DatePicker
                        id='booking-dates'
                        selected={startDate}
                        onChange={(dates) => {
                            const [s, e] = dates as [Date, Date]
                            setStartDate(s)
                            setEndDate(e)
                        }}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        placeholderText='Add dates'
                        className='w-full cursor-pointer bg-transparent text-base text-ink placeholder:text-placeholder focus:outline-none'
                        minDate={new Date()}
                        filterDate={date =>
                            !bookedDays.has(date.toDateString())
                        }
                        dayClassName={date =>
                            bookedDays.has(date.toDateString())
                                ? 'text-placeholder line-through'
                                : ''
                        }
                        dateFormat='dd/MM/yyyy'
                    />
                </label>

                <label htmlFor='booking-guests' className='block cursor-pointer border-t border-divider px-4 pt-3 pb-2.5'>
                    <span className='flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase'>
                        <Users size={14}/> Guests
                    </span>
                    <select
                        value={guests}
                        id='booking-guests'
                        onChange={(e) => setGuests(e.target.value)}
                        required
                        className={`w-full cursor-pointer appearance-none bg-transparent text-base focus:outline-none ${guests ? 'text-ink' : 'text-placeholder'}`}
                    >
                        <option value='' disabled>Add guests</option>
                        {Array.from({ length: maxGuests }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1} guest{i + 1 > 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <button type='submit' className='book-button btn-primary w-full py-3'>
                Reserve
            </button>
        </form>
    );
}
