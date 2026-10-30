import { describe, expect, it } from 'vitest';
import { overlapsBooking } from './helperFunctions.tsx';

describe('overlapsBooking', () => {
    const day = (n: number) => new Date(2026, 10, n);
    // Booked 10th to 12th November, both days included
    const bookings = [{ dateFrom: day(10).toISOString(), dateTo: day(12).toISOString() }];

    it('blocks a range that covers or touches a booked day', () => {
        expect(overlapsBooking(bookings, day(9), day(14))).toBe(true);
        expect(overlapsBooking(bookings, day(12), day(13))).toBe(true);
        expect(overlapsBooking(bookings, day(8), day(10))).toBe(true);
    });

    it('allows ranges fully before or after the booking', () => {
        expect(overlapsBooking(bookings, day(5), day(9))).toBe(false);
        expect(overlapsBooking(bookings, day(13), day(15))).toBe(false);
        expect(overlapsBooking(undefined, day(1), day(2))).toBe(false);
    });
});
