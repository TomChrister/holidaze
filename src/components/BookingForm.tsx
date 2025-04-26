import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { authHeaders } from '../utils/headers.tsx';
import { API_BOOKINGS } from '../utils/constants.tsx';

type BookingFormProps = {
    venueId: string;
}

export function BookingForm({ venueId }: BookingFormProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [guests, setGuests] = useState(1);

    async function handleBooking(e: React.FormEvent) {
        e.preventDefault();

        if (!startDate || !endDate) {
            console.error('Please enter start date');
            return;
        }

        const response = await fetch(`${API_BOOKINGS}`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({
                dateFrom: startDate.toISOString(),
                dateTo: endDate.toISOString(),
                guests,
                venueId,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Booking successful!', data);
        } else {
            console.error('Booking failed')
        }
    }

    return (
        <form onSubmit={handleBooking} className='space-y-4'>
            <div>
                <label>Choose date</label>
                <DatePicker
                    selected={startDate}
                    onChange={(dates) => {
                        const [start, end] = dates as [Date, Date];
                        setStartDate(start);
                        setEndDate(end);
                    }}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    minDate={new Date()}
                />
            </div>
            <div>
                <label>Guests</label>
                <input
                    type='number'
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    min='1'
                    required
                />
            </div>
            <button type='submit'>Book now</button>
        </form>
    );
}