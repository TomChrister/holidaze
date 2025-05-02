import React, { useEffect, useState } from 'react';
import { createBooking, singleBooking } from '../../api/bookings';
import { BookingFormProps } from '../../types/bookings';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function BookingForm({ venueId }: BookingFormProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate]   = useState<Date | null>(null);
    const [guests, setGuests]     = useState(1);
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
                dateTo:   endDate.toISOString(),
                guests,
                venueId,
            });
            console.log('Booking succeeded');
        } catch (err) {
            console.error('Booking failed', err);
        }
    }

    return (
        <form onSubmit={handleBooking} className='space-y-4'>
            <div>
                <label>Choose date</label>
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
                    inline
                    minDate={new Date()}
                    filterDate={date =>
                        !bookedDates.some(d => d.toDateString() === date.toDateString())
                    }
                    dayClassName={date =>
                        bookedDates.some(d => d.toDateString() === date.toDateString())
                            ? 'bg-red-400 text-white rounded-sm'
                            : ''
                    }
                />
            </div>

            <div>
                <label>Guests</label>
                <input
                    type='number'
                    value={guests}
                    onChange={e => setGuests(Number(e.target.value))}
                    min={1}
                    required
                    className='border p-2 rounded w-full'
                />
            </div>

            <button
                type='submit'
                className='bg-blue-600 text-white py-2 px-4 rounded w-full cursor-pointer'
            >
                Book now
            </button>
        </form>
    );
}
