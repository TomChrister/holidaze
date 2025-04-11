import { useEffect, useState } from "react";
import { allVenues } from "../api/venues.tsx";
import VenueCard, { VenueProps } from "../components/VenueCard.tsx";

export function Home() {
    const [venues, setVenues] = useState<VenueProps[]>([]);

    useEffect(() => {
        allVenues().then(setVenues);
    }, []);

    return (
        <div>
            <h1 className="text-3xl">Home Page</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {venues.map((venue) => (
                    <VenueCard key={venue.id} {...venue} />
                ))}
            </div>
        </div>
    );
}