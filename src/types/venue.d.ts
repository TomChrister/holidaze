// Single venue props
export type VenueProps = {
    id: string;
    name: string;
    description: string;
    media: { url: string; alt?: string }[];
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: {
        wifi: boolean;
        parking: boolean;
        breakfast: boolean;
        pets: boolean;
    };
    location: {
        address: string;
        city: string;
        zip: string;
        country: string;
    };
};

// Edit venue props
export type EditVenueProps = {
    name: string
    description: string
    media: { url: string; alt: string }[]
    price: number
    maxGuests: number
    meta: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean }
    location: { address: string; city: string; zip: string; country: string }
}

// Confirm modal props
export type ConfirmModalProps = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
    message: string
    confirmText?: string
}