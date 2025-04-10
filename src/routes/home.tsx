import { useEffect } from "react";
import { allVenues } from "../api/venues/AllVenues.tsx";

export function Home() {
    useEffect(() => {
        allVenues();
    }, [])

    return (
        <>
            <h1>Home Page</h1>
        </>
    )
}