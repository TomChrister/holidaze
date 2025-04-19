export type SearchBarProps = {
    search: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit: () => void;
};