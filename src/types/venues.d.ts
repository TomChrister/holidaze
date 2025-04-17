// Create venue data types
export type VenueFormData = {
    name: string;
    description: string;
    price: number;
    maxGuests: number;
    media: { url: string; alt: string }[];
    meta: {
        wifi: boolean;
        parking: boolean;
        breakfast: boolean;
        pets: boolean;
    };
    location: {
        address?: string;
        city?: string;
        zip?: string;
        country?: string;
        continent?: string;
    };
};