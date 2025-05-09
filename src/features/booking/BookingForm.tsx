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
    const [bookings, setBookings] = useState<
        { id: string; dateFrom: string; dateTo: string }[]
    >([]);

    useEffect(() => {
        singleBooking(venueId)
            .then(venue => {
                setBookings(venue.bookings || []);
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
        <form onSubmit={handleBooking} className='space-y-4'>
            <div className='flex flex-col items-start rounded-md border-gray-300 pb-2'>
                <label className='mb-1 block font-semibold text-gray-500'>Dates</label>
                <div className='flex w-full items-center border border-brand-primary rounded p-2'>
                    <CalendarDays className='mr-2 h-5 w-5 ml-1 text-gray-400' />
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
                        className='w-full p-1 text-gray-500 focus:outline-none'
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
                <div className='flex items-center border border-brand-primary rounded w-full p-2'>
                    <Users className='mr-2 h-5 w-5 ml-1 text-gray-400' />
                    <input
                        type='number'
                        value={guests}
                        onChange={e => setGuests(e.target.value)}
                        placeholder='Guests'
                        required
                        className='w-full p-1 text-gray-500 focus:outline-none'
                    />
                </div>
            </div>

            <button
                type='submit'
                className='bg-brand-primary text-white py-3 px-4 rounded w-full cursor-pointer'
            >
                Book now
            </button>
        </form>
    );
}
