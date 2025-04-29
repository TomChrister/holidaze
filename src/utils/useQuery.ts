// utils/useQuery.ts
import { useLocation } from "react-router-dom";

// Gets values from the URL query on explore page
export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// Builds query string for search filters
export function buildSearchQuery(
    search: string,
    params?: { startDate?: Date | null; endDate?: Date | null; guests?: number }
) {
    return new URLSearchParams({
        search,
        from: params?.startDate?.toISOString() || '',
        to: params?.endDate?.toISOString() || '',
        guests: params?.guests?.toString() || ''
    }).toString();
}


