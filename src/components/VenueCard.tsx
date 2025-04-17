import { Link } from "react-router-dom";
import { capitalizeLetter, truncate } from "../utils";

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
    id, name, price, media, location
}: VenueProps) {
    return (
        <div className="@container">
            <div className="flex flex-col items-stretch justify-start rounded-xl @xl:flex-row @xl:items-start">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                    style={{ backgroundImage: `url(${media[0]?.url || '/default-img.jpg' })` }}
                ></div>
                <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
                    <p className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]">
                        {capitalizeLetter(truncate(name))}
                    </p>
                    <div className="flex items-end gap-3 justify-between">
                        <div className="flex flex-col gap-1">
                            <p className="text-[#617b89] text-base font-normal leading-normal">
                                {location.city || 'Koh Samui'}, {location.country || 'Thailand'}
                            </p>
                            <p className="text-[#617b89] text-base font-normal leading-normal">
                                ${price}/night
                            </p>
                        </div>
                        <Link to={`/venues/${id}`} className="text-[#F14016] hover:underline text-sm font-medium">
                            View details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}