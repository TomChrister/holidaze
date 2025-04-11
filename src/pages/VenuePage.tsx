import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { singleVenue } from "../api/venues.tsx";
import { VenueProps } from "../components/VenueCard.tsx";

export function VenuePage() {
    const { id } = useParams();
    const [venue, setVenue] = useState<VenueProps | null>(null);

    useEffect(() => {
        if (id) singleVenue(id).then(setVenue);
    }, [id]);

    if (!venue) return <p>Loading..</p>;

    return (
        <div>
            <h1>{venue.name}</h1>
            <p>{venue.description}</p>
            {venue.media[0] && <img src={venue.media[0].url} alt={venue.media[0].alt} />}
        </div>
    )
}