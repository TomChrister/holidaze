import React, { useState } from 'react';
import { createBooking } from "../api/bookings.tsx";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type BookingFormProps = {
    venueId: string;
};

export function BookingForm({ venueId }: BookingFormProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [guests, setGuests] = useState(1);

    async function handleBooking(e: React.FormEvent) {
        e.preventDefault();

        if (!startDate || !endDate) {
            console.error('Please select dates');
            return;
        }

        try {
            const data = await createBooking({
                dateFrom: startDate.toISOString(),
                dateTo: endDate.toISOString(),
                guests,
                venueId,
            });
            console.log('Booking successful!', data);
        } catch (error) {
            console.error('Booking failed', error);
        }
    }

    return (
        <form onSubmit={handleBooking} className="space-y-4">
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
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    min="1"
                    required
                />
            </div>
            <button type="submit">Book now</button>
        </form>
    );
}
