import React, { useEffect, useState } from 'react';
import { createBooking, singleBooking } from '../../api/bookings';
import { BookingFormProps } from '../../types/bookings';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import { CalendarDays, Users } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

export function BookingForm({ venueId }: BookingFormProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [guests, setGuests] = useState('');
    const [maxGuests, setMaxGuests] = useState<number>(1);

    const [bookings, setBookings] = useState<
        { id: string; dateFrom: string; dateTo: string }[]
    >([]);

    useEffect(() => {
        singleBooking(venueId)
            .then(venue => {
                setBookings(venue.bookings || []);
                setMaxGuests(venue.maxGuests || 1);
            })
            .catch(console.error);
    }, [venueId]);

    const bookedDates = bookings.flatMap(booking => {
        const startDate = new Date(booking.dateFrom);
        const endDate = new Date(booking.dateTo);
        const datesInRange: Date[] = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            datesInRange.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return datesInRange;
    });

    async function handleBooking(e: React.FormEvent) {
        e.preventDefault();

        const token = localStorage.getItem('accessToken');
        if (!token) {
            toast.error('You need to be logged in to book a venue!');
            return;
        }

        if (!startDate || !endDate) {
            console.error('Choose dates!');
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
        }
    }

    return (
        <form onSubmit={handleBooking} noValidate className='space-y-4'>
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
                            !bookedDates.some(d => d.toDateString() === date.toDateString())
                        }
                        dayClassName={date =>
                            bookedDates.some(d => d.toDateString() === date.toDateString())
                                ? 'bg-red-400 text-white rounded-sm'
                                : ''
                        }
                        dateFormat='dd/MM/yyyy'
                    />
                </div>
            </div>

            <div className='flex flex-col items-start rounded-md border-gray-300 pb-2'>
                <label className='mb-1 block font-semibold text-gray-500'>Guests</label>
                <div className='flex w-full items-center rounded border p-2 border-brand-primary'>
                    <Users className='mr-2 ml-1 h-5 w-5 text-brand-primary opacity-80'/>
                    <select
                        value={guests}
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
                className='w-full cursor-pointer rounded px-4 py-3 text-white bg-brand-primary'
            >
                Book now
            </button>
        </form>
    );
}
