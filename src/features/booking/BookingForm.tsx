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
            <div className='flex flex-col items-start rounded-md border-gray-300 pb-2'>
                <label className='mb-1 block font-semibold text-gray-500'>Dates</label>
                <div className='flex w-full items-center rounded border p-2 border-brand-primary'>
                    <CalendarDays className='mr-2 ml-1 h-5 w-5 text-brand-primary opacity-80'/>
                    <DatePicker
                        selected={startDate}
                        onChange={(dates) => {
                            const [s, e] = dates as [Date, Date]
                            setStartDate(s)
                            setEndDate(e)
                        }}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        placeholderText='dd.mm.yyyy'
                        className='w-full p-1 text-gray-500 cursor-pointer focus:outline-none'
                        minDate={new Date()}
                        filterDate={date =>
                            !bookedDays.has(date.toDateString())
                        }
                        dayClassName={date =>
                            bookedDays.has(date.toDateString())
                                ? 'bg-red-400 text-white rounded-sm'
                                : ''
                        }
                        dateFormat='dd/MM/yyyy'
                    />
                </div>
            </div>

            <div className='flex flex-col items-start rounded-md border-gray-300 pb-2'>
                <label className='mb-1 block font-semibold text-gray-500' htmlFor='booking-guests'>Guests</label>
                <div className='flex w-full items-center rounded border p-2 border-brand-primary'>
                    <Users className='mr-2 ml-1 h-5 w-5 text-brand-primary opacity-80'/>
                    <select
                        value={guests}
                        id='booking-guests'
                        onChange={(e) => setGuests(e.target.value)}
                        required
                        className='w-full p-1 text-gray-500 focus:outline-none cursor-pointer'
                    >
                        <option value='' disabled>Guests</option>
                        {Array.from({ length: maxGuests }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1} guest{i + 1 > 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button
                type='submit'
                className='book-button w-full cursor-pointer rounded px-4 py-3 text-white bg-brand-primary hover:bg-brand-hover transition-colors duration-200'
            >
                Book now
            </button>
        </form>
    );
}
