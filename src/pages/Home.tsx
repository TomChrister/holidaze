import { useEffect } from "react";
import { venues } from "../api/venues.tsx";

export function Home() {
    useEffect(() => {
        venues();
    }, [])

    return (
        <>
            <h1>Home Page</h1>
        </>
    )
}