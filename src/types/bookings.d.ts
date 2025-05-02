// Create booking data types
export type BookingData = {
    dateFrom: string;
    dateTo: string;
    guests: number;
    venueId: string;
};

// Booking form type
export type BookingFormProps = {
    venueId: string;
};