import { Link } from "react-router-dom";

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
        continent: string;
    };
};

export default function VenueCard({
    id, name, price, location, media, description, meta
}: VenueProps) {
    return (
        <div>
            <h2>{name}</h2>
            <p>Price: {price}$</p>
            <p>Location: {location.city}, {location.country}</p>
            {media[0] && <img src={media[0].url} alt={media[0].alt || name}/>}
            <p>{description}</p>
            <p>Wifi: {meta.wifi ? 'Yes' : 'No'}</p>
            <Link to={`/venues/${id}`}>View details</Link>
        </div>
    );
}