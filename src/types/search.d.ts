// Searchbar types
export type SearchBarProps = {
    search: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit: (params?: {
        startDate?: Date | null;
        endDate?: Date | null;
        guests?: number;
    }) => void;
    initialStartDate?: Date | null;
    initialEndDate?: Date | null;
    initialGuests?: number;
};