import { useEffect } from "react";
import { venues } from "../api/venues.tsx";

export function Home() {
    useEffect(() => {
        venues();
    }, [])

    return (
        <>
            <h1 className='text-3xl'>Home Page</h1>
        </>
    )
}